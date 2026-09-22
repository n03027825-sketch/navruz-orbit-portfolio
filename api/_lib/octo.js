/* OCTO — Visa / Mastercard / Humo / Uzcard karta to'lovlari (bir bosqichli, auto_capture).
   Kerakli env: OCTO_SHOP_ID, OCTO_SECRET, OCTO_TEST=1 (ixtiyoriy, sinov rejimi)
   Hujjat: https://help.octo.uz/en/payment-via-web.html */
const crypto = require('crypto');
const pad = n => String(n).padStart(2, '0');
function tashkentTime() { const d = new Date(Date.now() + 5 * 3600e3); return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`; }

async function prepare(o, returnUrl, notifyUrl, st) {
  const e = process.env;
  const body = {
    octo_shop_id: +e.OCTO_SHOP_ID, octo_secret: e.OCTO_SECRET,
    shop_transaction_id: o.oid, auto_capture: true, test: e.OCTO_TEST === '1',
    init_time: tashkentTime(), total_sum: o.amount, currency: 'UZS',
    description: `Orbita Akademiya: ${o.title}`,
    user_data: { user_id: st.sid, phone: st.phone, email: st.email || undefined },
    basket: [{ position_desc: o.title, count: 1, price: o.amount }],
    return_url: returnUrl, notify_url: notifyUrl, language: 'uz', ttl: 30
  };
  const r = await fetch('https://secure.octo.uz/prepare_payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  const d = j.data || j;
  if (j.error && j.error !== 0 || !d.octo_pay_url) { const err = new Error('Karta to‘lovini boshlab bo‘lmadi: ' + (j.errMessage || j.errorMessage || 'OCTO javobi noto‘g‘ri')); err.code = 502; throw err; }
  return d.octo_pay_url;
}
function verify(n) {
  const secret = process.env.OCTO_UNIQUE_KEY || process.env.OCTO_SECRET || '';
  const base = secret + n.octo_payment_UUID + n.status;
  const base2 = secret + n.shop_transaction_id + n.octo_payment_UUID;
  const sig = String(n.signature || '').toLowerCase();
  return [base, base2].some(s => ['sha1', 'md5'].some(a => crypto.createHash(a).update(s).digest('hex') === sig));
}
module.exports = { prepare, verify };
