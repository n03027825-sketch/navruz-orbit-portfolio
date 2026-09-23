/* =========================================================
   Orbita Akademiya — app.js
   Kurslar katalogi · video-darslar (animatsiya + ovoz) · testlar ·
   yakuniy imtihon · sertifikat · to'lov (Payme/Click/Visa) · AI ustoz
   ========================================================= */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const API = '/api/akademiya';
const LS = {
  get(k, d) { try { const v = localStorage.getItem('oa.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('oa.' + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem('oa.' + k); } catch (e) {} }
};
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
let CAT = [], METHODS = {}, PASS = .7, SES = LS.get('ses', null), ME = null;
const app = $('#app');

/* ---------- ikonlar ---------- */
const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const IC = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
  prev: svg('<path d="M19 20 9 12l10-8zM5 19V5"/>'), next: svg('<path d="m5 4 10 8-10 8zM19 5v14"/>'),
  vol: svg('<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>'), cc: svg('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 10.5a2 2 0 1 0 0 3M17 10.5a2 2 0 1 0 0 3"/>'),
  full: svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'), arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'), back: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  lock: svg('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'), check: svg('<path d="m5 12 5 5 9-10"/>'), copy: svg('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
  dl: svg('<path d="M12 3v12M6 11l6 6 6-6M4 21h16"/>'), spark: svg('<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/>'), x: svg('<path d="M18 6 6 18M6 6l12 12"/>')
};
const LV = { 1: 'Boshlang‘ich', 2: 'O‘rta', 3: 'Chuqur' };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const som = n => n ? n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' so‘m' : 'Bepul';
const byId = id => CAT.find(c => c.id === id);
function inline(s) { return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>'); }
function md(x) {
  return String(x).split('\n\n').map(p => {
    const lines = p.split('\n');
    if (lines.every(l => /^(- |\d+\. )/.test(l))) return '<ul>' + lines.map(l => '<li>' + inline(l.replace(/^(- |\d+\. )/, '')) + '</li>').join('') + '</ul>';
    return '<p>' + lines.map(inline).join('<br>') + '</p>';
  }).join('');
}
const KW = {
  python: /\b(def|return|if|elif|else|for|while|in|import|from|as|class|try|except|finally|raise|with|and|or|not|True|False|None|lambda|async|await|pass|break|continue|print|self)\b/g,
  js: /\b(const|let|var|function|return|if|else|for|of|while|new|class|true|false|null|undefined|async|await|document|console)\b/g,
  sql: /\b(SELECT|FROM|WHERE|ORDER|BY|GROUP|HAVING|LIMIT|INSERT|INTO|VALUES|CREATE|TABLE|PRIMARY|KEY|FOREIGN|JOIN|LEFT|INNER|ON|AS|AND|OR|NOT|NULL|IS|IN|LIKE|BETWEEN|UPDATE|SET|DELETE|BEGIN|COMMIT|ROLLBACK|DISTINCT|COUNT|SUM|AVG|MIN|MAX|INTEGER|TEXT|UNIQUE|DEFAULT|CHECK|DESC|ASC)\b/g,
  bash: /\b(git|cd|mkdir|echo|pip|python|curl|source)\b/g
};
function hl(code, lang) {
  const L = lang === 'css' || lang === 'html' || lang === 'text' || lang === 'markdown' ? lang : (KW[lang] ? lang : 'python');
  return String(code).split('\n').map(line => {
    const cm = L === 'python' || L === 'bash' ? line.match(/(^|\s)(#.*)$/) : (L === 'js' ? line.match(/(^|[^:])(\/\/.*)$/) : (L === 'sql' ? line.match(/(^|\s)(--.*)$/) : null));
    let body = cm ? line.slice(0, line.length - cm[2].length) : line, out = '';
    const parts = body.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/);
    parts.forEach((pt, i) => {
      if (i % 2) { out += '<span class="s">' + esc(pt) + '</span>'; return; }
      let h = esc(pt);
      if (L === 'html') h = h.replace(/(&lt;\/?)([a-zA-Z0-9!]+)/g, '$1<span class="k">$2</span>');
      else if (L === 'css') h = h.replace(/([a-z-]+)(\s*:)/g, '<span class="f">$1</span>$2');
      else if (KW[L]) h = h.replace(KW[L], '<span class="k">$1</span>').replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="nm">$1</span>').replace(/([a-zA-Z_]\w*)(?=\()/g, '<span class="f">$1</span>');
      out += h;
    });
    return out + (cm ? '<span class="c">' + esc(cm[2]) + '</span>' : '');
  }).join('\n');
}
function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; $('#toasts').append(d); setTimeout(() => d.remove(), 3400); }
function lvl(n, c) { return `<span class="lv" style="--c:${c}"><i>${[1, 2, 3].map(i => `<b class="${i <= n ? 'f' : ''}"></b>`).join('')}</i>${LV[n]}</span>`; }

/* ---------- API ---------- */
async function api(op, body, method = 'POST') {
  try {
    const opt = method === 'GET' ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...(SES || {}), ...(body || {}) }) };
    const r = await fetch(`${API}?op=${op}` + (method === 'GET' && body ? '&' + new URLSearchParams(body) : ''), opt);
    const data = await r.json().catch(() => ({}));
    if (r.status === 401 && SES) { SES = null; ME = null; LS.del('ses'); updMe(); }
    return { ok: r.ok, status: r.status, data };
  } catch (e) { return { ok: false, status: 0, data: { error: 'Internet aloqasi yo‘q. Qayta urinib ko‘ring.' } }; }
}
async function loadCatalog() {
  const r = await api('catalog', null, 'GET');
  if (r.ok) { CAT = r.data.courses; METHODS = r.data.methods || {}; PASS = r.data.pass || .7; LS.set('cat', CAT); }
  else CAT = LS.get('cat', []);
}
async function loadMe() {
  if (!SES) { ME = null; updMe(); return; }
  const r = await api('me');
  if (r.ok) { ME = r.data.student; METHODS = r.data.methods || METHODS; }
  updMe();
}
function updMe() {
  $('#meName').textContent = ME ? ME.name.split(' ')[0] : 'Kirish';
  $('#meIni').textContent = ME ? ME.name.trim()[0].toUpperCase() : '?';
}
const progOf = cid => { const p = ME && ME.progress && ME.progress[cid]; return p ? Object.keys(p).length : 0; };
const owned = c => c.price === 0 || !!(ME && ME.courses && ME.courses[c.id] && ME.courses[c.id].paid);
const certOf = cid => ME && (ME.certs || []).find(x => x.course === cid);

/* ---------- modal ---------- */
function modal(html, onMount) {
  const m = $('#modal'); $('#mbox').innerHTML = `<button class="x" data-close aria-label="Yopish">${IC.x}</button>` + html; m.hidden = false;
  document.body.style.overflow = 'hidden'; onMount && onMount($('#mbox'));
  setTimeout(() => { const f = $('#mbox input'); f && f.focus(); }, 60);
}
function closeModal() { $('#modal').hidden = true; document.body.style.overflow = ''; }
$('#modal').addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });

function requireAuth(then, why) {
  if (SES && ME) return then();
  modal(`<h3>Ro‘yxatdan o‘tish</h3><p>${esc(why || 'Darslarni boshlash va natijalaringiz saqlanishi uchun qisqa ro‘yxatdan o‘ting. Parol kerak emas.')}</p>
  <form id="regF">
    <label class="fld"><span>Ism va familiya</span><input name="name" required maxlength="60" autocomplete="name" placeholder="Masalan: Navro‘z Rashidov"></label>
    <label class="fld"><span>Telefon</span><input name="phone" required inputmode="tel" autocomplete="tel" placeholder="+998 90 123 45 67"></label>
    <label class="fld"><span>Email (ixtiyoriy)</span><input name="email" type="email" autocomplete="email" placeholder="siz@mail.uz"></label>
    <label class="chk"><input type="checkbox" name="ok" required> <span>Ma’lumotlarim faqat o‘qish jarayoni va sertifikat uchun saqlanishiga roziman.</span></label>
    <div class="err" id="regErr"></div>
    <button class="btn pri" style="width:100%" type="submit">Boshlash ${IC.arrow}</button>
  </form>
  <p style="margin:14px 0 0;font-size:13px">Boshqa qurilmada ro‘yxatdan o‘tganmisiz? <a href="#" id="codeIn" style="color:var(--ice);font-weight:700">Kirish kodi bilan kirish</a></p>`, box => {
    const ph = $('input[name=phone]', box); ph.value = '+998 ';
    ph.addEventListener('input', () => { let d = ph.value.replace(/\D/g, ''); if (!d.startsWith('998')) d = '998' + d.replace(/^998/, ''); d = d.slice(0, 12); ph.value = '+' + d.replace(/^(\d{3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2}).*/, (m, a, b, c, e, f) => [a, b, c, e, f].filter(Boolean).join(' ')); });
    $('#regF').addEventListener('submit', async e => {
      e.preventDefault(); const f = new FormData(e.target); const btn = $('button[type=submit]', e.target); btn.disabled = true; $('#regErr').textContent = '';
      const r = await api('register', { name: f.get('name'), phone: String(f.get('phone')).replace(/\s/g, ''), email: f.get('email') });
      btn.disabled = false;
      if (!r.ok) { $('#regErr').textContent = r.data.error || 'Xatolik yuz berdi.'; return; }
      SES = { sid: r.data.sid, token: r.data.token }; LS.set('ses', SES); ME = r.data.student; updMe(); closeModal();
      toast(`Xush kelibsiz, ${ME.name.split(' ')[0]}! 🎓`); then();
    });
    $('#codeIn').addEventListener('click', e => { e.preventDefault(); codeLogin(then); });
  });
}
function codeLogin(then) {
  modal(`<h3>Kirish kodi bilan kirish</h3><p>Kabinetdagi “Kirish kodi”ni shu yerga qo‘ying.</p>
  <form id="codeF"><label class="fld"><span>Kirish kodi</span><input name="c" required placeholder="XXXXXXXXXXXX.xxxxxxxx..."></label><div class="err" id="cErr"></div>
  <button class="btn pri" style="width:100%">Kirish</button></form>`, () => {
    $('#codeF').addEventListener('submit', async e => {
      e.preventDefault(); const [sid, token] = String(new FormData(e.target).get('c')).trim().split('.');
      SES = { sid, token }; const r = await api('me');
      if (!r.ok) { SES = null; $('#cErr').textContent = 'Kod noto‘g‘ri.'; return; }
      LS.set('ses', SES); ME = r.data.student; updMe(); closeModal(); toast('Kirdingiz ✅'); then && then();
    });
  });
}
$('#meBtn').addEventListener('click', () => ME ? go('#/kabinet') : requireAuth(() => go('#/kabinet')));

/* ---------- to'lov ---------- */
function payModal(c) {
  requireAuth(() => {
    if (owned(c)) { toast('Bu kurs sizda allaqachon ochiq'); return; }
    const M = METHODS, any = M.payme || M.click || M.octo;
    modal(`<h3>Kursni ochish</h3><p><b style="color:var(--text)">${esc(c.title)}</b> — ${c.lessons.length} ta video-dars, testlar, yakuniy imtihon va sertifikat. Bir marta to‘laysiz, kurs butunlay sizniki.</p>
    <div style="font:800 30px var(--disp);margin-bottom:6px">${som(c.price)}</div>
    <div class="pm">
      <button type="button" data-m="payme" ${M.payme ? '' : 'disabled'}><i class="i-payme">pay<br>me</i><span><b>Payme</b><small>${M.payme ? 'Uzcard, Humo — Payme ilovasi orqali' : 'Tez orada ulanadi'}</small></span></button>
      <button type="button" data-m="click" ${M.click ? '' : 'disabled'}><i class="i-click">click</i><span><b>Click</b><small>${M.click ? 'Click ilovasi yoki karta' : 'Tez orada ulanadi'}</small></span></button>
      <button type="button" data-m="octo" ${M.octo ? '' : 'disabled'}><i class="i-visa">VISA</i><span><b>Visa / Mastercard</b><small>${M.octo ? 'Xalqaro va mahalliy kartalar' : 'Tez orada ulanadi'}</small></span></button>
    </div>
    ${any ? '<p style="font-size:12.5px;margin:0">To‘lov himoyalangan sahifada amalga oshadi — karta ma’lumotlari bizning saytga kiritilmaydi.</p>' : `<div class="note">To‘lov tizimlari hozir ulanmoqda. Kursni hoziroq ochmoqchi bo‘lsangiz, Navro‘zga yozing — qo‘lda ochib beradi.<br><a class="btn ghost sm" style="margin-top:10px" href="../#aloqa">Navro‘zga yozish ${IC.arrow}</a></div>`}
    <div class="err" id="payErr"></div>`, box => {
      $$('.pm button', box).forEach(b => b.addEventListener('click', async () => {
        $$('.pm button', box).forEach(x => x.disabled = true); $('#payErr').textContent = 'To‘lov sahifasi tayyorlanmoqda…';
        const r = await api('order', { course: c.id, method: b.dataset.m });
        if (r.ok && r.data.url) { LS.set('lastOrder', { oid: r.data.order, course: c.id }); location.href = r.data.url; return; }
        $('#payErr').textContent = r.data.error || 'Xatolik.'; $$('.pm button', box).forEach(x => x.disabled = !METHODS[x.dataset.m]);
      }));
    });
  }, 'Kursni sotib olish uchun avval ro‘yxatdan o‘ting — to‘lov aynan sizning hisobingizga bog‘lanadi.');
}

/* ---------- router ---------- */
let player = null;
function go(h) { if (location.hash === h) route(); else location.hash = h; }
addEventListener('hashchange', route);
function setNav(r) { $$('#nav a[data-r]').forEach(a => a.classList.toggle('on', a.dataset.r === r)); }
async function route() {
  if (player) { player.stop(); player = null; }
  const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
  const [p0, p1, p2] = parts;
  scrollTo({ top: 0, behavior: RM ? 'auto' : 'instant' in window ? 'instant' : 'auto' });
  AI.ctx = null;
  if (!p0) { setNav('home'); return home(); }
  if (p0 === 'narxlar') { setNav('narxlar'); return pricing(); }
  if (p0 === 'kurs' && byId(p1)) { setNav('home'); return coursePage(byId(p1)); }
  if (p0 === 'dars' && byId(p1)) { setNav('home'); return lessonPage(byId(p1), Math.max(0, (+p2 || 1) - 1)); }
  if (p0 === 'imtihon' && byId(p1)) { setNav('home'); return examPage(byId(p1)); }
  if (p0 === 'sertifikat') { setNav('sertifikat'); return certPage(p1); }
  if (p0 === 'kabinet') { setNav(''); return cabinet(); }
  if (p0 === 'tolov') { setNav(''); return payStatus(p1); }
  home();
}

/* ---------- HOME ---------- */
function courseCard(c) {
  const d = progOf(c.id), n = c.lessons.length, own = owned(c), crt = certOf(c.id);
  return `<a class="course" href="#/kurs/${c.id}" style="--c:${c.c}">
    ${crt ? '<span class="tag own">🏅 Sertifikat</span>' : c.price === 0 ? '<span class="tag">BEPUL</span>' : own ? '<span class="tag own">Ochiq</span>' : ''}
    <span class="ic">${c.icon}</span><h3>${esc(c.title)}</h3><p>${esc(c.sub)}</p>
    <div class="row">${lvl(c.level, c.c)}<span>${n} dars · ${c.hours} soat</span></div>
    ${d ? `<div class="pbar"><i style="width:${d / n * 100}%"></i></div>` : ''}
    <div class="row"><span class="price ${c.price ? '' : 'free'}">${som(c.price)}</span><span style="color:var(--c);font-weight:800">${d ? 'Davom etish →' : 'Boshlash →'}</span></div></a>`;
}
function home() {
  const lessons = CAT.reduce((s, c) => s + c.lessons.length, 0);
  app.innerHTML = `
  <section class="hero">
    <div>
      <span class="kick"><i></i>Orbita Akademiya · 2026</span>
      <h1>Dasturlashni <em>video-dars</em>, test va AI ustoz bilan o‘rganing</h1>
      <p class="lead">${CAT.length} ta kurs, ${lessons} ta video-dars (tanlangan eng yaxshi o‘zbekcha YouTube darslari), har darsda tushuntirish, kod va test. Oxirida — tekshiriladigan sertifikat. Python asoslari to‘liq bepul, qolgan kurslarning birinchi darsi ham bepul.</p>
      <div class="cta"><a class="btn pri" href="#/dars/python/1">${IC.play} Bepul boshlash</a><a class="btn ghost" href="#kurslar">Barcha kurslar</a><button class="btn ghost" type="button" data-ai>${IC.spark} AI ustozdan so‘rash</button></div>
      <div class="stats"><div><b>${CAT.length}</b><span>kurs</span></div><div><b>${lessons}</b><span>video-dars</span></div><div><b>${lessons * 3 + CAT.length * 10}</b><span>test savoli</span></div><div><b>24/7</b><span>AI ustoz</span></div></div>
    </div>
    <div class="hcard"><div class="scr"><code>${hl('# 1-dars: birinchi dastur\nprint("Salom, dunyo!")\n\nfor kun in range(1, 31):\n    organ(kun)   # har kuni oz-oz', 'python')}</code><a class="play" href="#/dars/python/1" aria-label="Video-darsni boshlash">${IC.play}</a></div>
      <div class="meta"><span><b>Python asoslari</b> · 1-dars</span><span>🔊 Ovozli · CC</span></div></div>
  </section>

  <section class="sec" id="kurslar">
    <div class="sh"><div><span class="eyebrow">Kurslar</span><h2>O‘zingizga mos <em>yo‘nalish</em></h2><p class="sub">Narx kursning chuqurligi va hajmiga qarab: oson kurslar arzonroq, chuqur kurslar qimmatroq.</p></div>
    <div class="filters" id="flt"><button class="on" data-f="all">Hammasi</button><button data-f="free">Bepul</button><button data-f="1">Boshlang‘ich</button><button data-f="2">O‘rta</button><button data-f="3">Chuqur</button></div></div>
    <div class="grid" id="cgrid">${CAT.map(courseCard).join('')}</div>
  </section>

  <section class="sec">
    <div class="sh"><div><span class="eyebrow">Qanday ishlaydi</span><h2>To‘rt qadam — <em>sertifikatgacha</em></h2></div></div>
    <div class="cards4">
      <div class="card"><div class="n">01</div><h4>Video-dars</h4><p>Har bir dars uchun tanlab olingan o‘zbek tilidagi YouTube darsligi va qisqa animatsion takrorlash.</p></div>
      <div class="card"><div class="n">02</div><h4>Tushuntirish va kod</h4><p>Qisqa matn, tayyor kod namunasi va qo‘shimcha YouTube videolar.</p></div>
      <div class="card"><div class="n">03</div><h4>Test</h4><p>Har darsdan keyin 3 ta savol. 2 tasiga to‘g‘ri javob — dars yakunlandi.</p></div>
      <div class="card"><div class="n">04</div><h4>Imtihon va sertifikat</h4><p>10 savollik yakuniy imtihon, 70% dan yuqori — noyob raqamli sertifikat.</p></div>
    </div>
  </section>

  <section class="sec">
    <div class="sh"><div><span class="eyebrow">To‘lov</span><h2>Qulay <em>to‘lov</em> usullari</h2><p class="sub">Bir marta to‘laysiz — kurs umrbod ochiq. To‘lov to‘lov tizimining himoyalangan sahifasida amalga oshadi.</p></div><a class="btn ghost" href="#/narxlar">Barcha narxlar ${IC.arrow}</a></div>
    <div class="pay-logos"><div class="plogo"><i class="i-payme">pay</i><span>Payme<small>Uzcard · Humo</small></span></div><div class="plogo"><i class="i-click">click</i><span>Click<small>Ilova yoki karta</small></span></div><div class="plogo"><i class="i-visa">VISA</i><span>Visa / Mastercard<small>Xalqaro kartalar</small></span></div></div>
  </section>

  <section class="sec faq">
    <div class="sh"><div><span class="eyebrow">Savollar</span><h2>Ko‘p so‘raladigan <em>savollar</em></h2></div></div>
    <details open><summary>Nimadan boshlasam bo‘ladi?</summary><p>“Python asoslari” kursidan — u butunlay bepul va hech qanday tajriba talab qilmaydi. Keyin sayt yaratish (HTML/CSS) yoki ma’lumot tahliliga o‘tishingiz mumkin.</p></details>
    <details><summary>Video-darslar qanday ishlaydi?</summary><p>Har bir darsning tepasida shu mavzu bo‘yicha tanlab olingan o‘zbekcha YouTube darsligi turadi (ba’zilarida qo‘shimcha video ham bor). Videodan keyin tushuntirish, kod namunasi va test bor; “Animatsiya” bo‘limida esa dars ovozli slaydlarda qisqacha takrorlanadi.</p></details>
    <details><summary>AI ustoz nima qila oladi?</summary><p>Savolingizga kurs materiallari asosida javob beradi, kerakli darsni ochib beradi (“SQL 5-darsni och”), mikrofon orqali ovozli savolni tushunadi va javobni ovozda o‘qib beradi.</p></details>
    <details><summary>Sertifikat haqiqiymi?</summary><p>Har bir sertifikatda noyob raqam bor. Uni istalgan kishi “Sertifikat tekshirish” sahifasida tekshira oladi — ism, kurs, ball va sana ko‘rinadi.</p></details>
    <details><summary>Boshqa qurilmada qanday kiraman?</summary><p>Kabinetingizdagi “Kirish kodi”ni saqlab qo‘ying. Yangi qurilmada “Kirish kodi bilan kirish” orqali barcha natijalaringiz qaytadi.</p></details>
  </section>`;
  $$('#flt button').forEach(b => b.addEventListener('click', () => {
    $$('#flt button').forEach(x => x.classList.toggle('on', x === b)); const f = b.dataset.f;
    const list = CAT.filter(c => f === 'all' || (f === 'free' ? c.price === 0 : c.level === +f));
    $('#cgrid').innerHTML = list.map(courseCard).join('') || '<div class="empty">Bu toifada kurs yo‘q.</div>';
  }));
  $$('[data-ai]').forEach(b => b.addEventListener('click', () => AI.open()));
}

/* ---------- NARXLAR ---------- */
function pricing() {
  app.innerHTML = `<section class="sec"><div class="sh"><div><span class="eyebrow">Narxlar</span><h2>Har bir kurs — <em>bir marta</em> to‘lov</h2><p class="sub">Narx kursning murakkabligi va hajmiga bog‘liq. Har bir pullik kursning 1-darsi bepul — avval sinab ko‘ring.</p></div></div>
  <div class="lessons">${CAT.map(c => `<a class="lrow" href="#/kurs/${c.id}" style="--c:${c.c}"><span class="no" style="font-size:18px">${c.icon}</span><span class="t"><b>${esc(c.title)}</b><small>${LV[c.level]} · ${c.lessons.length} dars · ${c.hours} soat · sertifikat</small></span><span class="price ${c.price ? '' : 'free'}">${som(c.price)}</span></a>`).join('')}</div></section>
  <section class="sec"><div class="cards4">
    <div class="card"><div class="n">✓</div><h4>Nima kiradi</h4><p>Barcha video-darslar, tushuntirishlar, kod namunalari, testlar, yakuniy imtihon va sertifikat.</p></div>
    <div class="card"><div class="n">∞</div><h4>Muddatsiz</h4><p>Obuna emas: bir marta to‘laysiz, kurs sizning hisobingizda doim ochiq.</p></div>
    <div class="card"><div class="n">🔒</div><h4>Xavfsiz to‘lov</h4><p>Payme, Click yoki Visa/Mastercard — to‘lov tizimining o‘z sahifasida. Karta ma’lumotlari bizga kelmaydi.</p></div>
    <div class="card"><div class="n">?</div><h4>Savol bo‘lsa</h4><p>To‘lov, qaytarish yoki guruh uchun chegirma bo‘yicha <a href="../#aloqa" style="color:var(--ice)">Navro‘zga yozing</a>.</p></div>
  </div></section>`;
}

/* ---------- KURS ---------- */
function coursePage(c) {
  AI.ctx = { course: c.id, n: 0 };
  const own = owned(c), d = progOf(c.id), crt = certOf(c.id), n = c.lessons.length, p = (ME && ME.progress && ME.progress[c.id]) || {};
  app.innerHTML = `<section class="chead" style="--c:${c.c}">
    <div><a class="back" href="#/">${IC.back} Barcha kurslar</a>
      <div style="display:flex;gap:14px;align-items:center;margin-top:18px"><span class="course" style="padding:0;min-height:0;border:0;background:none"><span class="ic" style="width:60px;height:60px;font-size:30px">${c.icon}</span></span>${lvl(c.level, c.c)}</div>
      <h2 style="font-size:clamp(28px,4vw,46px)">${esc(c.title)}</h2><p class="lead" style="font-size:17px">${esc(c.sub)}</p>
      ${d ? `<div style="max-width:420px"><div class="row" style="display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-bottom:6px"><span>Progress</span><span>${d} / ${n}</span></div><div class="pbar"><i style="width:${d / n * 100}%"></i></div></div>` : ''}
      <h3 style="font:700 18px var(--disp);margin:30px 0 8px">Darslar</h3>
      <div class="lessons">${c.lessons.map((t, i) => { const free = c.price === 0 || i === 0, ok = own || free, done = !!p[i];
        return `<a class="lrow ${done ? 'done' : ''} ${ok ? '' : 'lock'}" href="#/dars/${c.id}/${i + 1}"><span class="no">${done ? '✓' : i + 1}</span><span class="t"><b>${esc(t)}</b><small>Video-dars · tushuntirish · kod · test</small></span><span class="st">${done ? 'tugatildi' : ok ? (free && c.price ? 'bepul' : 'ochiq') : '🔒'}</span></a>`; }).join('')}
        <a class="lrow ${own ? '' : 'lock'}" href="#/imtihon/${c.id}"><span class="no">🏁</span><span class="t"><b>Yakuniy imtihon</b><small>10 savol · o‘tish chegarasi ${Math.round(PASS * 100)}% · sertifikat</small></span><span class="st">${crt ? '🏅 ' + crt.score + '%' : own ? d >= n ? 'tayyor' : d + '/' + n : '🔒'}</span></a>
      </div>
      <h3 style="font:700 18px var(--disp);margin:34px 0 10px">Qo‘shimcha video darsliklar</h3>
      <div class="yt">${(c.yt || []).map(v => `<button class="ytc" type="button" data-yt="${v[0]}"><div class="th" style="background-image:url(https://i.ytimg.com/vi/${v[0]}/hqdefault.jpg)"></div><p>${esc(v[1])}</p></button>`).join('')}</div>
      <div id="ytBox" style="margin-top:14px"></div>
    </div>
    <aside class="buy"><div class="eyebrow">${own ? 'Kurs sizda ochiq' : 'Kurs narxi'}</div><div class="big">${own && c.price ? '✓ Ochiq' : som(c.price)}</div>
      <ul><li>${n} ta video-dars (YouTube + animatsiya)</li><li>Tushuntirish va kod namunalari</li><li>${n * 3} ta test savoli</li><li>Yakuniy imtihon va sertifikat</li><li>AI ustoz yordami</li></ul>
      ${own ? `<a class="btn pri" style="width:100%" href="#/dars/${c.id}/${Math.min(n, d + 1)}">${IC.play} ${d ? 'Davom etish' : 'Boshlash'}</a>` : `<button class="btn sun" style="width:100%" id="buyBtn">Kursni ochish — ${som(c.price)}</button><a class="btn ghost" style="width:100%;margin-top:10px" href="#/dars/${c.id}/1">${IC.play} 1-dars bepul</a>`}
      ${crt ? `<a class="btn ghost" style="width:100%;margin-top:10px" href="#/sertifikat/${crt.id}">🏅 Sertifikatim</a>` : ''}
    </aside></section>`;
  $('#buyBtn') && $('#buyBtn').addEventListener('click', () => payModal(c));
  $$('[data-yt]').forEach(b => b.addEventListener('click', () => { $('#ytBox').innerHTML = `<iframe class="embed" src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`; $('#ytBox').scrollIntoView({ behavior: 'smooth', block: 'center' }); }));
}

/* ---------- DARS ---------- */
async function lessonPage(c, n) {
  AI.ctx = { course: c.id, n };
  const free = c.price === 0 || n === 0;
  if (!SES || !ME) {
    app.innerHTML = `<div class="center"><div class="result"><div style="font-size:44px">🎓</div><h2>${esc(c.title)} · ${n + 1}-dars</h2><p class="sub" style="margin:0 auto 18px">Darsni boshlash uchun ro‘yxatdan o‘ting — 20 soniya, parol kerak emas. Natijalaringiz saqlanadi va sertifikat ismingizga yoziladi.</p><button class="btn pri" id="regGo">Ro‘yxatdan o‘tish ${IC.arrow}</button></div></div>`;
    $('#regGo').addEventListener('click', () => requireAuth(() => lessonPage(c, n)));
    if (free) requireAuth(() => lessonPage(c, n));
    return;
  }
  app.innerHTML = '<div class="loading"><div class="spin"></div>Dars yuklanmoqda…</div>';
  const r = await api('lesson', { course: c.id, n });
  if (r.status === 402) {
    app.innerHTML = `<div class="center"><div class="result" style="--c:${c.c}"><div style="font-size:44px">🔒</div><h2>${esc(c.lessons[n])}</h2><p class="sub" style="margin:0 auto 18px">Bu dars “${esc(c.title)}” kursining pullik qismi. Kursni bir marta ochsangiz, barcha ${c.lessons.length} dars, imtihon va sertifikat sizniki bo‘ladi.</p>
    <div class="cta" style="justify-content:center"><button class="btn sun" id="buyBtn">Kursni ochish — ${som(c.price)}</button><a class="btn ghost" href="#/dars/${c.id}/1">1-dars (bepul)</a></div></div></div>`;
    $('#buyBtn').addEventListener('click', () => payModal(c)); return;
  }
  if (!r.ok) { app.innerHTML = `<div class="center"><div class="empty">${esc(r.data.error || 'Darsni yuklab bo‘lmadi.')}</div></div>`; return; }
  const L = r.data.lesson, p = (ME.progress && ME.progress[c.id]) || {};
  app.innerHTML = `<section class="lwrap" style="--c:${c.c}">
    <div>
      <a class="back" href="#/kurs/${c.id}">${IC.back} ${esc(c.title)}</a>
      <h2 style="font-size:clamp(22px,3vw,32px);margin:10px 0 14px">${n + 1}-dars. ${esc(L.title)}</h2>
      <div class="vbox" id="vbox"></div>
      <div class="tabs" id="tabs"><button class="on" data-t="x">📖 Tushuntirish</button><button data-t="code">💻 Kod</button><button data-t="q">✅ Test</button><button data-t="anim">🎬 Animatsiya</button></div>
      <div class="pane" id="pane"></div>
      <div class="lnav">${n > 0 ? `<a class="btn ghost" href="#/dars/${c.id}/${n}">${IC.back} Oldingi dars</a>` : '<span></span>'}${n < c.lessons.length - 1 ? `<a class="btn ghost" href="#/dars/${c.id}/${n + 2}">Keyingi dars ${IC.arrow}</a>` : `<a class="btn pri" href="#/imtihon/${c.id}">Yakuniy imtihon 🏁</a>`}</div>
    </div>
    <aside class="side">
      <div class="card"><h4>${esc(c.title)}</h4><div class="pbar" style="margin:8px 0"><i style="width:${progOf(c.id) / c.lessons.length * 100}%"></i></div><small style="color:var(--muted)">${progOf(c.id)} / ${c.lessons.length} dars tugatildi</small></div>
      ${c.lessons.map((t, i) => `<a class="lrow ${p[i] ? 'done' : ''}" href="#/dars/${c.id}/${i + 1}" ${i === n ? 'style="border-color:var(--c)"' : ''}><span class="no">${p[i] ? '✓' : i + 1}</span><span class="t"><b style="font-size:13.5px">${esc(t)}</b></span></a>`).join('')}
      <button class="btn ghost" type="button" id="askAi">${IC.spark} Shu dars bo‘yicha savol</button>
    </aside></section>`;
  mountVideo(c, n);
  const pane = $('#pane');
  const tabs = {
    x: () => { pane.innerHTML = `<div class="prose">${md(L.x)}</div>${L.task ? `<div class="task"><b>🎯 Amaliy vazifa</b><p>${esc(L.task)}</p><small>Vazifani bajarib ko‘ring — bilim amaliyotda mustahkamlanadi. Savol tug‘ilsa, AI ustozdan so‘rang.</small></div>` : ''}`; },
    code: () => { pane.innerHTML = `<div class="code"><button class="btn ghost sm cp" type="button">${IC.copy} Nusxa</button><pre>${hl(L.code, L.lang)}</pre></div><p style="color:var(--muted);font-size:13.5px;margin:12px 0 0">Kodni o‘zingiz yozib, ishga tushirib ko‘ring. Python uchun: <a href="https://www.online-python.com/" target="_blank" rel="noopener" style="color:var(--ice)">online-python.com</a>, SQL uchun: <a href="https://sqliteonline.com/" target="_blank" rel="noopener" style="color:var(--ice)">sqliteonline.com</a>.</p>`;
      $('.cp', pane).addEventListener('click', () => { navigator.clipboard && navigator.clipboard.writeText(L.code).then(() => toast('Kod nusxalandi')); }); },
    q: () => quiz(pane, L, c, n),
    anim: () => { pane.innerHTML = `<p style="color:var(--muted);font-size:14px;margin:0 0 12px">Qisqa animatsion takrorlash — darsning asosiy fikrlari ovozli slaydlarda.</p><div class="player" id="player"></div>`;
      player = new Player($('#player'), L.v, c);
      player.onEnd = () => { const b = $('#tabs [data-t=q]'); b.click(); pane.scrollIntoView({ behavior: 'smooth', block: 'start' }); }; }
  };
  $$('#tabs button').forEach(b => b.addEventListener('click', () => { if (player) { player.stop(); player = null; } $$('#tabs button').forEach(x => x.classList.toggle('on', x === b)); tabs[b.dataset.t](); }));
  tabs.x();
  $('#askAi').addEventListener('click', () => AI.open(`“${L.title}” mavzusini oddiyroq tushuntirib ber`));
}
function mountVideo(c, n) {
  const box = $('#vbox'); if (!box) return;
  const vs = (c.yt || [])[n] || [];
  if (!vs.length) { box.innerHTML = `<div class="note">Bu darsga video biriktirilmagan — tushuntirish va testdan foydalaning.</div>`; return; }
  box.innerHTML = `<div class="vframe"><iframe id="ytf" class="embed" src="https://www.youtube-nocookie.com/embed/${vs[0][0]}?rel=0&modestbranding=1" title="${esc(vs[0][1])}" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
  <div class="vlist">${vs.map((v, i) => `<button type="button" class="vchip${i ? '' : ' on'}" data-v="${v[0]}" data-t="${esc(v[1])}"><b>${i ? 'Qo‘shimcha' : 'Asosiy video'}</b><span>${esc(v[1])}</span></button>`).join('')}
  <a class="vchip out" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=${vs[0][0]}"><b>YouTube’da ochish</b><span>Yangi oynada</span></a></div>`;
  $$('.vchip[data-v]', box).forEach(b => b.addEventListener('click', () => {
    $$('.vchip[data-v]', box).forEach(x => x.classList.toggle('on', x === b));
    $('#ytf').src = `https://www.youtube-nocookie.com/embed/${b.dataset.v}?rel=0&modestbranding=1&autoplay=1`;
    $('#ytf').title = b.dataset.t;
  }));
}
function quiz(pane, L, c, n) {
  const pick = [];
  pane.innerHTML = `<div class="quiz">${L.q.map((q, i) => `<div class="q"><b>${i + 1}. ${esc(q[0])}</b><div class="opts">${q[1].map((o, j) => `<button type="button" class="opt" data-q="${i}" data-o="${j}">${esc(o)}</button>`).join('')}</div><div class="why" id="why${i}"></div></div>`).join('')}
  <button class="btn pri" id="qChk" type="button">Tekshirish</button><div id="qRes" style="margin-top:14px"></div></div>`;
  $$('.opt', pane).forEach(b => b.addEventListener('click', () => { if (pane.dataset.done) return; const i = +b.dataset.q; pick[i] = +b.dataset.o; $$(`.opt[data-q="${i}"]`, pane).forEach(x => x.classList.toggle('sel', x === b)); }));
  $('#qChk').addEventListener('click', async () => {
    if (pick.filter(v => v !== undefined).length < L.q.length) { toast('Barcha savollarga javob bering'); return; }
    pane.dataset.done = 1; let ok = 0;
    L.q.forEach((q, i) => { const right = q[2]; if (pick[i] === right) ok++;
      $$(`.opt[data-q="${i}"]`, pane).forEach(x => { const j = +x.dataset.o; x.classList.toggle('ok', j === right); x.classList.toggle('no', j === pick[i] && j !== right); });
      $('#why' + i).textContent = (pick[i] === right ? '✓ ' : '✗ ') + (q[3] || ''); });
    const passed = ok >= 2;
    $('#qChk').remove();
    $('#qRes').innerHTML = `<div class="${passed ? 'card' : 'note'}"><b style="font-size:18px">${ok} / ${L.q.length}</b> — ${passed ? 'Zo‘r! Dars yakunlandi ✅' : 'Yana bir bor urinib ko‘ring — kamida 2 ta to‘g‘ri javob kerak.'}</div>
      <div class="cta" style="margin-top:12px">${passed ? (n < c.lessons.length - 1 ? `<a class="btn pri" href="#/dars/${c.id}/${n + 2}">Keyingi dars ${IC.arrow}</a>` : `<a class="btn pri" href="#/imtihon/${c.id}">Yakuniy imtihon 🏁</a>`) : ''}<button class="btn ghost" id="qAgain" type="button">Qayta yechish</button></div>`;
    $('#qAgain').addEventListener('click', () => { delete pane.dataset.done; quiz(pane, L, c, n); });
    if (passed) { const r = await api('progress', { course: c.id, n, score: ok }); if (r.ok) { ME.progress[c.id] = r.data.progress; toast('Natija saqlandi'); } }
  });
}

/* ---------- VIDEO-DARS PLEYERI ---------- */
class Player {
  constructor(el, slides, c) {
    this.el = el; this.s = slides; this.c = c; this.i = 0; this.play = false; this.rate = 1; this.cc = true; this.t0 = 0; this.el0 = 0; this.dur = 5000; this.raf = 0; this.utt = null;
    this.synth = window.speechSynthesis; this.voice = this.pickVoice(); this.speak = !!this.voice && LS.get('voice', true);
    el.innerHTML = `<div class="stage" id="stage"><span class="blob" style="width:240px;height:240px;left:-60px;top:-40px;background:${c.c}"></span><span class="blob" style="width:200px;height:200px;right:-40px;bottom:-60px;background:#B79CFF;animation-delay:-4s"></span><div id="sl"></div><div class="cc" id="cc"></div><div class="bigplay" id="bp"><button type="button" aria-label="Video-darsni boshlash">${IC.play}</button></div></div>
    <div class="ctrl"><button type="button" id="pPlay" aria-label="Ijro">${IC.play}</button><button type="button" id="pPrev" aria-label="Oldingi slayd">${IC.prev}</button><button type="button" id="pNext" aria-label="Keyingi slayd">${IC.next}</button>
    <div class="seg" id="seg">${slides.map((_, i) => `<i data-i="${i}"><b></b></i>`).join('')}</div><span class="tm" id="tm"></span>
    <button type="button" class="spd" id="pSpd">1×</button><button type="button" id="pVoice" class="${this.speak ? 'on' : ''}" title="Ovozli tushuntirish">${IC.vol}</button><button type="button" id="pCc" class="on" title="Subtitr">${IC.cc}</button><button type="button" id="pFull" title="To‘liq ekran">${IC.full}</button></div>`;
    $('#bp', el).addEventListener('click', () => this.start());
    $('#pPlay', el).addEventListener('click', () => this.play ? this.pause() : this.start());
    $('#pPrev', el).addEventListener('click', () => this.goto(this.i - 1));
    $('#pNext', el).addEventListener('click', () => this.goto(this.i + 1));
    $$('#seg i', el).forEach(x => x.addEventListener('click', () => this.goto(+x.dataset.i)));
    $('#pSpd', el).addEventListener('click', e => { const R = [1, 1.25, 1.5, .85]; this.rate = R[(R.indexOf(this.rate) + 1) % R.length]; e.currentTarget.textContent = this.rate + '×'; if (this.play) this.goto(this.i); });
    $('#pVoice', el).addEventListener('click', e => { this.speak = !this.speak; if (this.speak && !this.voice) { this.voice = this.pickVoice(true); toast(this.voice ? 'Ovoz yoqildi' : 'Brauzeringizda ovoz yo‘q — subtitr bilan davom eting'); } e.currentTarget.classList.toggle('on', this.speak); LS.set('voice', this.speak); if (this.play) this.goto(this.i); });
    $('#pCc', el).addEventListener('click', e => { this.cc = !this.cc; e.currentTarget.classList.toggle('on', this.cc); $('#cc', el).hidden = !this.cc; });
    $('#pFull', el).addEventListener('click', () => { const s = $('#stage', el); document.fullscreenElement ? document.exitFullscreen() : (s.requestFullscreen && s.requestFullscreen()); });
    if (this.synth && !this.voice) this.synth.onvoiceschanged = () => { if (!this.voice) { this.voice = this.pickVoice(); if (this.voice && LS.get('voice', true)) { this.speak = true; $('#pVoice', el).classList.add('on'); } } };
    this.render(0, false);
  }
  pickVoice(any) {
    if (!this.synth) return null; const V = this.synth.getVoices();
    return V.find(v => /^uz/i.test(v.lang)) || V.find(v => /^tr/i.test(v.lang)) || (any ? V.find(v => /^(ru|en)/i.test(v.lang)) || V[0] : null) || null;
  }
  words(t) { return t.split(/\s+/).map((w, k) => `<span style="animation-delay:${k * 60}ms">${esc(w)}</span>`).join(' '); }
  render(i, animate = true) {
    const [h, say, code] = this.s[i]; const sl = $('#sl', this.el);
    sl.innerHTML = `<div class="slide"><div class="sn">${String(i + 1).padStart(2, '0')} / ${String(this.s.length).padStart(2, '0')} · ${esc(this.c.title)}</div><h3>${this.words(h)}</h3><div class="say">${esc(say)}</div>${code ? '<pre id="typed"></pre>' : ''}</div>`;
    if (!animate) $$('.slide *', sl).forEach(x => x.style.animation = 'none'), $$('.slide h3 span', sl).forEach(x => { x.style.opacity = 1; x.style.transform = 'none'; });
    $('#cc', this.el).textContent = say;
    $$('#seg i', this.el).forEach((x, k) => $('b', x).style.width = k < i ? '100%' : '0%');
    if (code) { const pre = $('#typed', sl); if (!animate || RM) pre.innerHTML = hl(code, this.c.id === 'sql' ? 'sql' : this.c.id === 'js' ? 'js' : this.c.id === 'htmlcss' ? (code.trim().startsWith('<') ? 'html' : 'css') : this.c.id === 'git' ? 'bash' : 'python');
      else { let k = 0; clearInterval(this.ty); const L = this.c.id === 'sql' ? 'sql' : this.c.id === 'js' ? 'js' : this.c.id === 'htmlcss' ? (code.trim().startsWith('<') ? 'html' : 'css') : this.c.id === 'git' ? 'bash' : 'python';
        setTimeout(() => { this.ty = setInterval(() => { k += 2; pre.innerHTML = esc(code.slice(0, k)) + '<span class="caret"></span>'; if (k >= code.length) { clearInterval(this.ty); pre.innerHTML = hl(code, L); } }, 28 / this.rate); }, 600); } }
  }
  start() { $('#bp', this.el).hidden = true; this.play = true; $('#pPlay', this.el).innerHTML = IC.pause; this.goto(this.i >= this.s.length ? 0 : this.i); }
  pause() { this.play = false; $('#pPlay', this.el).innerHTML = IC.play; cancelAnimationFrame(this.raf); clearTimeout(this.tmr); this.el0 += performance.now() - this.t0; this.synth && this.synth.cancel(); }
  goto(i) {
    if (i < 0) i = 0; if (i >= this.s.length) { this.finish(); return; }
    this.i = i; cancelAnimationFrame(this.raf); clearTimeout(this.tmr); this.synth && this.synth.cancel();
    this.render(i, true); if (!this.play) { $('#bp', this.el).hidden = true; this.play = true; $('#pPlay', this.el).innerHTML = IC.pause; }
    const [h, say, code] = this.s[i]; const wordsN = (h + ' ' + say).split(/\s+/).length;
    this.dur = Math.max(4500, wordsN * 430 + (code ? code.length * 22 + 1200 : 0)) / this.rate; this.t0 = performance.now(); this.el0 = 0;
    const tick = () => { const e = this.el0 + performance.now() - this.t0, f = Math.min(1, e / this.dur); $('b', $$('#seg i', this.el)[i]).style.width = f * 100 + '%'; $('#tm', this.el).textContent = `${i + 1}/${this.s.length}`; if (this.play) this.raf = requestAnimationFrame(tick); };
    tick();
    if (this.speak && this.synth && this.voice) {
      const u = new SpeechSynthesisUtterance(h + '. ' + say); u.voice = this.voice; u.lang = this.voice.lang; u.rate = .95 * this.rate;
      let ended = false; u.onend = () => { if (ended || !this.play || this.i !== i) return; ended = true; const rest = Math.max(600, this.dur - (performance.now() - this.t0)); this.tmr = setTimeout(() => this.play && this.i === i && this.goto(i + 1), Math.min(rest, code ? 2500 : 900)); };
      this.synth.speak(u); this.tmr = setTimeout(() => { if (!ended && this.play && this.i === i) { ended = true; this.goto(i + 1); } }, this.dur + 12000);
    } else this.tmr = setTimeout(() => this.play && this.i === i && this.goto(i + 1), this.dur);
  }
  finish() {
    this.pause(); this.i = this.s.length; $$('#seg i b', this.el).forEach(b => b.style.width = '100%');
    $('#sl', this.el).innerHTML = `<div class="slide" style="align-items:center;text-align:center"><div style="font-size:52px">🎉</div><h3>Video-dars tugadi!</h3><div class="say" style="opacity:1">Endi bilimingizni test bilan mustahkamlang.</div><div class="cta" style="justify-content:center"><button class="btn pri" type="button" id="toQ">Testni boshlash ${IC.arrow}</button><button class="btn ghost" type="button" id="rep">Qayta ko‘rish</button></div></div>`;
    $('#cc', this.el).textContent = ''; $('#toQ', this.el).addEventListener('click', () => this.onEnd && this.onEnd()); $('#rep', this.el).addEventListener('click', () => { this.i = 0; this.start(); });
    this.onEnd && setTimeout(() => {}, 0);
  }
  stop() { this.play = false; cancelAnimationFrame(this.raf); clearTimeout(this.tmr); clearInterval(this.ty); this.synth && this.synth.cancel(); }
}

/* ---------- IMTIHON ---------- */
async function examPage(c) {
  AI.ctx = { course: c.id, n: 0 };
  if (!SES || !ME) { requireAuth(() => examPage(c)); app.innerHTML = '<div class="center"><div class="empty">Imtihon uchun ro‘yxatdan o‘ting.</div></div>'; return; }
  app.innerHTML = '<div class="loading"><div class="spin"></div>Imtihon tayyorlanmoqda…</div>';
  const r = await api('exam', { course: c.id });
  if (!r.ok) {
    app.innerHTML = `<div class="center"><div class="result"><div style="font-size:44px">${r.status === 402 ? '🔒' : '📚'}</div><h2>Yakuniy imtihon</h2><p class="sub" style="margin:0 auto 18px">${esc(r.data.error || 'Xatolik')}</p><div class="cta" style="justify-content:center">${r.status === 402 ? `<button class="btn sun" id="buyBtn">Kursni ochish — ${som(c.price)}</button>` : ''}<a class="btn ghost" href="#/kurs/${c.id}">Kursga qaytish</a></div></div></div>`;
    $('#buyBtn') && $('#buyBtn').addEventListener('click', () => payModal(c)); return;
  }
  const Q = r.data.questions, pick = [];
  app.innerHTML = `<div class="center" style="--c:${c.c}"><a class="back" href="#/kurs/${c.id}">${IC.back} ${esc(c.title)}</a><h2>Yakuniy imtihon 🏁</h2><p class="sub">${Q.length} ta savol. O‘tish uchun kamida ${Math.round(PASS * 100)}% to‘g‘ri javob kerak. Natija sertifikatga yoziladi.</p>
  <div class="pane quiz" style="margin-top:18px">${Q.map((q, i) => `<div class="q"><b>${i + 1}. ${esc(q.q)}</b><div class="opts">${q.o.map(o => `<button type="button" class="opt" data-q="${i}" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="why" id="ew${i}"></div></div>`).join('')}
  <button class="btn pri" id="eSend" type="button">Javoblarni yuborish</button></div><div id="eRes" style="margin-top:20px"></div></div>`;
  $$('.opt').forEach(b => b.addEventListener('click', () => { if (app.dataset.sent) return; const i = +b.dataset.q; pick[i] = b.dataset.v; $$(`.opt[data-q="${i}"]`).forEach(x => x.classList.toggle('sel', x === b)); }));
  app.dataset.sent = '';
  $('#eSend').addEventListener('click', async () => {
    if (pick.filter(Boolean).length < Q.length) { toast(`Hali ${Q.length - pick.filter(Boolean).length} ta savolga javob berilmagan`); return; }
    $('#eSend').disabled = true;
    const g = await api('grade', { course: c.id, answers: pick.map(v => new DOMParser().parseFromString(v, 'text/html').documentElement.textContent) });
    if (!g.ok) { toast(g.data.error || 'Xatolik'); $('#eSend').disabled = false; return; }
    app.dataset.sent = 1; $('#eSend').remove();
    g.data.review.forEach((rv, i) => { $$(`.opt[data-q="${i}"]`).forEach(x => { const v = x.textContent; x.classList.toggle('ok', v === rv.right); x.classList.toggle('no', !rv.hit && v === pick[i]); }); });
    const d = g.data;
    $('#eRes').innerHTML = `<div class="result"><div class="sc" style="color:${d.passed ? 'var(--ok)' : 'var(--sun)'}">${d.score}%</div><p class="sub" style="margin:0 auto 16px">${d.ok} / ${d.total} to‘g‘ri. ${d.passed ? 'Tabriklaymiz — imtihondan o‘tdingiz! 🎉' : `O‘tish uchun ${Math.round(PASS * 100)}% kerak. Darslarni takrorlab, qayta urinib ko‘ring.`}</p>
      ${d.passed && d.cert ? `<a class="btn pri" href="#/sertifikat/${d.cert.id}">🏅 Sertifikatni ko‘rish</a>` : `<button class="btn ghost" id="eAgain" type="button">Qayta topshirish</button>`}</div>`;
    $('#eAgain') && $('#eAgain').addEventListener('click', () => examPage(c));
    if (d.cert) { await loadMe(); burst(); }
    $('#eRes').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
function burst() { if (RM) return; for (let i = 0; i < 40; i++) { const s = document.createElement('i'); s.style.cssText = `position:fixed;z-index:95;left:50%;top:45%;width:8px;height:8px;border-radius:2px;background:${['#6CE4F0', '#FFB547', '#FF5D8F', '#7CF0A6', '#B79CFF'][i % 5]};pointer-events:none;transition:transform 1.3s cubic-bezier(.2,.8,.2,1),opacity 1.3s`; document.body.append(s); requestAnimationFrame(() => { s.style.transform = `translate(${(Math.random() - .5) * 700}px,${(Math.random() - .7) * 500}px) rotate(${Math.random() * 720}deg)`; s.style.opacity = 0; }); setTimeout(() => s.remove(), 1400); } }

/* ---------- SERTIFIKAT ---------- */
async function certPage(id) {
  if (!id) {
    app.innerHTML = `<div class="center"><span class="eyebrow">Tekshirish</span><h2>Sertifikatni <em>tekshirish</em></h2><p class="sub">Sertifikatdagi raqamni kiriting — u haqiqiymi, kimga va qaysi kurs uchun berilganini ko‘rasiz.</p>
    <form class="verify" id="vf"><input name="id" required placeholder="NO-2026-XXXXXXXX" style="text-transform:uppercase"><button class="btn pri">Tekshirish</button></form>
    ${ME && ME.certs && ME.certs.length ? `<h3 style="font:700 18px var(--disp);margin:30px 0 10px">Mening sertifikatlarim</h3><div class="lessons">${ME.certs.map(x => `<a class="lrow" href="#/sertifikat/${x.id}"><span class="no">🏅</span><span class="t"><b>${esc(x.title)}</b><small>${x.id} · ${x.date} · ${x.score}%</small></span></a>`).join('')}</div>` : ''}</div>`;
    $('#vf').addEventListener('submit', e => { e.preventDefault(); go('#/sertifikat/' + String(new FormData(e.target).get('id')).trim().toUpperCase()); });
    return;
  }
  app.innerHTML = '<div class="loading"><div class="spin"></div>Tekshirilmoqda…</div>';
  const r = await api('cert', { id }, 'GET');
  if (!r.ok) { app.innerHTML = `<div class="center"><div class="result"><div style="font-size:44px">❌</div><h2>Topilmadi</h2><p class="sub" style="margin:0 auto 18px">${esc(r.data.error || 'Bunday sertifikat yo‘q.')}</p><a class="btn ghost" href="#/sertifikat">Boshqa raqam</a></div></div>`; return; }
  const c = r.data.cert, url = location.origin + location.pathname + '#/sertifikat/' + c.id;
  app.innerHTML = `<div class="center"><span class="kick"><i></i>Haqiqiy sertifikat · tasdiqlandi</span><h2 style="margin-top:14px">${esc(c.name)}</h2><p class="sub">“${esc(c.title)}” kursini ${c.score}% natija bilan ${c.date} kuni tamomlagan.</p>
  <div class="certbox"><canvas id="cv" width="1600" height="1130"></canvas></div>
  <div class="cta" style="margin-top:16px"><button class="btn pri" id="dl" type="button">${IC.dl} PNG yuklab olish</button><button class="btn ghost" id="cpu" type="button">${IC.copy} Havolani nusxalash</button><a class="btn ghost" target="_blank" rel="noopener" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(c.title)}&organizationName=${encodeURIComponent('Orbita Akademiya')}&certId=${encodeURIComponent(c.id)}&certUrl=${encodeURIComponent(url)}">LinkedIn’ga qo‘shish</a></div></div>`;
  const cv = $('#cv'); drawCert(cv, c, url);
  if (document.fonts) document.fonts.ready.then(() => drawCert(cv, c, url));
  $('#dl').addEventListener('click', () => { const a = document.createElement('a'); a.download = `sertifikat-${c.id}.png`; a.href = cv.toDataURL('image/png'); a.click(); });
  $('#cpu').addEventListener('click', () => navigator.clipboard && navigator.clipboard.writeText(url).then(() => toast('Havola nusxalandi')));
}
function drawCert(cv, c, url) {
  const g = cv.getContext('2d'), W = cv.width, H = cv.height;
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#070919'); bg.addColorStop(1, '#10123A'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
  const glow = g.createRadialGradient(W * .8, H * .15, 0, W * .8, H * .15, 700); glow.addColorStop(0, 'rgba(183,156,255,.28)'); glow.addColorStop(1, 'rgba(183,156,255,0)'); g.fillStyle = glow; g.fillRect(0, 0, W, H);
  const glow2 = g.createRadialGradient(W * .1, H * .95, 0, W * .1, H * .95, 600); glow2.addColorStop(0, 'rgba(108,228,240,.2)'); glow2.addColorStop(1, 'rgba(108,228,240,0)'); g.fillStyle = glow2; g.fillRect(0, 0, W, H);
  const fr = g.createLinearGradient(0, 0, W, 0); ['#6CE4F0', '#B79CFF', '#FF5D8F', '#FFB547'].forEach((cc, i) => fr.addColorStop(i / 3, cc));
  g.strokeStyle = fr; g.lineWidth = 6; g.strokeRect(40, 40, W - 80, H - 80); g.strokeStyle = 'rgba(170,180,255,.25)'; g.lineWidth = 1.5; g.strokeRect(62, 62, W - 124, H - 124);
  g.textAlign = 'center'; g.fillStyle = '#6CE4F0'; g.font = '600 26px "JetBrains Mono", monospace'; g.fillText('ORBITA AKADEMIYA · NAVRO’Z ORBITASI', W / 2, 150);
  g.fillStyle = '#EEEDFB'; g.font = '800 92px "Unbounded", "Arial Black", sans-serif'; g.fillText('SERTIFIKAT', W / 2, 270);
  g.fillStyle = '#A09EC2'; g.font = '500 30px "Manrope", sans-serif'; g.fillText('Ushbu sertifikat', W / 2, 350);
  g.fillStyle = fr; g.font = '800 74px "Unbounded", "Arial Black", sans-serif'; let fs = 74; while (g.measureText(c.name).width > W - 260 && fs > 36) { fs -= 4; g.font = `800 ${fs}px "Unbounded", sans-serif`; } g.fillText(c.name, W / 2, 460);
  g.fillStyle = '#A09EC2'; g.font = '500 30px "Manrope", sans-serif'; g.fillText('quyidagi kursni muvaffaqiyatli tamomlaganini tasdiqlaydi:', W / 2, 540);
  g.fillStyle = '#EEEDFB'; g.font = '700 50px "Unbounded", sans-serif'; g.fillText(c.title, W / 2, 625);
  g.fillStyle = '#A09EC2'; g.font = '500 28px "Manrope", sans-serif'; g.fillText(`${c.hours} soatlik kurs · yakuniy imtihon natijasi: ${c.score}%`, W / 2, 690);
  const box = (x, label, val) => { g.textAlign = 'left'; g.fillStyle = '#6E6C92'; g.font = '600 20px "JetBrains Mono", monospace'; g.fillText(label, x, 860); g.fillStyle = '#EEEDFB'; g.font = '700 30px "Manrope", sans-serif'; g.fillText(val, x, 905); };
  box(140, 'SANA', c.date); box(520, 'SERTIFIKAT RAQAMI', c.id); box(1050, 'BERDI', 'Navro’z · Orbita Akademiya');
  g.strokeStyle = 'rgba(170,180,255,.3)'; g.beginPath(); g.moveTo(140, 800); g.lineTo(W - 140, 800); g.stroke();
  g.textAlign = 'center'; g.fillStyle = '#6E6C92'; g.font = '500 22px "JetBrains Mono", monospace'; g.fillText('Tekshirish: ' + url.replace(/^https?:\/\//, ''), W / 2, 1010);
  g.save(); g.translate(W - 230, 250); g.fillStyle = 'rgba(255,181,71,.14)'; g.beginPath(); g.arc(0, 0, 95, 0, 7); g.fill(); g.strokeStyle = '#FFB547'; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 80, 0, 7); g.stroke(); g.fillStyle = '#FFB547'; g.font = '800 50px "Unbounded", sans-serif'; g.fillText(c.score + '%', 0, 16); g.restore();
}

/* ---------- KABINET ---------- */
function cabinet() {
  if (!SES || !ME) { app.innerHTML = `<div class="center"><div class="result"><div style="font-size:44px">👤</div><h2>Kabinet</h2><p class="sub" style="margin:0 auto 18px">Ro‘yxatdan o‘ting yoki kirish kodi bilan kiring.</p><div class="cta" style="justify-content:center"><button class="btn pri" id="r1">Ro‘yxatdan o‘tish</button><button class="btn ghost" id="r2">Kirish kodi bilan</button></div></div></div>`;
    $('#r1').addEventListener('click', () => requireAuth(cabinet)); $('#r2').addEventListener('click', () => codeLogin(cabinet)); return; }
  const mine = CAT.filter(c => owned(c) || progOf(c.id));
  app.innerHTML = `<section class="sec"><div class="sh"><div><span class="eyebrow">Kabinet</span><h2>Salom, <em>${esc(ME.name.split(' ')[0])}</em>!</h2><p class="sub">${esc(ME.name)} · ${esc(ME.phone)}</p></div><div class="cta"><button class="btn ghost sm" id="kod">🔑 Kirish kodi</button><button class="btn ghost sm" id="out">Chiqish</button></div></div>
  <div class="cards4" style="margin-bottom:26px"><div class="card"><div class="n">KURSLAR</div><h4>${mine.length}</h4></div><div class="card"><div class="n">DARSLAR</div><h4>${CAT.reduce((s, c) => s + progOf(c.id), 0)}</h4></div><div class="card"><div class="n">SERTIFIKAT</div><h4>${(ME.certs || []).length}</h4></div><div class="card"><div class="n">KEYINGI QADAM</div><h4 style="font-size:14px">${mine.length ? 'Darsni davom ettiring' : 'Python asoslaridan boshlang'}</h4></div></div>
  <h3 style="font:700 18px var(--disp);margin:0 0 12px">Mening kurslarim</h3>
  <div class="grid">${(mine.length ? mine : [byId('python')]).filter(Boolean).map(courseCard).join('')}</div>
  ${(ME.certs || []).length ? `<h3 style="font:700 18px var(--disp);margin:30px 0 12px">Sertifikatlar</h3><div class="lessons">${ME.certs.map(x => `<a class="lrow" href="#/sertifikat/${x.id}"><span class="no">🏅</span><span class="t"><b>${esc(x.title)}</b><small>${x.id} · ${x.date}</small></span><span class="st">${x.score}%</span></a>`).join('')}</div>` : ''}</section>`;
  $('#out').addEventListener('click', () => { if (!confirm('Chiqasizmi? Qayta kirish uchun “Kirish kodi” kerak bo‘ladi — avval uni saqlab oling.')) return; SES = null; ME = null; LS.del('ses'); updMe(); go('#/'); });
  $('#kod').addEventListener('click', () => { const code = SES.sid + '.' + SES.token; modal(`<h3>Kirish kodi</h3><p>Bu kod — hisobingiz kaliti. Uni hech kimga bermang. Boshqa qurilmada “Kirish kodi bilan kirish” orqali foydalaning.</p><div class="code"><pre style="white-space:pre-wrap;word-break:break-all">${esc(code)}</pre></div><button class="btn pri" style="width:100%;margin-top:12px" id="cpk">${IC.copy} Nusxalash</button>`, () => $('#cpk').addEventListener('click', () => navigator.clipboard && navigator.clipboard.writeText(code).then(() => toast('Kod nusxalandi')))); });
}

/* ---------- TO'LOV HOLATI ---------- */
async function payStatus(oid) {
  app.innerHTML = `<div class="center"><div class="result"><div class="spin"></div><h2>To‘lov tekshirilmoqda…</h2><p class="sub" style="margin:0 auto">To‘lov tizimidan tasdiq kutilmoqda. Bu odatda bir necha soniya oladi.</p></div></div>`;
  for (let k = 0; k < 40; k++) {
    const r = await api('status', { id: oid }, 'GET');
    if (location.hash.indexOf(oid) < 0) return;
    if (r.ok && r.data.status === 'paid') { await loadMe(); burst(); app.innerHTML = `<div class="center"><div class="result"><div style="font-size:52px">✅</div><h2>To‘lov qabul qilindi!</h2><p class="sub" style="margin:0 auto 18px">“${esc(r.data.title)}” kursi hisobingizda ochildi. Omad!</p><a class="btn pri" href="#/kurs/${r.data.course}">Kursga o‘tish ${IC.arrow}</a></div></div>`; return; }
    if (r.ok && r.data.status === 'cancelled') { app.innerHTML = `<div class="center"><div class="result"><div style="font-size:52px">⚠️</div><h2>To‘lov bekor qilindi</h2><p class="sub" style="margin:0 auto 18px">Hisobingizdan pul yechilmagan bo‘lsa, qayta urinib ko‘rishingiz mumkin.</p><a class="btn ghost" href="#/kurs/${r.data.course}">Kursga qaytish</a></div></div>`; return; }
    await new Promise(z => setTimeout(z, 3000));
  }
  app.innerHTML = `<div class="center"><div class="result"><div style="font-size:52px">⏳</div><h2>Tasdiq hali kelmadi</h2><p class="sub" style="margin:0 auto 18px">Agar to‘lagan bo‘lsangiz, kurs bir necha daqiqada avtomatik ochiladi. Muammo bo‘lsa, buyurtma raqami bilan yozing: #${esc(oid)}</p><a class="btn ghost" href="#/kabinet">Kabinet</a></div></div>`;
}

/* ---------- AI USTOZ ---------- */
const AI = {
  ctx: null, hist: [], speak: LS.get('aiVoice', false), rec: null,
  el: $('#ai'), msgs: $('#aiMsgs'),
  open(q) { this.el.hidden = false; $('#aiFab').hidden = true; if (!this.msgs.children.length) this.bot('Salom! Men Orbita AI ustozman 🤖\nSavol bering — tushuntiraman. “Pandas kursini och”, “SQL 5-darsni och”, “sertifikatim” deb ham yozishingiz mumkin. 🎤 tugmasi bilan ovozda so‘rang.'); this.sugg(); if (q) this.ask(q); else setTimeout(() => $('#aiIn').focus(), 80); },
  close() { this.el.hidden = true; $('#aiFab').hidden = false; window.speechSynthesis && window.speechSynthesis.cancel(); },
  add(t, who) { const d = document.createElement('div'); d.className = 'msg ' + who; d.innerHTML = who === 'bot' ? inline(t).replace(/\n/g, '<br>') : esc(t); this.msgs.append(d); this.msgs.scrollTop = 1e9; return d; },
  bot(t, acts) { this.add(t, 'bot'); if (acts && acts.length) { const w = document.createElement('div'); w.className = 'acts'; acts.forEach(a => { const b = document.createElement('button'); b.type = 'button'; b.textContent = (a.type === 'url' ? '↗ ' : '▶ ') + a.label; b.addEventListener('click', () => this.act(a)); w.append(b); }); this.msgs.append(w); this.msgs.scrollTop = 1e9; } if (this.speak) this.say(t); },
  act(a) { if (a.type === 'lesson') go(`#/dars/${a.course}/${a.n + 1}`); else if (a.type === 'course') go(`#/kurs/${a.course}`); else if (a.type === 'page') go('#/' + a.page); else if (a.type === 'url') open(a.url, '_blank', 'noopener'); if (innerWidth < 700) this.close(); },
  say(t) { const s = window.speechSynthesis; if (!s) return; s.cancel(); const V = s.getVoices(); const v = V.find(x => /^uz/i.test(x.lang)) || V.find(x => /^tr/i.test(x.lang)) || V.find(x => /^ru/i.test(x.lang)); const u = new SpeechSynthesisUtterance(t.replace(/[📘•🤖🎤▶↗]/gu, '').slice(0, 600)); if (v) { u.voice = v; u.lang = v.lang; } u.rate = 1; s.speak(u); },
  sugg() {
    const c = this.ctx && byId(this.ctx.course);
    const S = c ? [`${c.lessons[this.ctx.n] || c.title} — oddiyroq tushuntir`, 'Menga misol ber', 'Keyingi darsni och', `${c.title} narxi qancha?`] : ['for sikli nima?', 'SQL JOIN nima?', 'Qaysi kursdan boshlay?', 'Sertifikat qanday olinadi?', 'KUNIM loyihasini och'];
    $('#aiSugg').innerHTML = S.map(s => `<button type="button">${esc(s)}</button>`).join(''); $$('#aiSugg button').forEach(b => b.addEventListener('click', () => this.ask(b.textContent)));
  },
  local(q) {
    const s = q.toLowerCase().replace(/[’'‘`ʻ]/g, '');
    const wantOpen = /\boch|ochib|ko.?rsat|open|boshla|o.?t\b|olib bor/.test(s);
    const SYN = { python: ['python', 'piton', 'paiton'], htmlcss: ['html', 'css', 'sayt yarat'], git: ['git', 'github'], aiprompt: ['prompt', 'suniy intellekt', 'chatgpt'], js: ['javascript', 'js ', 'jsni'], oop: ['oop', 'klass', 'obyekt'], sql: ['sql', 'baza'], tgbot: ['telegram', 'bot'], pandas: ['pandas', 'tahlil'], algo: ['algoritm'], backend: ['backend', 'fastapi'], ml: ['machine', 'ml ', 'mashinali'] };
    let cid = Object.keys(SYN).find(k => SYN[k].some(w => (s + ' ').includes(w)));
    const m = s.match(/(\d{1,2})\s*-?\s*(chi\s*)?dars/);
    if (/keyingi dars/.test(s) && this.ctx && byId(this.ctx.course)) { const c = byId(this.ctx.course); const n = Math.min(c.lessons.length - 1, this.ctx.n + 1); go(`#/dars/${c.id}/${n + 1}`); return `Ochdim: ${c.title} → ${n + 1}-dars “${c.lessons[n]}”.`; }
    if (m && (cid || (this.ctx && this.ctx.course))) { const c = byId(cid || this.ctx.course); const n = Math.min(c.lessons.length, Math.max(1, +m[1])); go(`#/dars/${c.id}/${n}`); return `Ochdim: ${c.title} → ${n}-dars “${c.lessons[n - 1]}”.`; }
    if (wantOpen && cid && /kurs|och/.test(s)) { go(`#/kurs/${cid}`); return `“${byId(cid).title}” kursini ochdim. Darslar ro‘yxati va narx shu yerda.`; }
    if (wantOpen && /kabinet|profil/.test(s)) { go('#/kabinet'); return 'Kabinetingizni ochdim.'; }
    if (/sertifikatim|sertifikatlarim/.test(s)) { go(ME && ME.certs && ME.certs[0] ? '#/sertifikat/' + ME.certs[0].id : '#/sertifikat'); return ME && ME.certs && ME.certs.length ? 'Sertifikatingizni ochdim 🏅' : 'Hali sertifikatingiz yo‘q. Kursni tugatib, yakuniy imtihondan 70% dan yuqori to‘plang — sertifikat shu yerda paydo bo‘ladi.'; }
    if (wantOpen && /narx|tolov/.test(s)) { go('#/narxlar'); return 'Narxlar sahifasini ochdim.'; }
    return null;
  },
  async ask(q) {
    q = String(q || '').trim(); if (!q) return; this.add(q, 'me');
    const loc = this.local(q); if (loc) { this.bot(loc); this.hist.push({ role: 'user', content: q }, { role: 'assistant', content: loc }); return; }
    const ty = this.add('', 'bot'); ty.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    try {
      const r = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q, history: this.hist.slice(-10), context: this.ctx }) });
      const d = await r.json(); ty.remove();
      if (!r.ok) throw new Error(d.error);
      $('#aiMode').textContent = d.mode === 'ai' ? 'AI rejimi · kurs bazasi bilan' : 'Kurs bazasidan javob beradi';
      this.bot(d.answer, d.actions); this.hist.push({ role: 'user', content: q }, { role: 'assistant', content: d.answer });
    } catch (e) { ty.remove(); this.bot('Hozir javob bera olmadim — internetni tekshirib, qayta urinib ko‘ring.'); }
    this.sugg();
  }
};
$('#aiFab').addEventListener('click', () => AI.open());
$('#aiClose').addEventListener('click', () => AI.close());
$('#aiForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#aiIn').value; $('#aiIn').value = ''; AI.ask(v); });
const vb = $('#aiVoice'); vb.classList.toggle('on', AI.speak);
vb.addEventListener('click', () => { AI.speak = !AI.speak; vb.classList.toggle('on', AI.speak); LS.set('aiVoice', AI.speak); toast(AI.speak ? 'Javoblar ovozda o‘qiladi' : 'Ovoz o‘chirildi'); if (!AI.speak) window.speechSynthesis && speechSynthesis.cancel(); });
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
$('#aiMic').addEventListener('click', () => {
  if (!SR) { toast('Brauzeringiz ovozli kiritishni qo‘llamaydi (Chrome’da ishlaydi)'); return; }
  if (AI.rec) { AI.rec.stop(); return; }
  const r = new SR(); r.lang = 'uz-UZ'; r.interimResults = true; r.maxAlternatives = 1; AI.rec = r; $('#aiMic').classList.add('rec');
  r.onresult = e => { const t = [...e.results].map(x => x[0].transcript).join(' '); $('#aiIn').value = t; if (e.results[e.results.length - 1].isFinal) { r.stop(); AI.ask(t); $('#aiIn').value = ''; } };
  r.onerror = e => { toast(e.error === 'not-allowed' ? 'Mikrofonga ruxsat bering' : 'Ovozni tushunmadim, qayta urinib ko‘ring'); };
  r.onend = () => { AI.rec = null; $('#aiMic').classList.remove('rec'); };
  r.start(); if (!AI.speak) { AI.speak = true; vb.classList.add('on'); }
});

/* ---------- start ---------- */
(async () => {
  app.innerHTML = '<div class="loading"><div class="spin"></div>Akademiya yuklanmoqda…</div>';
  await Promise.all([loadCatalog(), loadMe()]);
  if (!CAT.length) { app.innerHTML = '<div class="center"><div class="empty">Kurslarni yuklab bo‘lmadi. Internetni tekshirib, sahifani yangilang.</div></div>'; return; }
  route();
  const q = new URLSearchParams(location.search).get('ai'); if (q) AI.open(q);
})();
})();
