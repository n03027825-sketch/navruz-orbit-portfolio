/* =========================================================
   api/ai.js — Orbita AI ustoz
   - OPENAI_API_KEY bo'lsa: GPT modeli + kurs bazasidan olingan kontekst (RAG)
   - bo'lmasa: kurs bazasidan eng mos darsni topib, undan javob beradi
   - javob bilan birga "harakatlar" qaytaradi: darsni / kursni / loyihani ochish
   Kalit faqat serverda turadi.
   ========================================================= */
const C = require('./_lib/core');
const { CATALOG, byId } = require('./_lib/catalog');

const PROJECTS = [
  ['kunim', 'KUNIM', 'kun tartibi, fokus taymer, streak va tangalar', 'https://navruz-kunim.vercel.app'],
  ['ritm', 'Kun Ritmi', 'kayfiyatga mos 3 qadam', 'https://kun-ritmi.vercel.app'],
  ['yozai', 'YozAI', 'ingliz tilida yozish, o‘zbekcha izoh', 'https://navruz-yozai.vercel.app'],
  ['yolchi', 'Yo‘lchi', 'mehnat migrantlarini firibgarlikdan himoya', 'https://navruz-yolchi.vercel.app'],
  ['oqim', 'Oqim', 'o‘quv markazi admin paneli', 'https://navruz-oqim.vercel.app'],
  ['sil', 'Sales Insight Lab', 'CSV savdo tahlili, KPI va grafik', 'https://navruz-sales-insight.vercel.app'],
  ['bm', 'Business Memory', 'kichik biznes xotirasi va tavsiyalar', 'https://navruz-business-memory.vercel.app'],
  ['uai', 'Navruz Universal AI', 'universal AI yordamchi', 'https://navruz-universal-ai.vercel.app'],
  ['game', '3D o‘yin', 'Godot 4 dagi 3D o‘yin loyihasi', 'https://navruz-3d-game.vercel.app'],
  ['city', 'CITY RUSH 3D', '3D shahar poygasi o‘yini', 'https://navruz-city-rush.vercel.app'],
  ['neon', 'NEON RUSH', 'neon uslubidagi tezkor o‘yin', 'https://navruz-neon-rush.vercel.app'],
  ['chaqqon', 'Chaqqon!', 'mini o‘yinlar to‘plami', 'https://navruz-chaqqon.vercel.app'],
  ['karvon', 'Karvon', 'Ipak yo‘li savdo o‘yini', 'https://navruz-karvon.vercel.app']
];

const norm = s => String(s || '').toLowerCase().replace(/[’'‘`ʻʼ]/g, '').replace(/[^a-z0-9а-яё\s]/gi, ' ');
const STOP = new Set('va bu nima qanday uchun bilan men menga sen siz ham yoki emas bor edi qil qiling qilish haqida ber bering tushuntir kerak nega qaysi the a is of to in and what how'.split(' '));
const terms = s => norm(s).split(/\s+/).filter(w => w.length > 1 && !STOP.has(w)).map(w => w.slice(0, 6));

let DOCS = null;
function index() {
  if (DOCS) return DOCS;
  DOCS = [];
  for (const c of CATALOG) {
    const m = require('./_courses/' + c.id + '.js');
    m.lessons.forEach((L, n) => {
      const text = [c.title, c.lessons[n], ...L.v.map(v => v[0] + '. ' + v[1]), L.x].join('\n');
      const tf = {}; terms(text).forEach(t => tf[t] = (tf[t] || 0) + 1);
      terms(c.title + ' ' + c.lessons[n]).forEach(t => tf[t] = (tf[t] || 0) + 6);
      DOCS.push({ course: c.id, n, title: `${c.title} → ${n + 1}-dars: ${c.lessons[n]}`, text, x: L.x, tf, free: c.price === 0 || n === 0 });
    });
  }
  return DOCS;
}
function search(q, k = 3, prefer) {
  const qt = terms(q); if (!qt.length) return [];
  return index().map(d => {
    let s = 0; for (const t of qt) if (d.tf[t]) s += 1 + Math.log(d.tf[t]);
    if (prefer && d.course === prefer) s *= 1.35;
    return { d, s };
  }).filter(r => r.s > 0).sort((a, b) => b.s - a.s).slice(0, k).map(r => r.d);
}
const plain = s => s.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`([^`]*)`/g, '$1').replace(/\*(.*?)\*/g, '$1');

function localAnswer(q, ctx) {
  const s = norm(q);
  const acts = [];
  for (const p of PROJECTS) if (s.includes(norm(p[1]).trim()) || s.includes(p[0] + ' ')) { acts.push({ type: 'url', url: p[3], label: p[1] + ' — ochish' }); return { answer: `${p[1]} — ${p[2]}. Uni yangi oynada ochishingiz mumkin.`, actions: acts }; }
  if (/salom|assalom|hello|hi\b/.test(s)) return { answer: 'Va alaykum assalom! Men Orbita AI ustozman. Dars mavzusi bo‘yicha savol bering, men tushuntiraman va kerakli darsni ochib beraman. Masalan: “for sikli qanday ishlaydi?” yoki “SQL JOIN nima?”', actions: [] };
  if (/narx|pul|tolov|payme|click|visa|karta/.test(s)) return { answer: 'Python asoslari kursi to‘liq bepul. Pullik kurslarning 1-darsi ham bepul — sinab ko‘rasiz. Kurs narxi murakkabligiga qarab 29 000 so‘mdan 149 000 so‘mgacha; to‘lov Payme, Click yoki Visa/Mastercard karta orqali. Bir marta to‘laysiz — kurs butunlay ochiladi va oxirida sertifikat olasiz.', actions: [{ type: 'page', page: 'narxlar', label: 'Narxlarni ko‘rish' }] };
  if (/sertifikat/.test(s)) return { answer: 'Sertifikat olish uchun kursning barcha darslarini tugatib, yakuniy imtihondan kamida 70% to‘plang. Sertifikatda noyob raqam bo‘ladi — uni istalgan kishi saytda tekshira oladi.', actions: [{ type: 'page', page: 'kabinet', label: 'Kabinetim' }] };
  const hits = search(q, 3, ctx && ctx.course);
  if (!hits.length) return { answer: 'Bu savol bo‘yicha kurslarimizda aniq material topmadim. Savolni boshqacha yozib ko‘ring yoki mavzuni ayting: Python, HTML/CSS, JavaScript, Git, SQL, Pandas, Telegram bot, AI, algoritmlar, backend yoki Machine Learning.', actions: [] };
  const h = hits[0];
  const para = plain(h.x.split('\n\n')[0]);
  const more = hits.slice(1).map(x => '• ' + x.title).join('\n');
  return {
    answer: `📘 ${h.title}\n\n${para}${more ? '\n\nYana mos darslar:\n' + more : ''}`,
    actions: hits.map(x => ({ type: 'lesson', course: x.course, n: x.n, label: x.title.split(' → ')[1] + (x.free ? '' : ' 🔒') }))
  };
}

module.exports = async (req, res) => {
  if (req.method === 'GET') return C.send(res, 200, { mode: process.env.OPENAI_API_KEY ? 'ai' : 'baza' });
  if (req.method !== 'POST') return C.send(res, 405, { error: 'POST kerak' });
  try {
    const b = await C.readBody(req);
    const q = String(b.q || '').slice(0, 1500).trim();
    if (!q) return C.send(res, 400, { error: 'Savol bo‘sh' });
    const ctx = b.context && typeof b.context === 'object' ? { course: String(b.context.course || ''), n: +b.context.n } : null;
    const key = process.env.OPENAI_API_KEY;
    if (!key) return C.send(res, 200, { mode: 'baza', ...localAnswer(q, ctx) });

    const hits = search(q, 4, ctx && ctx.course);
    const cur = ctx && byId(ctx.course) ? `Hozir o‘quvchi “${byId(ctx.course).title}” kursining ${ctx.n + 1}-darsida.` : '';
    const kb = hits.map(h => `[${h.course}:${h.n}] ${h.title}\n${plain(h.text).slice(0, 1400)}`).join('\n---\n');
    const system = `Sen "Orbita AI ustoz"san — Navro‘z Orbitasi akademiyasining o‘zbek tilidagi o‘qituvchisi.
Qoidalar: o‘quvchi qaysi tilda yozsa, o‘sha tilda javob ber (asosan o‘zbek, lotin yozuvida). Qisqa, aniq va misol bilan tushuntir. Kod bo‘lsa kichik misol ber.
Bilmasang to‘qima. Uy vazifasini to‘liq yechib berma — yo‘naltir va tushuntir. Shaxsiy/moliyaviy ma’lumot so‘rama.
Agar foydalanuvchi darsni, kursni yoki loyihani ochishni so‘rasa yoki mos dars bo‘lsa, javob oxirida teg qo‘sh:
[[lesson:KURS_ID:DARS_RAQAMI_0DAN]] yoki [[course:KURS_ID]] yoki [[project:ID]]. Kurs IDlari: ${CATALOG.map(c => c.id + '=' + c.title).join('; ')}. Loyiha IDlari: ${PROJECTS.map(p => p[0] + '=' + p[1]).join('; ')}.
Narxlar: ${CATALOG.map(c => c.title + ' ' + (c.price ? c.price + ' so‘m' : 'bepul')).join('; ')}. Pullik kurslarning 1-darsi bepul. To‘lov: Payme, Click, Visa/Mastercard. Sertifikat: barcha darslar + yakuniy imtihon ≥70%.
${cur}
Kurs bazasidan mos parchalar:
${kb || '(mos parcha topilmadi)'}`;
    const hist = (Array.isArray(b.history) ? b.history : []).slice(-10)
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.4, max_tokens: 700, messages: [{ role: 'system', content: system }, ...hist, { role: 'user', content: q }] })
    });
    const j = await r.json();
    if (!r.ok) { console.error(j); return C.send(res, 200, { mode: 'baza', ...localAnswer(q, ctx), note: 'AI vaqtincha javob bermadi — kurs bazasidan javob.' }); }
    let text = j.choices[0].message.content || '';
    const actions = [];
    text = text.replace(/\[\[(lesson|course|project):([\w-]+)(?::(\d+))?\]\]/g, (_, t, id, n) => {
      if (t === 'lesson' && byId(id)) actions.push({ type: 'lesson', course: id, n: +n || 0, label: byId(id).lessons[+n || 0] });
      if (t === 'course' && byId(id)) actions.push({ type: 'course', course: id, label: byId(id).title });
      if (t === 'project') { const p = PROJECTS.find(p => p[0] === id); if (p) actions.push({ type: 'url', url: p[3], label: p[1] + ' — ochish' }); }
      return '';
    }).trim();
    if (!actions.length && hits[0]) actions.push({ type: 'lesson', course: hits[0].course, n: hits[0].n, label: hits[0].title.split(' → ')[1] });
    return C.send(res, 200, { mode: 'ai', answer: text, actions: actions.slice(0, 3) });
  } catch (e) {
    console.error(e);
    return C.send(res, 500, { error: 'AI xatosi' });
  }
};
