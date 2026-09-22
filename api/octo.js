/* api/octo.js — OCTO to'lov xabarnomasi (notify_url). Karta orqali to'langanda chaqiriladi. */
const C = require('./_lib/core');
const { verify } = require('./_lib/octo');

module.exports = async (req, res) => {
  try {
    const n = await C.readBody(req);
    if (!process.env.OCTO_SECRET) return C.send(res, 503, { error: 'not configured' });
    if (!verify(n)) return C.send(res, 401, { error: 'bad signature' });
    const o = await C.getOrder(n.shop_transaction_id);
    if (!o) return C.send(res, 404, { error: 'order not found' });
    if (n.status === 'succeeded') {
      if (Math.abs(+n.total_sum - o.amount) > 1) return C.send(res, 400, { error: 'amount mismatch' });
      await C.markPaid(o, 'Karta (OCTO)');
    } else if (n.status === 'canceled' || n.status === 'cancelled') {
      if (o.status === 'new') await C.markCancelled(o, 'octo:' + n.status);
    }
    return C.send(res, 200, { accept_status: 'capture' });
  } catch (e) { console.error(e); return C.send(res, 500, { error: 'server' }); }
};
