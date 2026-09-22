/* =========================================================
   plus.js — Orbita Akademiya (bepul mini-kurslar), kurs pleyeri,
   launch intro. app.js dan keyin yuklanadi.
   Yangi dars qo'shish: pastdagi TRACKS ichidagi `lessons` ga obyekt qo'shing.
   ========================================================= */
(function(){
const NV=window.NV;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const L=()=>document.documentElement.lang==='en'?'en':'uz';
const tx=o=>o==null?'':typeof o==='string'?o:(o[L()]??o.uz);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const UI=()=>NV.ui||{};
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- matnlar ---------- */
const D={
 uz:{'nav.academy':'Akademiya','dock.academy':'Kurslar',
  'ac.k':'Orbita Akademiya · bepul mini-darslar','ac.title':'Men <em>o’rgataman</em>',
  'ac.lead':'O’zim o’rgangan va har kuni ishlatadigan narsalarni sodda qilib ulashaman. Har bir yo’nalish — 3 ta qisqa dars: tushuntirish, kod, natija va test. Progress brauzeringizda saqlanadi.',
  'ac.m1':'yo’nalish','ac.m2':'dars','ac.m3':'amaliy test',
  'ac.lessons':'{n} dars','ac.min':'~{m} daqiqa','ac.start':'Boshlash','ac.cont':'Davom ettirish','ac.again':'Qayta ko’rish','ac.done':'Tugatildi',
  'ac.ctaT':'Shaxsiy mentorlik yoki guruh darsi kerakmi?','ac.ctaP':'Yozing — darajangizga qarab yo’l xaritasi tuzib beraman. Xabar to’g’ridan-to’g’ri Telegram’imga keladi.','ac.ctaB':'Darsga yozilish',
  'cp.lesson':'Dars {n}','cp.copy':'Nusxa','cp.copied':'Kod nusxalandi','cp.out':'Natija','cp.quiz':'Tekshiruv savoli','cp.ok':'To’g’ri! Dars yakunlandi.','cp.bad':'Unchalik emas — yana bir urinib ko’ring.','cp.next':'Keyingi dars','cp.prev':'Oldingi','cp.finish':'Yakunlash','cp.close':'Yopish','cp.try':'Sinab ko’ring',
  'cp.finT':'Yo’nalish tugadi!','cp.finP':'{t} bo’yicha barcha darslar va testlar bajarildi. Keyingi qadam — o’z loyihangizda qo’llash. Yordam kerak bo’lsa, yozing.','cp.finB':'Mentorlikka yozilish','cp.finR':'Boshqa yo’nalish',
  'cp.msg':'Salom! «{t}» yo’nalishi bo’yicha dars/mentorlik haqida gaplashmoqchi edim.','toast.lesson':'Dars yakunlandi','proj.open':'Ochish','proj.try':'Jonli demo','proj.soon':'Tez orada',
  'in.brand':'Navro’z Orbitasi','in.label':'Uchishga tayyorgarlik','in.go':'Start','in.skip':'O’tkazib yuborish'},
 en:{'nav.academy':'Academy','dock.academy':'Courses',
  'ac.k':'Orbit Academy · free mini-lessons','ac.title':'I <em>teach</em>',
  'ac.lead':'I share what I learned and use every day — made simple. Each track is 3 short lessons: explanation, code, result and a quiz. Your progress is saved in your browser.',
  'ac.m1':'tracks','ac.m2':'lessons','ac.m3':'hands-on quizzes',
  'ac.lessons':'{n} lessons','ac.min':'~{m} min','ac.start':'Start','ac.cont':'Continue','ac.again':'Review','ac.done':'Completed',
  'ac.ctaT':'Need 1-on-1 mentoring or a group class?','ac.ctaP':'Write to me — I’ll build a roadmap for your level. The message goes straight to my Telegram.','ac.ctaB':'Join a class',
  'cp.lesson':'Lesson {n}','cp.copy':'Copy','cp.copied':'Code copied','cp.out':'Output','cp.quiz':'Check question','cp.ok':'Correct! Lesson complete.','cp.bad':'Not quite — give it another try.','cp.next':'Next lesson','cp.prev':'Previous','cp.finish':'Finish','cp.close':'Close','cp.try':'Try it',
  'cp.finT':'Track complete!','cp.finP':'You finished every lesson and quiz in {t}. Next step: use it in your own project. Need help? Write to me.','cp.finB':'Request mentoring','cp.finR':'Another track',
  'cp.msg':'Hi! I’d like to talk about lessons/mentoring for the “{t}” track.','toast.lesson':'Lesson complete','proj.open':'Open','proj.try':'Live demo','proj.soon':'Coming soon',
  'in.brand':'Navro’z Orbit','in.label':'Preparing for launch','in.go':'Liftoff','in.skip':'Skip'}
};
Object.assign(NV.DICT.uz,D.uz);Object.assign(NV.DICT.en,D.en);
const t=(k,v)=>{let s=(NV.DICT[L()]||{})[k]??NV.DICT.uz[k]??k;if(v)for(const x in v)s=s.replace('{'+x+'}',v[x]);return s};

/* ---------- ikonlar ---------- */
const P='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const IC={
 py:P+'<path d="M12 3c-4 0-4 1.5-4 3v2h4.5v1H6c-2 0-3 1.5-3 4s1 4 3 4h2v-2.5c0-1.5 1-2.5 2.5-2.5h4c1.5 0 2.5-1 2.5-2.5V6c0-1.5-1-3-5.5-3z"/><path d="M12 21c4 0 4-1.5 4-3v-2h-4.5v-1H18c2 0 3-1.5 3-4"/></svg>',
 code:P+'<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/></svg>',
 brain:P+'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/></svg>',
 chart:P+'<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-7"/></svg>',
 send:P+'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>',
 next:P+'<path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 prev:P+'<path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
 close:P+'<path d="M18 6 6 18M6 6l12 12"/></svg>',
 copy:P+'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
 bulb:P+'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></svg>',
 star:P+'<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
 mail:P+'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
 cap:P+'<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>'
};

/* ---------- KURSLAR ---------- */
const TRACKS=[
 {id:'python',ic:'py',c:'#FFD66B',min:20,lv:{uz:'Boshlang’ich',en:'Beginner'},
  name:{uz:'Python: noldan birinchi dasturgacha',en:'Python: from zero to your first program'},
  sub:{uz:'O’zgaruvchi, shart va sikl — har qanday dasturning uchta asosi.',en:'Variables, conditions and loops — the three foundations of any program.'},
  lessons:[
   {h:{uz:'O’zgaruvchi va print()',en:'Variables and print()'},
    p:{uz:['<b>O’zgaruvchi</b> — qiymatni saqlab turadigan nomlangan quti. <b>print()</b> esa natijani ekranga chiqaradi.','Matn qo’shtirnoq ichida yoziladi, son esa qo’shtirnoqsiz.'],en:['A <b>variable</b> is a named box that stores a value. <b>print()</b> shows a result on the screen.','Text goes inside quotes; numbers don’t.']},
    tip:{uz:'O’zgaruvchi nomini ma’noli qo’ying: x emas, narx yoki ism.',en:'Give variables meaningful names: not x, but price or name.'},
    lang:'python',code:'ism = "Aziza"\nyil = 2026\nprint("Salom,", ism)\nprint("Hozir", yil, "-yil")',
    out:'Salom, Aziza\nHozir 2026 -yil',
    q:{uz:'print() nima qiladi?',en:'What does print() do?'},o:[{uz:'Natijani ekranga chiqaradi',en:'Shows a result on the screen'},{uz:'Faylni o’chiradi',en:'Deletes a file'},{uz:'Kompyuterni o’chiradi',en:'Shuts down the computer'}],a:0},
   {h:{uz:'Shartlar: if / elif / else',en:'Conditions: if / elif / else'},
    p:{uz:['Dastur vaziyatga qarab qaror qabul qilishi uchun <b>if</b> ishlatiladi. Birinchi to’g’ri shart bajariladi, qolganlari tekshirilmaydi.','Python’da blok <b>chekinish (4 ta bo’sh joy)</b> bilan belgilanadi.'],en:['Use <b>if</b> so the program can make decisions. The first true condition runs; the rest are skipped.','In Python a block is marked by <b>indentation (4 spaces)</b>.']},
    tip:{uz:'Katta shartni birinchi yozing: avval >= 86, keyin >= 71.',en:'Put the strictest condition first: >= 86 before >= 71.'},
    lang:'python',code:'ball = 78\nif ball >= 86:\n    print("A\'lo")\nelif ball >= 71:\n    print("Yaxshi")\nelse:\n    print("Yana harakat qiling")',
    out:'Yaxshi',
    q:{uz:'ball = 90 bo’lsa, dastur nima chiqaradi?',en:'If ball = 90, what does the program print?'},o:[{uz:'Yaxshi',en:'Yaxshi'},{uz:'A\'lo',en:'A\'lo'},{uz:'Yana harakat qiling',en:'Yana harakat qiling'}],a:1},
   {h:{uz:'Ro’yxat va for sikli',en:'Lists and the for loop'},
    p:{uz:['<b>Ro’yxat</b> bir nechta qiymatni tartib bilan saqlaydi. <b>for</b> sikli ro’yxatdagi har bir element ustida bir xil ishni bajaradi.','Bu — savdo, baho yoki har qanday ma’lumotni hisoblashning eng oddiy yo’li.'],en:['A <b>list</b> stores several values in order. A <b>for</b> loop does the same work for every item.','It’s the simplest way to total sales, grades or any data.']},
    tip:{uz:'jami += n — bu jami = jami + n ning qisqa yozilishi.',en:'total += n is short for total = total + n.'},
    lang:'python',code:'narxlar = [12000, 8500, 15000]\njami = 0\nfor n in narxlar:\n    jami += n\nprint("Jami:", jami)\nprint("Soni:", len(narxlar))',
    out:'Jami: 35500\nSoni: 3',
    q:{uz:'len(narxlar) nechaga teng?',en:'What is len(narxlar)?'},o:[{uz:'35500',en:'35500'},{uz:'3',en:'3'},{uz:'2',en:'2'}],a:1}
  ]},
 {id:'web',ic:'code',c:'#6CE4F0',min:25,lv:{uz:'Boshlang’ich',en:'Beginner'},
  name:{uz:'Web: HTML, CSS va JavaScript',en:'Web: HTML, CSS and JavaScript'},
  sub:{uz:'Tuzilma, dizayn va harakat — shu sayt ham aynan shu uchlikda qurilgan.',en:'Structure, style and behaviour — this very site is built with these three.'},
  lessons:[
   {h:{uz:'HTML: sahifa skeleti',en:'HTML: the page skeleton'},
    p:{uz:['HTML sahifaning <b>tuzilmasini</b> beradi. <b>&lt;head&gt;</b> ichida sozlamalar, <b>&lt;body&gt;</b> ichida esa foydalanuvchi ko’radigan hamma narsa turadi.'],en:['HTML gives a page its <b>structure</b>. Settings live in <b>&lt;head&gt;</b>; everything the user sees lives in <b>&lt;body&gt;</b>.']},
    tip:{uz:'VS Code’da ! yozib Enter bossangiz, bu skelet o’zi paydo bo’ladi.',en:'In VS Code, type ! and press Enter to get this skeleton instantly.'},
    lang:'html',code:'<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <title>Mening sahifam</title>\n</head>\n<body>\n  <h1>Salom, dunyo!</h1>\n  <button id="btn">Bos</button>\n</body>\n</html>',
    out:{uz:'Brauzerda katta “Salom, dunyo!” sarlavhasi va “Bos” tugmasi ko’rinadi.',en:'The browser shows a big “Salom, dunyo!” heading and a “Bos” button.'},
    q:{uz:'Foydalanuvchi ko’radigan qism qaysi tegda?',en:'Which tag holds what the user sees?'},o:[{uz:'<head>',en:'<head>'},{uz:'<body>',en:'<body>'},{uz:'<title>',en:'<title>'}],a:1},
   {h:{uz:'CSS: Flexbox bilan joylash',en:'CSS: layout with Flexbox'},
    p:{uz:['<b>display:flex</b> elementlarni bir qatorga teradi. <b>gap</b> — oradagi masofa, <b>justify-content</b> — gorizontal, <b>align-items</b> — vertikal tekislash.'],en:['<b>display:flex</b> puts items in a row. <b>gap</b> sets the space between, <b>justify-content</b> aligns horizontally, <b>align-items</b> vertically.']},
    tip:{uz:'Telefon uchun flex-wrap: wrap qo’shing — joy yetmasa, elementlar pastga tushadi.',en:'Add flex-wrap: wrap for phones — items drop to the next line when space runs out.'},
    lang:'css',code:'.qator {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n}',
    out:{uz:'Kartalar markazda, bir-biridan 16px masofada, tor ekranda esa pastga tushib joylashadi.',en:'Cards sit centred, 16px apart, and wrap down on narrow screens.'},
    q:{uz:'Elementlar orasidagi masofani qaysi xususiyat beradi?',en:'Which property sets the space between items?'},o:[{uz:'gap',en:'gap'},{uz:'color',en:'color'},{uz:'font-size',en:'font-size'}],a:0},
   {h:{uz:'JavaScript: tugma bosilganda',en:'JavaScript: when a button is clicked'},
    p:{uz:['JavaScript sahifaga <b>harakat</b> beradi. <b>addEventListener</b> — “shu hodisa bo’lsa, mana buni bajar” degani.','Pastdagi tugmani bosib ko’ring — kod aynan shunday ishlaydi.'],en:['JavaScript gives a page <b>behaviour</b>. <b>addEventListener</b> means “when this happens, do that”.','Click the button below — the code works exactly like this.']},
    tip:{uz:'const — o’zgarmaydigan, let — o’zgaradigan qiymat uchun.',en:'const is for values that don’t change, let for ones that do.'},
    lang:'js',code:'const btn = document.querySelector("#btn");\nlet son = 0;\n\nbtn.addEventListener("click", () => {\n  son++;\n  btn.textContent = "Bosildi: " + son;\n});',
    demo:true,
    q:{uz:'Bu kod qachon ishlaydi?',en:'When does this code run?'},o:[{uz:'Sahifa yopilganda',en:'When the page closes'},{uz:'Tugma bosilganda',en:'When the button is clicked'},{uz:'Har soniyada',en:'Every second'}],a:1}
  ]},
 {id:'ai',ic:'brain',c:'#B79CFF',min:20,lv:{uz:'O’rta',en:'Intermediate'},
  name:{uz:'AI va prompt muhandisligi',en:'AI and prompt engineering'},
  sub:{uz:'AI’dan aniq, foydali javob olish va uni xavfsiz ulash.',en:'Getting clear, useful answers from AI — and connecting it safely.'},
  lessons:[
   {h:{uz:'Yaxshi prompt: Rol + Vazifa + Format',en:'A good prompt: Role + Task + Format'},
    p:{uz:['AI siz bergan kontekst darajasida yaxshi javob beradi. Uch qism deyarli har doim ishlaydi: <b>kim</b> bo’lib javob bersin, <b>nima</b> qilsin va <b>qanday ko’rinishda</b> qaytarsin.'],en:['AI answers only as well as the context you give. Three parts almost always work: <b>who</b> it should act as, <b>what</b> to do, and <b>what shape</b> the answer takes.']},
    tip:{uz:'Format aniq bo’lsa, javobni to’g’ridan-to’g’ri saytga yoki jadvalga qo’yish oson.',en:'A precise format makes the answer easy to drop straight into a site or table.'},
    lang:'text',code:{uz:'Rol: Sen tajribali ingliz tili o\'qituvchisisan.\nVazifa: Matndagi grammatik xatolarni top.\nFormat: Jadval — xato | to\'g\'ri | qisqa izoh (o\'zbekcha).\nMatn: "She go to school every days."',en:'Role: You are an experienced English teacher.\nTask: Find the grammar mistakes in the text.\nFormat: Table — mistake | correct | short note.\nText: "She go to school every days."'},
    out:{uz:'go → goes | 3-shaxs birlikda -s qo\'shiladi\ndays → day | every dan keyin birlik keladi',en:'go → goes | third person singular takes -s\ndays → day | every is followed by a singular noun'},
    q:{uz:'Promptning qaysi qismi javob ko’rinishini belgilaydi?',en:'Which part of the prompt sets the answer’s shape?'},o:[{uz:'Rol',en:'Role'},{uz:'Format',en:'Format'},{uz:'Matn',en:'Text'}],a:1},
   {h:{uz:'Namuna bilan o’rgatish (few-shot)',en:'Teaching by example (few-shot)'},
    p:{uz:['Modelga bir-ikkita <b>namuna</b> ko’rsatsangiz, u uslubni ilib oladi va keyingisini xuddi shunday davom ettiradi.'],en:['Show the model one or two <b>examples</b> and it picks up the pattern, continuing the next one the same way.']},
    tip:{uz:'Namunalar qisqa va bir xil tuzilishda bo’lsin.',en:'Keep examples short and identically structured.'},
    lang:'text',code:{uz:'Quyidagi uslubda javob ber:\n2 + 3 → 5 (qo\'shish)\n7 - 4 → 3 (ayirish)\n6 × 2 →',en:'Answer in this style:\n2 + 3 → 5 (addition)\n7 - 4 → 3 (subtraction)\n6 × 2 →'},
    out:{uz:'12 (ko\'paytirish)',en:'12 (multiplication)'},
    q:{uz:'Few-shot nima?',en:'What is few-shot prompting?'},o:[{uz:'Modelga namunalar berish',en:'Giving the model examples'},{uz:'Modelni o’chirib yoqish',en:'Restarting the model'},{uz:'Juda qisqa savol berish',en:'Asking a very short question'}],a:0},
   {h:{uz:'API kalitni xavfsiz saqlash',en:'Keeping an API key safe'},
    p:{uz:['AI’ni saytga ulashda eng ko’p uchraydigan xato — kalitni brauzer kodiga yozish. Brauzer kodi <b>hammaga ochiq</b>, kalit esa pul va ma’lumotingizga kirish huquqi.','To’g’ri yo’l: kalit <b>serverda</b> turadi, brauzer faqat serverga so’rov yuboradi.'],en:['The most common mistake when adding AI to a site is putting the key in browser code. Browser code is <b>public</b>; the key is access to your money and data.','The right way: the key stays on the <b>server</b>; the browser only sends a request to it.']},
    tip:{uz:'Vercel’da: Settings → Environment Variables. Shu saytning Telegram formasi ham aynan shunday ishlaydi.',en:'On Vercel: Settings → Environment Variables. This site’s Telegram form works exactly this way.'},
    lang:'js',code:{uz:'// XATO: kalit brauzer kodida — hamma ko\'ra oladi\nconst KEY = "sk-...";\n\n// TO\'G\'RI: brauzer faqat o\'z serveringizga yozadi\nconst res = await fetch("/api/chat", {\n  method: "POST",\n  body: JSON.stringify({ savol: "Salom" })\n});',en:'// WRONG: key in browser code — anyone can see it\nconst KEY = "sk-...";\n\n// RIGHT: the browser only talks to your own server\nconst res = await fetch("/api/chat", {\n  method: "POST",\n  body: JSON.stringify({ question: "Hello" })\n});'},
    q:{uz:'API kalit qayerda turishi kerak?',en:'Where should an API key live?'},o:[{uz:'app.js faylida',en:'In app.js'},{uz:'HTML ichida',en:'Inside the HTML'},{uz:'Serverdagi maxfiy o’zgaruvchida',en:'In a secret server variable'}],a:2}
  ]},
 {id:'data',ic:'chart',c:'#6CA8FF',min:25,lv:{uz:'O’rta',en:'Intermediate'},
  name:{uz:'Ma’lumot tahlili: Pandas',en:'Data analysis with Pandas'},
  sub:{uz:'CSV fayldan biznes xulosasigacha — Sales Insight Lab usuli.',en:'From a CSV file to a business conclusion — the Sales Insight Lab way.'},
  lessons:[
   {h:{uz:'CSV faylni o’qish',en:'Reading a CSV file'},
    p:{uz:['<b>Pandas</b> jadval ko’rinishidagi ma’lumot bilan ishlash uchun eng mashhur Python kutubxonasi. Jadval <b>DataFrame</b> (df) deb ataladi.'],en:['<b>Pandas</b> is the most popular Python library for table-shaped data. A table is called a <b>DataFrame</b> (df).']},
    tip:{uz:'O’rnatish: pip install pandas',en:'Install: pip install pandas'},
    lang:'python',code:{uz:'import pandas as pd\n\ndf = pd.read_csv("savdo.csv")\nprint(df.head(3))   # birinchi 3 qator\nprint(df.shape)     # (qatorlar, ustunlar)',en:'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\nprint(df.head(3))   # first 3 rows\nprint(df.shape)     # (rows, columns)'},
    out:{uz:'         sana mahsulot  soni   narx\n0  2026-09-01     choy     3  12000\n1  2026-09-01     non      5   4000\n2  2026-09-02    shakar    2  15000\n(120, 4)',en:'         date  product  qty  price\n0  2026-09-01      tea    3  12000\n1  2026-09-01    bread    5   4000\n2  2026-09-02    sugar    2  15000\n(120, 4)'},
    q:{uz:'df.shape nimani ko’rsatadi?',en:'What does df.shape show?'},o:[{uz:'Qator va ustunlar sonini',en:'The number of rows and columns'},{uz:'Faylning rangini',en:'The file’s colour'},{uz:'Birinchi qatorni',en:'The first row'}],a:0},
   {h:{uz:'Tozalash va KPI hisoblash',en:'Cleaning and calculating KPIs'},
    p:{uz:['Haqiqiy ma’lumotda bo’sh kataklar bo’ladi — avval ularni olib tashlaymiz. Keyin yangi ustun yaratib, <b>groupby</b> bilan mahsulotlar bo’yicha jamlaymiz.'],en:['Real data has empty cells — remove them first. Then create a new column and total by product with <b>groupby</b>.']},
    tip:{uz:'KPI — natijani o’lchaydigan asosiy ko’rsatkich: tushum, o’rtacha chek, top mahsulot.',en:'A KPI is a key number that measures results: revenue, average order, top product.'},
    lang:'python',code:{uz:'df = df.dropna()   # bo\'sh qatorlarni olib tashlash\ndf["tushum"] = df["soni"] * df["narx"]\n\nprint("Jami tushum:", df["tushum"].sum())\ntop = df.groupby("mahsulot")["tushum"].sum()\nprint(top.sort_values(ascending=False).head(3))',en:'df = df.dropna()   # drop empty rows\ndf["revenue"] = df["qty"] * df["price"]\n\nprint("Total revenue:", df["revenue"].sum())\ntop = df.groupby("product")["revenue"].sum()\nprint(top.sort_values(ascending=False).head(3))'},
    q:{uz:'groupby("mahsulot") nima qiladi?',en:'What does groupby("product") do?'},o:[{uz:'Faylni saqlaydi',en:'Saves the file'},{uz:'Qatorlarni mahsulot bo’yicha guruhlaydi',en:'Groups rows by product'},{uz:'Bo’sh qatorlarni o’chiradi',en:'Deletes empty rows'}],a:1},
   {h:{uz:'Grafik bilan xulosa',en:'A conclusion with a chart'},
    p:{uz:['Raqamlar jadvali rahbarga kam narsa aytadi, grafik esa bir qarashda. <b>matplotlib</b> bilan bitta qatorda ustunli grafik chizamiz va rasm qilib saqlaymiz.'],en:['A table of numbers tells a manager little; a chart tells it at a glance. With <b>matplotlib</b> we draw a bar chart in one line and save it as an image.']},
    tip:{uz:'Grafik sarlavhasi savol emas, xulosa bo’lsin: “Choy — eng ko’p tushum”.',en:'Make the chart title a conclusion, not a question: “Tea brings the most revenue”.'},
    lang:'python',code:{uz:'import matplotlib.pyplot as plt\n\ntop.head(5).plot(kind="bar", title="Top-5 mahsulot")\nplt.tight_layout()\nplt.savefig("top5.png")',en:'import matplotlib.pyplot as plt\n\ntop.head(5).plot(kind="bar", title="Top 5 products")\nplt.tight_layout()\nplt.savefig("top5.png")'},
    out:{uz:'top5.png — 5 ta mahsulot tushumi ustunli grafikda',en:'top5.png — revenue of 5 products as a bar chart'},
    q:{uz:'kind="bar" qanday grafik chizadi?',en:'What chart does kind="bar" draw?'},o:[{uz:'Doiraviy',en:'Pie'},{uz:'Chiziqli',en:'Line'},{uz:'Ustunli',en:'Bar'}],a:2}
  ]},
 {id:'bot',ic:'send',c:'#5CF2B5',min:25,lv:{uz:'Boshlang’ich',en:'Beginner'},
  name:{uz:'Telegram bot yaratish',en:'Building a Telegram bot'},
  sub:{uz:'O’zbekistonda foydalanuvchi Telegram’da — mahsulot ham u yerga boradi.',en:'In Uzbekistan users live in Telegram — so products go there too.'},
  lessons:[
   {h:{uz:'BotFather’da bot ochish',en:'Creating a bot with BotFather'},
    p:{uz:['Har bir bot <b>@BotFather</b> orqali yaratiladi. U sizga <b>token</b> beradi — botni boshqarish kaliti.'],en:['Every bot is created through <b>@BotFather</b>. It gives you a <b>token</b> — the key that controls your bot.']},
    tip:{uz:'Token — parol bilan teng. Kodga yozmang, .env fayl yoki server sozlamasida saqlang.',en:'A token equals a password. Don’t put it in code — keep it in a .env file or server settings.'},
    lang:'text',code:{uz:'/newbot\nBot nomi: Mening yordamchim\nUsername: mening_yordamchim_bot\n→ Token: 123456789:AA...   (maxfiy!)',en:'/newbot\nBot name: My helper\nUsername: my_helper_demo_bot\n→ Token: 123456789:AA...   (secret!)'},
    q:{uz:'Bot tokeni kimga beriladi?',en:'Who should get the bot token?'},o:[{uz:'Hech kimga — faqat serverga',en:'Nobody — only your server'},{uz:'Guruhdagi hammaga',en:'Everyone in the group'},{uz:'Saytning HTML kodiga',en:'The site’s HTML code'}],a:0},
   {h:{uz:'Birinchi bot: aiogram 3',en:'Your first bot: aiogram 3'},
    p:{uz:['<b>aiogram</b> — Python’da Telegram bot yozish uchun qulay kutubxona. Bot /start buyrug’iga foydalanuvchining ismi bilan javob beradi.'],en:['<b>aiogram</b> is a handy Python library for Telegram bots. This bot answers /start with the user’s first name.']},
    tip:{uz:'O’rnatish: pip install aiogram',en:'Install: pip install aiogram'},
    lang:'python',code:'import asyncio\nfrom aiogram import Bot, Dispatcher\nfrom aiogram.filters import CommandStart\nfrom aiogram.types import Message\n\nbot = Bot(token="TOKEN")\ndp = Dispatcher()\n\n@dp.message(CommandStart())\nasync def start(msg: Message):\n    await msg.answer(f"Salom, {msg.from_user.first_name}!")\n\nasync def main():\n    await dp.start_polling(bot)\n\nasyncio.run(main())',
    out:'/start  →  Salom, Aziza!',
    q:{uz:'start_polling nima qiladi?',en:'What does start_polling do?'},o:[{uz:'Botni o’chiradi',en:'Turns the bot off'},{uz:'Telegram’dan yangi xabarlarni doimiy so’rab turadi',en:'Keeps asking Telegram for new messages'},{uz:'Token yaratadi',en:'Creates a token'}],a:1},
   {h:{uz:'Tugmalar: inline keyboard',en:'Buttons: inline keyboard'},
    p:{uz:['Tugmalar botni qulay qiladi: foydalanuvchi yozmaydi, bosadi. <b>callback_data</b> — bot ichida ishlaydigan tugma, <b>url</b> — havola ochadigan tugma.'],en:['Buttons make a bot easy: users tap instead of typing. <b>callback_data</b> buttons act inside the bot; <b>url</b> buttons open a link.']},
    tip:{uz:'Har bir qatordagi tugmalar bitta ro’yxat ichida yoziladi.',en:'Buttons in the same row go in the same inner list.'},
    lang:'python',code:'from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton\n\nkb = InlineKeyboardMarkup(inline_keyboard=[\n    [InlineKeyboardButton(text="Kurslar", callback_data="kurs")],\n    [InlineKeyboardButton(text="Sayt", url="https://navruz-orbit.vercel.app")]\n])\nawait msg.answer("Tanlang:", reply_markup=kb)',
    q:{uz:'url bilan yaratilgan tugma bosilsa nima bo’ladi?',en:'What happens when a url button is tapped?'},o:[{uz:'Havola ochiladi',en:'A link opens'},{uz:'Bot o’chadi',en:'The bot stops'},{uz:'Xabar o’chiriladi',en:'The message is deleted'}],a:0}
  ]}
];
const LESSONS=TRACKS.reduce((n,tr)=>n+tr.lessons.length,0);

/* ---------- progress ---------- */
let prog=store.get('nv-ac')||{};
const done=(tr)=>(prog[tr.id]||[]);
const doneCount=tr=>tr.lessons.filter((_,i)=>done(tr)[i]).length;
function mark(tr,i){prog[tr.id]=prog[tr.id]||[];prog[tr.id][i]=true;store.set('nv-ac',prog)}

/* ---------- oddiy sintaksis rangi ---------- */
function hl(code,lang){
  const KW={python:/\b(import|from|as|def|async|await|return|if|elif|else|for|in|while|print|len|True|False|None|and|or|not)\b/g,
            js:/\b(const|let|var|function|return|await|async|if|else|new|document)\b/g,
            css:/^(\s*)([a-z-]+)(?=\s*:)/gm,html:/(&lt;\/?)([a-zA-Z!][\w-]*)/g,text:null};
  return code.split('\n').map(line=>{
    let cm='';const ci=lang==='python'?line.indexOf('#'):(lang==='js'?line.indexOf('//'):-1);
    let body=line;
    if(ci>-1&&!/["'][^"']*$/.test(line.slice(0,ci))){cm=line.slice(ci);body=line.slice(0,ci)}
    let h=esc(body);
    const parts=h.split(/(&quot;[^&]*?&quot;|"[^"]*"|'[^']*')/g);
    h=parts.map((s,k)=>{if(k%2)return '<span class="s">'+s+'</span>';
      if(lang==='css')return s.replace(KW.css,'$1<span class="f">$2</span>');
      if(lang==='html')return s.replace(KW.html,'$1<span class="k">$2</span>');
      if(KW[lang])s=s.replace(KW[lang],'<span class="k">$1</span>');
      return s.replace(/\b(\d+)\b/g,'<span class="nm">$1</span>')}).join('');
    return h+(cm?'<span class="c">'+esc(cm)+'</span>':'');
  }).join('\n');
}

/* ---------- AKADEMIYA BO'LIMI ---------- */
function mountAcademy(){
  if($('#akademiya'))return;
  const sec=document.createElement('section');sec.id='akademiya';sec.className='sec inner';
  sec.innerHTML=`<div class="ac-head rv"><div><span class="eyebrow" data-i18n="ac.k"></span><h2 class="h2" data-i18n-html="ac.title"></h2><p class="lead" data-i18n="ac.lead"></p></div>
  <div class="ac-meter"><div><strong>${TRACKS.length}</strong><span data-i18n="ac.m1"></span></div><div><strong>${LESSONS}</strong><span data-i18n="ac.m2"></span></div><div><strong>${LESSONS}</strong><span data-i18n="ac.m3"></span></div></div></div>
  <div class="tracks" id="tracks"></div>
  <div class="ac-cta rv"><div><h4 data-i18n="ac.ctaT"></h4><p data-i18n="ac.ctaP"></p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn pri" href="/akademiya/">${L()==='uz'?'Orbita Akademiya — 12 kurs':'Orbita Academy — 12 courses'}${IC.send}</a><button class="btn ghost" type="button" id="acJoin"><span data-i18n="ac.ctaB"></span></button></div></div>`;
  const after=$('#loyihalar');after.parentNode.insertBefore(sec,after.nextSibling);
  $('#acJoin').addEventListener('click',()=>toContact(t('cp.msg',{t:L()==='uz'?'Akademiya':'Academy'})));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
  $$('#akademiya .rv').forEach(el=>io.observe(el));
  // nav highlight
  new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('#links a').forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#akademiya'))}}),{rootMargin:'-45% 0px -50% 0px'}).observe(sec);
}
function ring(pct){const r=22,c=2*Math.PI*r;return `<svg class="t-ring" viewBox="0 0 54 54"><circle class="bg" cx="27" cy="27" r="${r}"/><circle class="fg" cx="27" cy="27" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct)}"/><text x="27" y="31" text-anchor="middle">${Math.round(pct*100)}%</text></svg>`}
function renderTracks(){
  const box=$('#tracks');if(!box)return;
  box.innerHTML=TRACKS.map(tr=>{const d=doneCount(tr),n=tr.lessons.length,pct=d/n;
    const lab=d===0?t('ac.start'):d===n?t('ac.again'):t('ac.cont');
    return `<button type="button" class="trk dyn" data-tr="${tr.id}" style="--tc:${tr.c}"><div class="t-top"><span class="t-ico"><i></i><b>${IC[tr.ic]}</b></span>${ring(pct)}</div>
    <h3>${esc(tx(tr.name))}</h3><p>${esc(tx(tr.sub))}</p>
    <div class="t-meta"><span class="lv">${esc(tx(tr.lv))}</span><span>${t('ac.lessons',{n})}</span><span>${t('ac.min',{m:tr.min})}</span></div>
    <div class="t-go"><b>${lab} ${IC.next}</b><small>${d===n?t('ac.done'):d+' / '+n}</small></div></button>`}).join('');
  $$('.trk').forEach(el=>{
    el.addEventListener('click',()=>openCourse(el.dataset.tr));
    if(FINE&&!RM){el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`});el.addEventListener('pointerleave',()=>el.style.transform='')}
  });
}

/* ---------- KURS PLEYERI ---------- */
let cur=null,li=0,lastFocus=null;
function openCourse(id){
  const tr=TRACKS.find(x=>x.id===id);if(!tr)return;cur=tr;lastFocus=document.activeElement;
  const n=tr.lessons.length;li=Math.min(doneCount(tr),n-1);if(doneCount(tr)===n)li=0;
  let el=$('#course');
  if(!el){el=document.createElement('div');el.id='course';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');document.body.appendChild(el);
    el.addEventListener('click',e=>{if(e.target.closest('[data-cclose]'))closeCourse()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#course')&&!$('#course').hidden)closeCourse()})}
  el.hidden=false;document.body.style.overflow='hidden';
  el.innerHTML=`<div class="cback" data-cclose></div><div class="cp" style="--tc:${tr.c}">
   <div class="cp-head"><span class="t-ico"><i></i><b>${IC[tr.ic]}</b></span><div class="cp-title"><small>${esc(tx(tr.lv))} · ${t('ac.lessons',{n})}</small><b>${esc(tx(tr.name))}</b></div><div class="cp-bar"><i id="cpBar"></i></div><button class="cp-x" type="button" data-cclose aria-label="${t('cp.close')}">${IC.close}</button></div>
   <nav class="cp-side" id="cpSide"></nav><div class="cp-main" id="cpMain"></div></div>`;
  renderSide();renderLesson();
  if(!RM&&NV.Space)NV.Space.warp(500);
  setTimeout(()=>el.querySelector('.cp-x').focus({preventScroll:true}),60);
}
function closeCourse(){const el=$('#course');if(!el)return;el.hidden=true;document.body.style.overflow='';renderTracks();lastFocus&&lastFocus.focus&&lastFocus.focus({preventScroll:true})}
function renderSide(){
  const tr=cur;$('#cpSide').innerHTML=tr.lessons.map((l,i)=>`<button type="button" class="cp-les${i===li?' on':''}${done(tr)[i]?' done':''}" data-li="${i}"><span class="n">${done(tr)[i]?'✓':i+1}</span><span>${esc(tx(l.h))}<small>${t('cp.lesson',{n:i+1})}</small></span></button>`).join('');
  $$('#cpSide .cp-les').forEach(b=>b.addEventListener('click',()=>{li=+b.dataset.li;renderSide();renderLesson()}));
  $('#cpBar').style.width=(doneCount(tr)/tr.lessons.length*100)+'%';
}
function renderLesson(){
  const tr=cur,l=tr.lessons[li],n=tr.lessons.length,m=$('#cpMain');
  const code=tx(l.code),out=tx(l.out);
  m.innerHTML=`<div class="anim2"><div class="les-k">${t('cp.lesson',{n:li+1})} / ${n}</div><h3 class="les-h">${esc(tx(l.h))}</h3>
   ${tx(l.p).map(s=>`<p class="les-p">${s}</p>`).join('')}
   ${l.tip?`<div class="les-tip">${IC.bulb}<span>${esc(tx(l.tip))}</span></div>`:''}
   <div class="code"><div class="code-h"><span><i><b></b><b></b><b></b></i>${l.lang}</span><button type="button" class="code-copy" id="cpCopy">${IC.copy}${t('cp.copy')}</button></div><pre><code>${hl(code,l.lang)}</code></pre></div>
   ${l.demo?`<div class="out" data-l="${t('cp.try')}"><button type="button" class="btn ghost sm" id="demoBtn">${L()==='uz'?'Bos':'Click'}</button></div>`:''}
   ${out?`<div class="out" data-l="${t('cp.out')}">${esc(out)}</div>`:''}
   <div class="quiz"><span class="les-k">${t('cp.quiz')}</span><h5>${esc(tx(l.q))}</h5><div class="qopts">${l.o.map((o,k)=>`<button type="button" class="qopt" data-k="${k}"><span class="l">${'ABC'[k]}</span><span>${esc(tx(o))}</span></button>`).join('')}</div><div class="qfb" id="qfb" aria-live="polite"></div></div>
   <div class="les-nav">${li>0?`<button type="button" class="btn ghost sm" id="lPrev">${IC.prev}${t('cp.prev')}</button>`:'<span></span>'}<button type="button" class="btn pri sm" id="lNext" ${done(tr)[li]?'':'hidden'}>${li<n-1?t('cp.next'):t('cp.finish')}${IC.next}</button></div></div>`;
  m.scrollTop=0;
  $('#cpCopy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code)}catch(e){}toast(t('cp.copied'))});
  if(l.demo){let c=0;const b=$('#demoBtn');b.addEventListener('click',()=>{c++;b.textContent=(L()==='uz'?'Bosildi: ':'Clicked: ')+c})}
  if(done(tr)[li])markQuiz(l.a,true);
  $$('#cpMain .qopt').forEach(b=>b.addEventListener('click',()=>answer(+b.dataset.k,b)));
  $('#lPrev')&&$('#lPrev').addEventListener('click',()=>{li--;renderSide();renderLesson()});
  $('#lNext').addEventListener('click',()=>{if(li<n-1){li++;renderSide();renderLesson()}else finish()});
}
function markQuiz(a,silent){$$('#cpMain .qopt').forEach((b,k)=>{b.disabled=true;if(k===a)b.classList.add('ok')});const f=$('#qfb');f.className='qfb ok';f.textContent=t('cp.ok');$('#lNext').hidden=false}
function answer(k,b){
  const l=cur.lessons[li];
  if(k===l.a){
    const first=!done(cur)[li];mark(cur,li);markQuiz(l.a);renderSide();
    const r=b.getBoundingClientRect();UI().burst&&UI().burst(r.left+r.width/2,r.top+r.height/2,40,['#7CF0A6',cur.c,'#FFB547','#fff']);
    if(first)toast(t('toast.lesson'));
  }else{b.classList.remove('bad');void b.offsetWidth;b.classList.add('bad');const f=$('#qfb');f.className='qfb bad';f.textContent=t('cp.bad')}
}
function finish(){
  const tr=cur,m=$('#cpMain');
  m.innerHTML=`<div class="fin-card anim2"><div class="medal">${IC.star}</div><h3>${t('cp.finT')}</h3><p>${esc(t('cp.finP',{t:tx(tr.name)}))}</p><div class="cta" style="justify-content:center"><button type="button" class="btn pri" id="fMentor">${t('cp.finB')}${IC.mail}</button><button type="button" class="btn ghost" id="fOther">${t('cp.finR')}</button></div></div>`;
  const r=m.getBoundingClientRect();const B=UI().burst;if(B){B(r.left+r.width/2,r.top+140,80,[tr.c,'#FFB547','#7CF0A6','#fff']);setTimeout(()=>B(r.left+r.width*.3,r.top+200,40),250);setTimeout(()=>B(r.left+r.width*.7,r.top+200,40),450)}
  NV.Space&&NV.Space.warp(900);
  $('#fMentor').addEventListener('click',()=>{closeCourse();toContact(t('cp.msg',{t:tx(tr.name)}))});
  $('#fOther').addEventListener('click',()=>{closeCourse();$('#akademiya').scrollIntoView({behavior:RM?'auto':'smooth'})});
}
function toContact(msg){const a=$('#aloqa');a&&a.scrollIntoView({behavior:RM?'auto':'smooth'});setTimeout(()=>{const f=$('#fmsg');if(f){f.value=msg;f.dispatchEvent(new Event('input'));f.focus({preventScroll:true})}},RM?0:700)}
function toast(msg){if(UI().toast)return UI().toast(msg,'check');const el=document.createElement('div');el.className='toast';el.textContent=msg;$('#toasts').appendChild(el);setTimeout(()=>el.remove(),2600)}

/* ---------- LAUNCH INTRO ---------- */
function intro(){
  const el=$('#intro');if(!el)return;
  let seen=false;try{seen=!!sessionStorage.getItem('nvIntro');sessionStorage.setItem('nvIntro','1')}catch(e){}
  if(seen||RM){el.remove();return}
  const cnt=$('#inCount'),rg=el.querySelector('.in-ring');let dead=false;
  const end=()=>{if(dead)return;dead=true;el.classList.add('split');NV.Space&&NV.Space.warp(1200);setTimeout(()=>{el.classList.add('done');setTimeout(()=>el.remove(),600)},900)};
  $('#inSkip').addEventListener('click',end);
  const steps=['3','2','1',t('in.go')];let i=0;
  (function next(){if(dead)return;cnt.textContent=steps[i];cnt.classList.remove('tick');void cnt.offsetWidth;cnt.classList.add('tick');rg.classList.remove('pulse');void rg.offsetWidth;rg.classList.add('pulse');
    if(i===steps.length-1){el.classList.add('lift');setTimeout(end,650);return}i++;setTimeout(next,560)})();
}

/* ---------- til almashganda qayta chizish ---------- */
function textsFor(root){ // app.js applyStatic dagi kabi, faqat yangi elementlar uchun
  root.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  root.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.dataset.i18nHtml));
}
new MutationObserver(()=>{textsFor(document);renderTracks();if(cur&&$('#course')&&!$('#course').hidden){renderSide();renderLesson()}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

/* ---------- START ---------- */
intro();
mountAcademy();textsFor(document);renderTracks();
if(NV.Space&&NV.Space.measure)setTimeout(NV.Space.measure,100);
NV.Academy={TRACKS,openCourse};
})();
