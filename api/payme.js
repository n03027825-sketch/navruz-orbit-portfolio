/* =========================================================
   api/payme.js — Payme Merchant API (JSON-RPC 2.0)
   Payme kabinetida "Endpoint URL": https://<sayt>/api/payme
   Kerakli env: PAYME_MERCHANT_ID, PAYME_KEY (test uchun test kaliti), PAYME_TEST=1 (ixtiyoriy)
   Hisob maydoni (account): order_id
   ========================================================= */
const C = require('./_lib/core');
const S = require('./_lib/store');
const TIMEOUT = 12 * 60 * 60 * 1000; // 12 soat

const E = {
  auth: [-32504, 'Ruxsat yo‘q', 'Недостаточно привилегий', 'Insufficient privilege'],
  method: [-32601, 'Metod topilmadi', 'Метод не найден', 'Method not found'],
  amount: [-31001, 'Summa noto‘g‘ri', 'Неверная сумма', 'Invalid amount'],
  order: [-31050, 'Buyurtma topilmadi', 'Заказ не найден', 'Order not found'],
  busy: [-31099, 'Buyurtma band yoki to‘langan', 'Заказ занят или оплачен', 'Order is busy or paid'],
  tx: [-31003, 'Tranzaksiya topilmadi', 'Транзакция не найдена', 'Transaction not found'],
  perform: [-31008, 'Amalni bajarib bo‘lmaydi', 'Невозможно выполнить операцию', 'Unable to perform operation'],
  cancel: [-31007, 'Bekor qilib bo‘lmaydi', 'Невозможно отменить', 'Unable to cancel']
};
const fail = (res, id, k, data) => C.send(res, 200, { jsonrpc: '2.0', id, error: { code: E[k][0], message: { uz: E[k][1], ru: E[k][2], en: E[k][3] }, data: data || null } });
const ok = (res, id, result) => C.send(res, 200, { jsonrpc: '2.0', id, result });
const txPath = id => `payme/${String(id).replace(/[^\w-]/g, '')}.json`;
const view = t => ({ create_time: t.create_time, perform_time: t.perform_time || 0, cancel_time: t.cancel_time || 0, transaction: t.oid, state: t.state, reason: t.reason ?? null });

module.exports = async (req, res) => {
  let id = null;
  try {
    const key = process.env.PAYME_KEY;
    const h = String(req.headers.authorization || '');
    const given = h.startsWith('Basic ') ? Buffer.from(h.slice(6), 'base64').toString() : '';
    if (!key || given !== 'Paycom:' + key) return fail(res, null, 'auth');
    const b = await C.readBody(req); id = b.id ?? null;
    const p = b.params || {};

    const findOrder = async () => {
      const oid = p.account && p.account.order_id;
      const o = await C.getOrder(oid);
      return o;
    };

    switch (b.method) {
      case 'CheckPerformTransaction': {
        const o = await findOrder();
        if (!o) return fail(res, id, 'order', 'order_id');
        if (o.amount * 100 !== +p.amount) return fail(res, id, 'amount');
        if (o.status !== 'new') return fail(res, id, 'busy', 'order_id');
        const r = { allow: true };
        // Fiskal chek uchun MXIK (IKPU) kodi va o'lchov birligi soliq kabinetidan olinadi.
        if (process.env.PAYME_IKPU) r.detail = { receipt_type: 0, items: [{ title: o.title, price: o.amount * 100, count: 1, code: process.env.PAYME_IKPU, package_code: process.env.PAYME_PACKAGE || '', vat_percent: +(process.env.PAYME_VAT || 0) }] };
        return ok(res, id, r);
      }
      case 'CreateTransaction': {
        const exist = await S.getJSON(txPath(p.id));
        if (exist) {
          if (exist.state !== 1) return fail(res, id, 'perform');
          if (Date.now() - exist.time > TIMEOUT) { exist.state = -1; exist.reason = 4; exist.cancel_time = Date.now(); await S.putJSON(txPath(p.id), exist); return fail(res, id, 'perform'); }
          return ok(res, id, { create_time: exist.create_time, transaction: exist.oid, state: 1 });
        }
        const o = await findOrder();
        if (!o) return fail(res, id, 'order', 'order_id');
        if (o.amount * 100 !== +p.amount) return fail(res, id, 'amount');
        if (o.status !== 'new' || (o.payme && o.payme.tx && o.payme.tx !== p.id && o.payme.state === 1)) return fail(res, id, 'busy', 'order_id');
        const t = { id: p.id, oid: o.oid, time: +p.time, amount: +p.amount, create_time: Date.now(), state: 1 };
        await S.putJSON(txPath(p.id), t);
        o.payme = { tx: p.id, state: 1 }; await C.saveOrder(o);
        return ok(res, id, { create_time: t.create_time, transaction: t.oid, state: 1 });
      }
      case 'PerformTransaction': {
        const t = await S.getJSON(txPath(p.id));
        if (!t) return fail(res, id, 'tx');
        if (t.state === 2) return ok(res, id, { transaction: t.oid, perform_time: t.perform_time, state: 2 });
        if (t.state !== 1) return fail(res, id, 'perform');
        if (Date.now() - t.time > TIMEOUT) { t.state = -1; t.reason = 4; t.cancel_time = Date.now(); await S.putJSON(txPath(p.id), t); return fail(res, id, 'perform'); }
        const o = await C.getOrder(t.oid); if (!o) return fail(res, id, 'order');
        t.state = 2; t.perform_time = Date.now(); await S.putJSON(txPath(p.id), t);
        o.payme = { tx: t.id, state: 2 }; await C.markPaid(o, 'Payme');
        return ok(res, id, { transaction: t.oid, perform_time: t.perform_time, state: 2 });
      }
      case 'CancelTransaction': {
        const t = await S.getJSON(txPath(p.id));
        if (!t) return fail(res, id, 'tx');
        if (t.state === 1 || t.state === 2) {
          t.state = t.state === 1 ? -1 : -2; t.reason = +p.reason || null; t.cancel_time = Date.now();
          await S.putJSON(txPath(p.id), t);
          const o = await C.getOrder(t.oid); if (o) { o.payme = { tx: t.id, state: t.state }; await C.markCancelled(o, 'payme:' + t.reason); }
        }
        return ok(res, id, { transaction: t.oid, cancel_time: t.cancel_time, state: t.state });
      }
      case 'CheckTransaction': {
        const t = await S.getJSON(txPath(p.id));
        if (!t) return fail(res, id, 'tx');
        return ok(res, id, view(t));
      }
      case 'GetStatement': {
        const from = +p.from, to = +p.to; const out = [];
        for (const path of await S.listPaths('payme/', 2000)) {
          const t = await S.getJSON(path);
          if (t && t.time >= from && t.time <= to) out.push({ id: t.id, time: t.time, amount: t.amount, account: { order_id: t.oid }, ...view(t) });
        }
        return ok(res, id, { transactions: out });
      }
      default: return fail(res, id, 'method');
    }
  } catch (e) {
    console.error(e);
    return C.send(res, 200, { jsonrpc: '2.0', id, error: { code: -32400, message: { uz: 'Tizim xatosi', ru: 'Системная ошибка', en: 'System error' } } });
  }
};
