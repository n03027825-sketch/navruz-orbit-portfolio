module.exports = {
lessons: [
{ v: [
  ['Sayt qanday ochiladi?', 'Brauzer serverdan HTML faylni so‘raydi, server uni yuboradi va brauzer uni sahifaga aylantiradi. Har bir sayt — aslida matnli fayllar.'],
  ['Uchta til', 'HTML — sahifaning suyagi, CSS — kiyimi va dizayni, JavaScript esa harakati. Bu kursda birinchi ikkitasini o‘rganamiz.'],
  ['HTML skeleti', 'Har bir sahifa doctype, html, head va body teglaridan iborat. Ko‘rinadigan hamma narsa body ichida bo‘ladi.', '<!DOCTYPE html>\n<html lang="uz">\n  <head><title>Mening saytim</title></head>\n  <body>Salom!</body>\n</html>'],
  ['Teg nima?', 'Teg — burchak qavsdagi so‘z. Ko‘pchilik teglar ochiladi va yopiladi: yopuvchi tegda slash bo‘ladi.', '<h1>Sarlavha</h1>']],
  x: 'HTML — *HyperText Markup Language*. U dasturlash tili emas, balki **belgilash** tili: matnning qaysi qismi sarlavha, qaysi biri paragraf ekanini aytadi.\n\n`<head>` ichida sahifa haqida ma’lumot (sarlavha, kodirovka, CSS ulash), `<body>` ichida esa foydalanuvchi ko‘radigan kontent bo‘ladi. `<meta charset="utf-8">` o‘zbekcha harflar to‘g‘ri chiqishi uchun kerak.\n\nFaylni `index.html` deb saqlab, brauzerda ochsangiz — birinchi saytingiz tayyor.',
  lang: 'html',
  code: '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8">\n  <title>Mening birinchi saytim</title>\n</head>\n<body>\n  <h1>Salom, men Navro‘zman!</h1>\n  <p>Bu mening birinchi veb-sahifam.</p>\n</body>\n</html>',
  q: [
   ['Sahifada ko‘rinadigan kontent qaysi teg ichida?', ['<head>','<body>','<title>','<meta>'], 1, 'Ko‘rinadigan hamma narsa body ichida.'],
   ['Yopuvchi teg qanday yoziladi?', ['<p>','<\\p>','</p>','<p/>'], 2, 'Yopuvchi tegda / bo‘ladi: </p>.'],
   ['Sahifa dizayni uchun qaysi til ishlatiladi?', ['HTML','CSS','SQL','Python'], 1, 'CSS — ko‘rinish va dizayn.']] },
{ v: [
  ['Sarlavha va paragraf', 'h1 dan h6 gacha sarlavhalar bor, h1 eng kattasi. Oddiy matn p tegida yoziladi.'],
  ['Havola', 'a tegi boshqa sahifaga olib boradi. Manzil href atributida yoziladi.', '<a href="https://navruz-orbit.vercel.app">Portfolio</a>'],
  ['Rasm', 'img tegi yopilmaydi. src — rasm manzili, alt esa rasm ko‘rinmasa yoki ko‘zi ojiz foydalanuvchi uchun tavsif.', '<img src="men.jpg" alt="Mening rasmim">'],
  ['Ro‘yxatlar', 'ul — nuqtali, ol — raqamli ro‘yxat. Har bir band li tegida yoziladi.', '<ul>\n  <li>Python</li>\n  <li>HTML</li>\n</ul>']],
  x: '**Atribut** — tegga qo‘shimcha ma’lumot: `href`, `src`, `alt`, `class`, `id`. Ular ochuvchi teg ichida `nom="qiymat"` ko‘rinishida yoziladi.\n\nHavolani yangi oynada ochish uchun `target="_blank"` qo‘shiladi. Sahifa ichidagi bo‘limga o‘tish: `<a href="#aloqa">` va bo‘limda `id="aloqa"`.\n\nSemantik teglar — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` — sahifani tushunarli qiladi va Google uni yaxshiroq topadi.',
  lang: 'html',
  code: '<header>\n  <h1>Navro‘z</h1>\n  <nav>\n    <a href="#loyihalar">Loyihalar</a>\n    <a href="#aloqa">Aloqa</a>\n  </nav>\n</header>\n<main>\n  <section id="loyihalar">\n    <h2>Loyihalarim</h2>\n    <ol>\n      <li>KUNIM — kun tartibi</li>\n      <li>YozAI — ingliz tili</li>\n    </ol>\n  </section>\n</main>',
  q: [
   ['Havola manzili qaysi atributda?', ['src','href','link','url'], 1, 'a tegida manzil href da.'],
   ['Rasm uchun tavsif atributi?', ['title','desc','alt','name'], 2, 'alt — alternativ matn.'],
   ['Raqamli ro‘yxat tegi?', ['<ul>','<ol>','<li>','<dl>'], 1, 'ol — ordered list.']] },
{ v: [
  ['CSS — sahifa kiyimi', 'CSS bilan rang, shrift, o‘lcham va joylashuvni boshqaramiz. Uni alohida style.css faylida yozib, link bilan ulaymiz.', '<link rel="stylesheet" href="style.css">'],
  ['Qoida tuzilishi', 'Selektor qaysi elementni tanlaydi, jingalak qavs ichida esa xususiyat va qiymat yoziladi.', 'h1 {\n  color: #6CE4F0;\n  font-size: 40px;\n}'],
  ['Klass va id', 'Nuqta bilan klass, panjara bilan id tanlanadi. Klass ko‘p elementga, id esa bittasiga beriladi.', '.karta { background: #111; }\n#asosiy { padding: 20px; }'],
  ['Ranglar va shriftlar', 'Rang nomi, hex kod yoki rgb bilan yoziladi. Google Fonts orqali chiroyli shrift ulash mumkin.']],
  x: 'CSS ulashning uch yo‘li: `style` atributi (tavsiya etilmaydi), `<style>` tegi va eng yaxshisi — alohida `.css` fayl.\n\n**Kaskad**: bir elementga bir nechta qoida tegsa, aniqroq selektor (`#id` > `.class` > `teg`) va keyinroq yozilgani ustun bo‘ladi.\n\nFoydali xususiyatlar: `color`, `background`, `font-family`, `font-size`, `text-align`, `border-radius`. Brauzerdagi **F12 → Elements** oynasida CSS’ni jonli sinab ko‘rish mumkin.',
  lang: 'css',
  code: 'body {\n  font-family: "Manrope", sans-serif;\n  background: #04050B;\n  color: #EEEDFB;\n}\n.karta {\n  background: #14162e;\n  border-radius: 16px;\n  padding: 20px;\n}\n.karta:hover {\n  transform: translateY(-4px);\n}',
  q: [
   ['Klass selektori qaysi belgi bilan?', ['#','.','*','@'], 1, '.karta — klass.'],
   ['Matn rangini o‘zgartiruvchi xususiyat?', ['background','font','color','text-color'], 2, 'color — matn rangi.'],
   ['CSS faylni HTML’ga ulash tegi?', ['<script>','<link>','<css>','<a>'], 1, '<link rel="stylesheet">.']] },
{ v: [
  ['Har bir element — quti', 'Brauzer har bir elementni to‘rtburchak quti deb ko‘radi. Bu box model deyiladi.'],
  ['To‘rt qatlam', 'Ichkarida kontent, keyin padding — ichki bo‘shliq, border — chegara va margin — tashqi bo‘shliq.', '.quti {\n  padding: 16px;\n  border: 2px solid #6CE4F0;\n  margin: 24px;\n}'],
  ['box-sizing', 'border-box qiymati bersak, width ichiga padding va border ham kiradi. O‘lchamni hisoblash osonlashadi.', '* { box-sizing: border-box; }'],
  ['Blok va satr', 'div va p kabi blok elementlar butun qatorni egallaydi, span va a esa matn ichida yonma-yon turadi.']],
  x: '`margin` elementlar orasidagi masofa, `padding` esa element chegarasi bilan kontent orasidagi masofa. Qisqa yozuv: `margin: 10px 20px` — yuqori/past 10, chap/o‘ng 20.\n\n`margin: 0 auto` blokni gorizontal markazga qo‘yadi (kengligi berilgan bo‘lsa).\n\n`display` xususiyati elementning xulqini o‘zgartiradi: `block`, `inline`, `inline-block`, `none` (yashirish), va keyingi darsdagi `flex`.',
  lang: 'css',
  code: '* { box-sizing: border-box; }\n.konteyner {\n  max-width: 960px;\n  margin: 0 auto;\n  padding: 0 16px;\n}\n.tugma {\n  display: inline-block;\n  padding: 12px 22px;\n  border: 1px solid #6CE4F0;\n  border-radius: 999px;\n}',
  q: [
   ['Chegara va kontent orasidagi bo‘shliq?', ['margin','padding','border','gap'], 1, 'padding — ichki bo‘shliq.'],
   ['Blokni markazga qo‘yish?', ['align: center','margin: 0 auto','padding: auto','center: true'], 1, 'margin: 0 auto.'],
   ['Elementni yashirish?', ['display: none','hide: true','visible: 0','opacity: none'], 0, 'display: none.']] },
{ v: [
  ['Flexbox — oson joylashtirish', 'display flex bersak, ichidagi elementlar bir qatorga tiziladi va ularni oson tekislash mumkin.', '.menu { display: flex; gap: 12px; }'],
  ['Asosiy o‘q bo‘yicha', 'justify-content elementlarni gorizontal taqsimlaydi: boshiga, markazga, oxiriga yoki orasini teng bo‘lib.'],
  ['Kesishgan o‘q', 'align-items vertikal tekislaydi. Ikkalasini center qilsak, element aniq markazda bo‘ladi.', '.markaz {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}'],
  ['Qatorga sig‘masa', 'flex-wrap wrap elementlarni keyingi qatorga o‘tkazadi. Kartochkalar galereyasi uchun juda qulay.']],
  x: 'Flexbox bir o‘lchamli joylashuv: qator (`flex-direction: row`) yoki ustun (`column`).\n\nAsosiy xususiyatlar: `justify-content` (`flex-start`, `center`, `space-between`, `space-around`), `align-items` (`stretch`, `center`, `flex-end`), `gap` (oraliq), `flex: 1` (bo‘sh joyni egallash).\n\nIkki o‘lchamli murakkab to‘rlar uchun `display: grid` bor — u ham shu kurs so‘ngida sinab ko‘rishga arziydi.',
  lang: 'css',
  code: '.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n}\n.kartalar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.kartalar .karta { flex: 1 1 260px; }',
  q: [
   ['Flexbox’ni yoqish?', ['display: flex','flex: on','position: flex','float: flex'], 0, 'display: flex.'],
   ['Elementlarni gorizontal markazlash?', ['align-items: center','justify-content: center','text-align: middle','margin: center'], 1, 'Asosiy o‘q — justify-content.'],
   ['Elementlar orasidagi masofa?', ['space','gap','margin-all','between'], 1, 'gap — oraliq.']] },
{ v: [
  ['Telefon birinchi', 'Foydalanuvchilarning ko‘pchiligi saytni telefonda ochadi. Responsive dizayn sahifani har qanday ekranga moslaydi.'],
  ['viewport meta', 'Bu teg bo‘lmasa, telefon sahifani kichraytirib ko‘rsatadi. U head ichiga albatta qo‘yiladi.', '<meta name="viewport" content="width=device-width, initial-scale=1">'],
  ['Media so‘rovlar', 'media query ekran kengligiga qarab boshqa CSS qo‘llaydi. Masalan, 700 pikseldan tor ekranda ustunlar bitta bo‘ladi.', '@media (max-width: 700px) {\n  .kartalar { flex-direction: column; }\n}'],
  ['Saytni internetga chiqarish', 'Tayyor saytni GitHub Pages, Netlify yoki Vercel’ga bepul joylash mumkin. Shu akademiya ham Vercel’da turibdi.']],
  x: 'Moslashuvchan dizayn qoidalari: foizli yoki `max-width` kenglik, `img { max-width: 100%; }`, shrift uchun `clamp()` va `rem`.\n\n**Mobile-first**: avval telefon uchun yozing, keyin `@media (min-width: 900px)` bilan katta ekranga kengaytiring.\n\nJoylash: loyihani GitHub’ga yuklang, Vercel’da “Import Project” qiling — har `git push` dan keyin sayt avtomatik yangilanadi.',
  lang: 'css',
  code: 'img { max-width: 100%; height: auto; }\nh1 { font-size: clamp(28px, 6vw, 56px); }\n\n.grid { display: grid; gap: 16px; grid-template-columns: 1fr; }\n@media (min-width: 900px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}',
  q: [
   ['Telefonda to‘g‘ri ko‘rinish uchun qaysi teg kerak?', ['<meta viewport>','<mobile>','<responsive>','<phone>'], 0, 'meta name="viewport".'],
   ['Ekran kengligiga qarab CSS berish?', ['@import','@media','@font-face','@keyframes'], 1, '@media — media so‘rov.'],
   ['Rasm konteynerdan chiqmasligi uchun?', ['max-width: 100%','width: auto 100','overflow: img','size: fit'], 0, 'img { max-width:100% }.']] }
],
exam: [
 ['HTML nima?', ['Dasturlash tili','Belgilash tili','Ma’lumotlar bazasi','Operatsion tizim'], 1],
 ['Eng katta sarlavha tegi?', ['<h6>','<head>','<h1>','<title>'], 2],
 ['Rasm manzili qaysi atributda?', ['href','src','alt','link'], 1],
 ['id selektori belgisi?', ['.','#','&','$'], 1],
 ['Tashqi bo‘shliq?', ['padding','margin','border','outline'], 1],
 ['Flexbox’da vertikal tekislash?', ['justify-content','align-items','vertical-align','flex-wrap'], 1],
 ['@media nima uchun?', ['Animatsiya','Shrift ulash','Ekran o‘lchamiga moslash','Rasm qo‘yish'], 2],
 ['Semantik teg qaysi?', ['<div>','<span>','<nav>','<b>'], 2],
 ['box-sizing: border-box nimani o‘zgartiradi?', ['Rangni','width ichiga padding va border kiradi','Shriftni','Hech narsani'], 1],
 ['Yangi oynada ochiladigan havola?', ['target="_blank"','new="true"','open="tab"','rel="new"'], 0]
]
};
