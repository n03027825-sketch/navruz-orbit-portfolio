module.exports = {
lessons: [
{ task:'Sahifaga script yozing va konsolda “Salom, JS!” chiqaring.', v: [
  ['JavaScript — saytning harakati', 'HTML skelet, CSS kiyim bo‘lsa, JavaScript saytga jon beradi: tugma bosilganda nimadir sodir bo‘ladi, ma’lumot yangilanadi.'],
  ['Hamma joyda ishlaydi', 'JavaScript har bir brauzerda o‘rnatilgan. Node.js bilan esa serverda ham ishlatiladi.'],
  ['Konsol', 'Brauzerda F12 bosing va Console oynasini oching. Bu yerda JavaScript’ni darhol sinab ko‘rish mumkin.', 'console.log("Salom, dunyo!");'],
  ['Sahifaga ulash', 'Kod alohida faylga yoziladi va body oxirida script tegi bilan ulanadi.', '<script src="app.js"></script>']],
  x: 'JavaScript (JS) — veb uchun asosiy dasturlash tili. U HTML elementlarni o‘zgartira oladi, serverdan ma’lumot oladi va foydalanuvchi harakatiga javob beradi.\n\n`console.log()` — natijani konsolga chiqaradi, xatolarni topishda eng yaxshi yordamchi. `alert()` — oyna chiqaradi (lekin foydalanuvchini bezovta qiladi, kam ishlating).\n\nNuqta-vergul `;` ixtiyoriy, lekin bir xil uslubda yozish tavsiya etiladi. Izohlar: `// bir qator` va `/* ko‘p qator */`.',
  lang: 'js',
  code: '// app.js\nconsole.log("Sayt yuklandi");\nconsole.log(2 + 3 * 4);\nconsole.log("Bugun:", new Date().toLocaleDateString("uz"));',
  q: [
   ['Konsolga chiqarish buyrug‘i?', ['print()','console.log()','echo()','write()'], 1, 'console.log.'],
   ['Brauzer konsoli qaysi tugma bilan ochiladi?', ['F1','F5','F12','Esc'], 2, 'F12 — dasturchi vositalari.'],
   ['JS faylni ulash tegi?', ['<link>','<js>','<script>','<code>'], 2, '<script src="...">.']] },
{ task:'3 ta o‘zgaruvchi (ism, yosh, talabami) e’lon qiling va turlarini typeof bilan chiqaring.', v: [
  ['let va const', 'O‘zgaruvchi let bilan yaratiladi. Qiymati o‘zgarmaydiganlari const bilan. Eski var ishlatmang.', 'const ism = "Malika";\nlet ball = 80;\nball = ball + 5;'],
  ['Turlar', 'string, number, boolean, null, undefined, object va array. typeof turni ko‘rsatadi.', 'console.log(typeof 42); // number'],
  ['Shablon satr', 'Teskari tirnoqli satrda dollar va jingalak qavs bilan o‘zgaruvchini joylash mumkin.', 'console.log(`Salom, ${ism}! Ball: ${ball}`);'],
  ['Qat’iy tenglik', 'Uchta teng belgisi turni ham tekshiradi. Ikkitasi esa kutilmagan natija berishi mumkin — doim uchtasini ishlating.', 'console.log(5 === "5"); // false']],
  x: '`const` — qayta qiymat berib bo‘lmaydigan o‘zgaruvchi; `let` — o‘zgaruvchan. Standart qoida: avval `const`, kerak bo‘lsa `let`.\n\nJS’da `+` matn bilan ishlaganda birlashtiradi: `"5" + 3` → `"53"`. Songa aylantirish: `Number("5")` yoki `parseInt()`.\n\n`===` va `!==` — qat’iy taqqoslash (qiymat va tur). `==` avtomatik tur aylantirishi sababli xatolarga olib keladi.',
  lang: 'js',
  code: 'const narx = 49000;\nlet soni = 3;\nconst chegirma = 0.1;\n\nconst jami = narx * soni * (1 - chegirma);\nconsole.log(`Jami: ${jami.toLocaleString("uz")} so‘m`);\nconsole.log(typeof jami, Number("12") + 3);',
  q: [
   ['Qayta qiymat berilmaydigan o‘zgaruvchi?', ['let','var','const','fix'], 2, 'const — o‘zgarmas.'],
   ['"5" + 3 natijasi?', ['8','"53"','Xato','NaN'], 1, 'Matn bilan + birlashtiradi.'],
   ['Qat’iy tenglik operatori?', ['=','==','===','=>'], 2, '=== tur va qiymatni tekshiradi.']] },
{ task:'1 dan 20 gacha sonlarni chiqaring, juftlarini “juft” deb belgilang.', v: [
  ['if va else', 'Shart qavs ichida, bajariladigan kod jingalak qavs ichida yoziladi.', 'if (yosh >= 16) {\n  console.log("Ruxsat");\n} else {\n  console.log("Hali erta");\n}'],
  ['Ternar operator', 'Qisqa shart: savol belgisi va ikki nuqta bilan bir qatorda yoziladi.', 'const holat = ball >= 60 ? "o‘tdi" : "yiqildi";'],
  ['for sikli', 'Klassik for: boshlanish, shart va qadam.', 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}'],
  ['for...of', 'Massiv elementlarini aylanishning eng qulay usuli.', 'for (const meva of ["olma", "anor"]) {\n  console.log(meva);\n}']],
  x: 'Mantiqiy operatorlar: `&&` (va), `||` (yoki), `!` (emas). Masalan: `if (ism && ism.length > 2)`.\n\n“Falsy” qiymatlar shartda `false` hisoblanadi: `0`, `""`, `null`, `undefined`, `NaN`. Qolgan hammasi “truthy”.\n\n`while` sikli ham bor, lekin veb dasturlashda massiv metodlari (`forEach`, `map`, `filter`) ko‘proq ishlatiladi — keyingi darsda.',
  lang: 'js',
  code: 'const baholar = [92, 45, 78, 60, 99];\nlet otdi = 0;\nfor (const b of baholar) {\n  if (b >= 60) otdi++;\n}\nconsole.log(`${otdi} ta o‘quvchi o‘tdi`);\n\nconst xabar = otdi === baholar.length ? "Hammasi o‘tdi!" : "Ba’zilar qayta topshiradi";\nconsole.log(xabar);',
  q: [
   ['JS’da “va” operatori?', ['and','&&','&','||'], 1, '&& — mantiqiy va.'],
   ['Qaysi qiymat falsy?', ['"0"','[]','0','"salom"'], 2, '0 falsy, "0" esa truthy.'],
   ['Massivni aylanishning qulay usuli?', ['for...of','goto','repeat','loop()'], 0, 'for...of.']] },
{ task:'Massivdagi ballarning o‘rtachasini hisoblaydigan funksiya yozing.', v: [
  ['Funksiya e’lon qilish', 'function so‘zi yoki strelka sintaksisi bilan.', 'function kvadrat(x) { return x * x; }\nconst kub = x => x * x * x;'],
  ['Massiv', 'Massiv kvadrat qavsda, indeks noldan. push qo‘shadi, length uzunlikni beradi.', 'const sonlar = [3, 7, 1];\nsonlar.push(9);'],
  ['map va filter', 'map har elementni o‘zgartiradi, filter esa shartga mosini qoldiradi.', 'const ikki = sonlar.map(n => n * 2);\nconst katta = sonlar.filter(n => n > 5);'],
  ['Obyekt', 'Obyekt kalit-qiymat juftliklari. Nuqta orqali murojaat qilinadi.', 'const talaba = { ism: "Ali", ball: 88 };\nconsole.log(talaba.ism);']],
  x: 'Strelkali funksiya `(a, b) => a + b` qisqa va zamonaviy. Bitta ifoda bo‘lsa, `return` yozilmaydi.\n\nEng ko‘p ishlatiladigan massiv metodlari: `map`, `filter`, `reduce`, `find`, `some`, `includes`, `sort`, `join`.\n\nObyektlar massivi — real ma’lumotning eng keng tarqalgan shakli (masalan, kurslar ro‘yxati). JSON formati ham aynan shunday ko‘rinadi.',
  lang: 'js',
  code: 'const kurslar = [\n  { nom: "Python", narx: 0 },\n  { nom: "JavaScript", narx: 59000 },\n  { nom: "ML", narx: 149000 },\n];\nconst pullik = kurslar.filter(k => k.narx > 0);\nconst jami = pullik.reduce((s, k) => s + k.narx, 0);\nconsole.log(pullik.map(k => k.nom).join(", "), "—", jami);',
  q: [
   ['Har elementni o‘zgartirib yangi massiv qaytaradi?', ['filter','map','find','push'], 1, 'map.'],
   ['Obyekt xususiyatiga murojaat?', ['talaba->ism','talaba.ism','talaba::ism','talaba#ism'], 1, 'Nuqta orqali.'],
   ['const f = x => x + 1; f(4) = ?', ['4','5','x+1','Xato'], 1, '4 + 1 = 5.']] },
{ task:'Tugma bosilganda sahifadagi matn rangini o‘zgartiradigan kod yozing.', v: [
  ['DOM — sahifa daraxti', 'Brauzer HTML’ni DOM deb ataladigan obyektlar daraxtiga aylantiradi. JavaScript shu daraxtni o‘zgartiradi.'],
  ['Elementni topish', 'querySelector CSS selektori bilan birinchi mos elementni topadi.', 'const sarlavha = document.querySelector("h1");'],
  ['Matn va stilni o‘zgartirish', 'textContent matnni, classList esa klasslarni boshqaradi.', 'sarlavha.textContent = "Yangi sarlavha";\nsarlavha.classList.add("faol");'],
  ['Element yaratish', 'createElement bilan yangi element yaratib, append bilan sahifaga qo‘shamiz.', 'const li = document.createElement("li");\nli.textContent = "Yangi vazifa";\nro‘yxat.append(li);']],
  x: '`document.querySelectorAll(".karta")` — barcha mos elementlar. Ularni `forEach` bilan aylanish mumkin.\n\n`textContent` xavfsiz, `innerHTML` esa HTML’ni talqin qiladi — foydalanuvchi kiritgan matnni `innerHTML` ga qo‘ymang (XSS xavfi).\n\n`element.style.color = "red"` ishlaydi, lekin yaxshiroq usul — CSS’da klass yozib, JS’da faqat `classList.toggle()` qilish.',
  lang: 'js',
  code: 'const royxat = document.querySelector("#vazifalar");\nconst vazifalar = ["Python darsi", "Ingliz tili", "Sport"];\n\nfor (const v of vazifalar) {\n  const li = document.createElement("li");\n  li.textContent = v;\n  royxat.append(li);\n}\ndocument.querySelector("h1").textContent = `${vazifalar.length} ta vazifa`;',
  q: [
   ['CSS selektori bilan element topish?', ['getElement()','querySelector()','find()','select()'], 1, 'document.querySelector.'],
   ['Foydalanuvchi matnini xavfsiz qo‘yish?', ['innerHTML','textContent','outerHTML','write'], 1, 'textContent HTML’ni talqin qilmaydi.'],
   ['Klassni almashtirish?', ['classList.toggle()','class.switch()','style.class()','toggleClass()'], 0, 'classList.toggle.']] },
{ task:'Mini-loyiha: tugma bosilganda tasodifiy maslahat chiqaradigan sahifa qiling.', v: [
  ['Hodisa — foydalanuvchi harakati', 'Bosish, yozish, sichqonchani yurgizish — bularning hammasi hodisa. addEventListener ularni tinglaydi.'],
  ['Tugma bosilganda', 'Birinchi parametr hodisa nomi, ikkinchisi bajariladigan funksiya.', 'tugma.addEventListener("click", () => {\n  hisob++;\n  natija.textContent = hisob;\n});'],
  ['Forma', 'submit hodisasida preventDefault sahifa qayta yuklanishini to‘xtatadi.', 'forma.addEventListener("submit", e => {\n  e.preventDefault();\n});'],
  ['Mini-loyiha', 'Endi vazifalar ro‘yxati ilovasini yozasiz: kiritish, qo‘shish va bosganda o‘chirish. KUNIM ham shunday boshlangan!']],
  x: 'Ko‘p ishlatiladigan hodisalar: `click`, `input`, `submit`, `keydown`, `change`, `scroll`, `load`.\n\n`localStorage` — brauzerda ma’lumot saqlash: `localStorage.setItem("v", JSON.stringify(massiv))` va `JSON.parse(localStorage.getItem("v"))`. Sahifa yangilansa ham ma’lumot qoladi.\n\nKeyingi qadam: `fetch()` bilan serverdan ma’lumot olish — backend kursida API bilan tanishasiz.',
  lang: 'js',
  code: 'const forma = document.querySelector("form");\nconst kirish = document.querySelector("input");\nconst royxat = document.querySelector("ul");\n\nforma.addEventListener("submit", e => {\n  e.preventDefault();\n  if (!kirish.value.trim()) return;\n  const li = document.createElement("li");\n  li.textContent = kirish.value;\n  li.addEventListener("click", () => li.remove());\n  royxat.append(li);\n  kirish.value = "";\n});',
  q: [
   ['Hodisani tinglash metodi?', ['onEvent()','addEventListener()','listen()','watch()'], 1, 'addEventListener.'],
   ['Forma yuborilganda sahifa yangilanmasligi uchun?', ['e.stop()','e.preventDefault()','return true','e.cancel()'], 1, 'preventDefault.'],
   ['Brauzerda doimiy saqlash?', ['sessionCookie','localStorage','window.save','cache.put'], 1, 'localStorage.']] }
],
exam: [
 ['JS qayerda ishlaydi?', ['Faqat serverda','Brauzerda va Node.js’da','Faqat Excel’da','Faqat telefonda'], 1],
 ['O‘zgarmas o‘zgaruvchi?', ['const','let','var','static'], 0],
 ['5 === "5" natijasi?', ['true','false','undefined','Xato'], 1],
 ['Shartga mos elementlarni qoldiradi?', ['map','filter','reduce','push'], 1],
 ['Strelkali funksiya?', ['x -> x*2','x => x*2','fn x: x*2','x >> x*2'], 1],
 ['Elementni topish?', ['document.querySelector','window.find','html.get','page.select'], 0],
 ['Hodisa nomi bosish uchun?', ['press','click','tap','hit'], 1],
 ['Massiv uzunligi?', ['size','count','length','len()'], 2],
 ['Shablon satr belgisi?', ['"','\'','`','/'], 2],
 ['XSS xavfi qaysi xususiyat bilan?', ['textContent','innerHTML','classList','id'], 1]
]
};
