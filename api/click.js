/* =========================================================
   api/click.js — Click SHOP API (Prepare / Complete)
   Click kabinetida: Prepare URL va Complete URL = https://<sayt>/api/click
   Kerakli env: CLICK_SERVICE_ID, CLICK_MERCHANT_ID, CLICK_SECRET_KEY
   merchant_trans_id = buyurtma raqami (order id)
   ========================================================= */
const crypto = require('crypto');
const C = require('./_lib/core');
const md5 = s => crypto.createHash('md5').update(s).digest('hex');

module.exports = async (req, res) => {
  const b = await C.readBody(req);
  const reply = (error, error_note, extra = {}) => C.send(res, 200, { click_trans_id: b.click_trans_id, merchant_trans_id: b.merchant_trans_id, error, error_note, ...extra });
  try {
    const secret = process.env.CLICK_SECRET_KEY;
    if (!secret) return reply(-8, 'Error in request from click');
    const action = String(b.action);
    const sign = action === '1'
      ? md5(`${b.click_trans_id}${b.service_id}${secret}${b.merchant_trans_id}${b.merchant_prepare_id}${b.amount}${b.action}${b.sign_time}`)
      : md5(`${b.click_trans_id}${b.service_id}${secret}${b.merchant_trans_id}${b.amount}${b.action}${b.sign_time}`);
    if (sign !== String(b.sign_string)) return reply(-1, 'SIGN CHECK FAILED!');
    if (String(b.service_id) !== String(process.env.CLICK_SERVICE_ID)) return reply(-8, 'Error in request from click');
    if (action !== '0' && action !== '1') return reply(-3, 'Action not found');

    const o = await C.getOrder(b.merchant_trans_id);
    if (!o) return reply(-5, 'User does not exist');
    if (Math.abs(+b.amount - o.amount) > 0.01) return reply(-2, 'Incorrect parameter amount');

    if (action === '0') {
      if (o.status === 'paid') return reply(-4, 'Already paid');
      if (o.status === 'cancelled') return reply(-9, 'Transaction cancelled');
      o.click = { trans: String(b.click_trans_id), prepare: o.oid, at: Date.now() };
      await C.saveOrder(o);
      return reply(0, 'Success', { merchant_prepare_id: o.oid });
    }
    // Complete
    if (String(b.merchant_prepare_id) !== o.oid || !o.click || o.click.trans !== String(b.click_trans_id)) return reply(-6, 'Transaction does not exist');
    if (o.status === 'paid') return reply(-4, 'Already paid', { merchant_confirm_id: o.oid });
    if (o.status === 'cancelled') return reply(-9, 'Transaction cancelled');
    if (+b.error < 0) { await C.markCancelled(o, 'click:' + b.error); return reply(-9, 'Transaction cancelled'); }
    await C.markPaid(o, 'Click');
    return reply(0, 'Success', { merchant_confirm_id: o.oid });
  } catch (e) {
    console.error(e);
    return reply(-7, 'Failed to update user');
  }
};
