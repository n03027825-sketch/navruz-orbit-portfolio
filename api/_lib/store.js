/* Ma'lumotlar ombori: Vercel Blob (private). O'quvchilar, buyurtmalar, sertifikatlar.
   Kerak: BLOB_READ_WRITE_TOKEN (Blob store loyihaga ulanganda Vercel o'zi qo'shadi). */
const { put, get, list, del } = require('@vercel/blob');

const enabled = () => !!process.env.BLOB_READ_WRITE_TOKEN;

async function getJSON(path) {
  if (!enabled()) throw new Error('STORE_OFF');
  try {
    const r = await get(path, { access: 'private' });
    if (!r || r.statusCode !== 200) return null;
    return JSON.parse(await new Response(r.stream).text());
  } catch (e) {
    if (/not.?found|404/i.test(String(e && (e.message || e)))) return null;
    throw e;
  }
}
async function putJSON(path, obj) {
  if (!enabled()) throw new Error('STORE_OFF');
  await put(path, JSON.stringify(obj), {
    access: 'private', addRandomSuffix: false, allowOverwrite: true,
    contentType: 'application/json', cacheControlMaxAge: 60
  });
  return obj;
}
async function listPaths(prefix, limit = 1000) {
  if (!enabled()) throw new Error('STORE_OFF');
  const out = []; let cursor;
  do {
    const r = await list({ prefix, cursor, limit: Math.min(1000, limit - out.length) });
    r.blobs.forEach(b => out.push(b.pathname));
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor && out.length < limit);
  return out;
}
async function remove(path) { if (enabled()) await del(path).catch(() => {}); }

module.exports = { enabled, getJSON, putJSON, listPaths, remove };
