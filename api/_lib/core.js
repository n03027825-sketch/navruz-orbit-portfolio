/* Akademiya yadrosi: o'quvchi, kirish huquqi, buyurtma, sertifikat. */
const crypto = require('crypto');
const S = require('./store');
const { CATALOG, byId, PASS } = require('./catalog');

const rid = (n = 12) => crypto.randomBytes(n).toString('base64url').replace(/[-_]/g, '').slice(0, n);
const sha = s => crypto.createHash('sha256').update(String(s)).digest('hex');
const now = () => Date.now();

async function readBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  let raw = req.body;
  if (raw === undefined) raw = await new Promise(r => { let d = ''; req.on('data', c => d += c); req.on('end', () => r(d)); });
  if (Buffer.isBuffer(raw)) raw = raw.toString('utf8');
  if (typeof raw !== 'string' || !raw) return {};
  const ct = String(req.headers['content-type'] || '');
  if (ct.includes('application/x-www-form-urlencoded')) return Object.fromEntries(new URLSearchParams(raw));
  try { return JSON.parse(raw); } catch (e) { return Object.fromEntries(new URLSearchParams(raw)); }
}
function send(res, code, obj) { res.statusCode = code; res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify(obj)); }
function siteUrl(req) { return process.env.SITE_URL || ('https://' + (req.headers['x-forwarded-host'] || req.headers.host)); }

/* ---- o'quvchi ---- */
const clean = (s, n) => String(s || '').replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, n);
async function register({ name, phone, email }) {
  name = clean(name, 60); phone = clean(phone, 20).replace(/[^\d+]/g, ''); email = clean(email, 80).toLowerCase();
  if (name.length < 2) throw httpErr(400, 'Ismingizni kiriting (kamida 2 harf).');
  if (!/^\+?\d{9,15}$/.test(phone)) throw httpErr(400, 'Telefon raqamini to‘g‘ri kiriting, masalan +998901234567.');
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw httpErr(400, 'Email noto‘g‘ri.');
  const sid = rid(12), token = rid(32);
  const st = { sid, name, phone, email, tokenHash: sha(token), created: now(), courses: {}, progress: {}, certs: [] };
  await S.putJSON(`students/${sid}.json`, st);
  notify(`🎓 <b>Yangi o‘quvchi</b>\n${esc(name)}\n📞 ${esc(phone)}${email ? '\n✉️ ' + esc(email) : ''}`);
  return { sid, token, student: pub(st) };
}
async function auth(body) {
  const sid = String(body.sid || ''), token = String(body.token || '');
  if (!/^[A-Za-z0-9]{12}$/.test(sid) || token.length < 20) throw httpErr(401, 'Avval ro‘yxatdan o‘ting.');
  const st = await S.getJSON(`students/${sid}.json`);
  if (!st || st.tokenHash !== sha(token)) throw httpErr(401, 'Sessiya topilmadi. Qayta kiring.');
  return st;
}
const saveStudent = st => S.putJSON(`students/${st.sid}.json`, st);
function pub(st) { return { sid: st.sid, name: st.name, phone: st.phone.replace(/(\d{3})\d{4}(\d{2})$/, '$1****$2'), courses: st.courses, progress: st.progress, certs: st.certs }; }
function hasAccess(st, cid, n) {
  const c = byId(cid); if (!c) return false;
  if (c.price === 0 || n === 0) return true;
  return !!(st && st.courses[cid] && st.courses[cid].paid);
}

/* ---- buyurtma va to'lov ---- */
async function createOrder(st, cid, method) {
  const c = byId(cid); if (!c) throw httpErr(404, 'Kurs topilmadi.');
  if (c.price === 0) throw httpErr(400, 'Bu kurs bepul.');
  if (st.courses[cid] && st.courses[cid].paid) throw httpErr(400, 'Bu kurs allaqachon ochilgan.');
  const oid = String(Date.now()).slice(-9) + String(Math.floor(Math.random() * 90 + 10));
  const o = { oid, sid: st.sid, name: st.name, course: cid, title: c.title, amount: c.price, method, status: 'new', created: now() };
  await S.putJSON(`orders/${oid}.json`, o);
  return o;
}
const getOrder = oid => /^\d{6,20}$/.test(String(oid)) ? S.getJSON(`orders/${oid}.json`) : Promise.resolve(null);
const saveOrder = o => S.putJSON(`orders/${o.oid}.json`, o);
async function markPaid(o, via) {
  if (o.status === 'paid') return o;
  o.status = 'paid'; o.paid = now(); o.via = via;
  await saveOrder(o);
  const st = await S.getJSON(`students/${o.sid}.json`);
  if (st) { st.courses[o.course] = { paid: true, oid: o.oid, at: o.paid }; await saveStudent(st); }
  notify(`💳 <b>To‘lov qabul qilindi</b>\n${esc(o.name)} — ${esc(o.title)}\n${o.amount.toLocaleString('ru')} so‘m · ${via} · #${o.oid}`);
  return o;
}
async function markCancelled(o, why) {
  const wasPaid = o.status === 'paid';
  o.status = 'cancelled'; o.cancelled = now(); o.why = why;
  await saveOrder(o);
  if (wasPaid) { const st = await S.getJSON(`students/${o.sid}.json`); if (st && st.courses[o.course] && st.courses[o.course].oid === o.oid) { delete st.courses[o.course]; await saveStudent(st); } }
  return o;
}
function methods() {
  const e = process.env;
  return {
    payme: !!(e.PAYME_MERCHANT_ID && e.PAYME_KEY),
    click: !!(e.CLICK_SERVICE_ID && e.CLICK_MERCHANT_ID && e.CLICK_SECRET_KEY),
    octo: !!(e.OCTO_SHOP_ID && e.OCTO_SECRET),
    ai: !!e.OPENAI_API_KEY,
    store: S.enabled()
  };
}

/* ---- Telegram xabarnoma (mavjud bot orqali, ixtiyoriy) ---- */
function esc(s) { return String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])); }
function notify(html) {
  const t = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!t || !chat) return;
  fetch(`https://api.telegram.org/bot${t}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chat, text: html, parse_mode: 'HTML', disable_web_page_preview: true }) }).catch(() => {});
}
function httpErr(code, msg) { const e = new Error(msg); e.code = code; return e; }

module.exports = { CATALOG, byId, PASS, rid, sha, now, readBody, send, siteUrl, register, auth, saveStudent, pub, hasAccess, createOrder, getOrder, saveOrder, markPaid, markCancelled, methods, notify, httpErr, clean };
