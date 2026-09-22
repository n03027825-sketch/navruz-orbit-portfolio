/* =========================================================
   api/akademiya.js — Orbita Akademiya backendi (bitta funksiya, ?op=...)
   catalog · register · me · lesson · progress · exam · grade · cert · order · status
   ========================================================= */
const C = require('./_lib/core');
const S = require('./_lib/store');
const COURSES = {};
const course = id => (COURSES[id] ||= require('./_courses/' + id + '.js'));
const shuffle = (a, seed) => { const r = a.slice(); let s = seed; for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

module.exports = async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const op = url.searchParams.get('op') || '';
  try {
    if (op === 'catalog') {
      return C.send(res, 200, { courses: C.CATALOG, methods: C.methods(), pass: C.PASS });
    }
    if (op === 'cert') { // ochiq tekshiruv
      const id = url.searchParams.get('id') || '';
      if (!/^[A-Z0-9-]{8,24}$/.test(id)) return C.send(res, 400, { error: 'Sertifikat raqami noto‘g‘ri.' });
      const cert = await S.getJSON(`certs/${id}.json`);
      return cert ? C.send(res, 200, { cert }) : C.send(res, 404, { error: 'Bunday sertifikat topilmadi.' });
    }
    if (op === 'status') {
      const o = await C.getOrder(url.searchParams.get('id'));
      return o ? C.send(res, 200, { status: o.status, course: o.course, title: o.title, amount: o.amount }) : C.send(res, 404, { error: 'Buyurtma topilmadi.' });
    }
    if (req.method !== 'POST') return C.send(res, 405, { error: 'POST kerak' });
    if (!S.enabled()) return C.send(res, 503, { error: 'Ma’lumotlar ombori hali ulanmagan.' });
    const b = await C.readBody(req);

    if (op === 'register') {
      const r = await C.register(b);
      return C.send(res, 200, r);
    }
    const st = await C.auth(b);

    if (op === 'me') return C.send(res, 200, { student: C.pub(st), methods: C.methods() });

    if (op === 'lesson') {
      const cid = String(b.course || ''), n = Math.floor(+b.n);
      const cat = C.byId(cid); if (!cat || !(n >= 0 && n < cat.lessons.length)) return C.send(res, 404, { error: 'Dars topilmadi.' });
      if (!C.hasAccess(st, cid, n)) return C.send(res, 402, { locked: true, price: cat.price, error: 'Bu dars pullik. Kursni ochish uchun to‘lov qiling.' });
      const L = course(cid).lessons[n];
      return C.send(res, 200, { lesson: { n, title: cat.lessons[n], ...L }, done: !!(st.progress[cid] && st.progress[cid][n]) });
    }

    if (op === 'progress') {
      const cid = String(b.course || ''), n = Math.floor(+b.n), score = Math.max(0, Math.min(3, Math.floor(+b.score || 0)));
      const cat = C.byId(cid); if (!cat || !(n >= 0 && n < cat.lessons.length)) return C.send(res, 404, { error: 'Dars topilmadi.' });
      if (!C.hasAccess(st, cid, n)) return C.send(res, 402, { locked: true });
      st.progress[cid] = st.progress[cid] || {};
      const prev = st.progress[cid][n];
      st.progress[cid][n] = { score: Math.max(score, prev ? prev.score : 0), at: C.now() };
      await C.saveStudent(st);
      return C.send(res, 200, { progress: st.progress[cid] });
    }

    if (op === 'exam' || op === 'grade') {
      const cid = String(b.course || ''); const cat = C.byId(cid);
      if (!cat) return C.send(res, 404, { error: 'Kurs topilmadi.' });
      if (!(cat.price === 0 || (st.courses[cid] && st.courses[cid].paid))) return C.send(res, 402, { locked: true, error: 'Imtihon kurs ochilgandan so‘ng.' });
      const done = Object.keys(st.progress[cid] || {}).length;
      if (done < cat.lessons.length) return C.send(res, 403, { error: `Avval barcha darslarni tugating (${done}/${cat.lessons.length}).` });
      const E = course(cid).exam;
      const seed = parseInt(C.sha(st.sid + cid).slice(0, 8), 16) % 233280;
      if (op === 'exam') {
        return C.send(res, 200, { questions: E.map((q, i) => ({ i, q: q[0], o: shuffle(q[1], seed + i * 7) })), pass: C.PASS });
      }
      const ans = Array.isArray(b.answers) ? b.answers : [];
      let ok = 0; const review = E.map((q, i) => { const right = q[1][q[2]]; const hit = ans[i] === right; if (hit) ok++; return { hit, right }; });
      const score = ok / E.length;
      st.exams = st.exams || {}; st.exams[cid] = { best: Math.max(score, (st.exams[cid] || {}).best || 0), last: score, at: C.now() };
      let cert = null;
      if (score >= C.PASS) {
        const have = st.certs.find(c => c.course === cid);
        if (have) cert = await S.getJSON(`certs/${have.id}.json`);
        if (!cert) {
          const id = 'NO-' + new Date().getFullYear() + '-' + C.rid(8).toUpperCase();
          cert = { id, name: st.name, course: cid, title: cat.title, hours: cat.hours, score: Math.round(score * 100), date: new Date().toISOString().slice(0, 10) };
          await S.putJSON(`certs/${id}.json`, cert);
          st.certs.push({ id, course: cid, title: cat.title, date: cert.date, score: cert.score });
          C.notify(`🏅 <b>Sertifikat</b>\n${st.name} — ${cat.title} (${cert.score}%)`);
        }
      }
      await C.saveStudent(st);
      return C.send(res, 200, { score: Math.round(score * 100), ok, total: E.length, passed: score >= C.PASS, review, cert });
    }

    if (op === 'order') {
      const method = String(b.method || '');
      const M = C.methods();
      if (!['payme', 'click', 'octo'].includes(method)) return C.send(res, 400, { error: 'To‘lov usuli noto‘g‘ri.' });
      if (!M[method]) return C.send(res, 503, { error: 'Bu to‘lov usuli hali ulanmagan. Tez orada ishga tushadi.', notReady: true });
      const o = await C.createOrder(st, String(b.course || ''), method);
      const back = C.siteUrl(req) + '/akademiya/#/tolov/' + o.oid;
      const e = process.env; let pay;
      if (method === 'payme') {
        const base = e.PAYME_TEST === '1' ? 'https://checkout.test.paycom.uz/' : 'https://checkout.paycom.uz/';
        pay = base + Buffer.from(`m=${e.PAYME_MERCHANT_ID};ac.order_id=${o.oid};a=${o.amount * 100};l=uz;c=${back}`).toString('base64');
      } else if (method === 'click') {
        const q = new URLSearchParams({ service_id: e.CLICK_SERVICE_ID, merchant_id: e.CLICK_MERCHANT_ID, amount: o.amount.toFixed(2), transaction_param: o.oid, return_url: back });
        pay = 'https://my.click.uz/services/pay?' + q.toString();
      } else {
        pay = await require('./_lib/octo').prepare(o, back, C.siteUrl(req) + '/api/octo', st);
      }
      o.payUrl = pay; await C.saveOrder(o);
      return C.send(res, 200, { order: o.oid, url: pay });
    }
    return C.send(res, 400, { error: 'Noma’lum amal.' });
  } catch (e) {
    const code = e.code && e.code >= 400 && e.code < 600 ? e.code : 500;
    if (code === 500) console.error(e);
    return C.send(res, code, { error: code === 500 ? 'Serverda xatolik. Birozdan so‘ng qayta urinib ko‘ring.' : e.message });
  }
};
