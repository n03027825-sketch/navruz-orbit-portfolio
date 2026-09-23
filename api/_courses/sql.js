module.exports = {
lessons: [
{ task:'O‘zingiz uchun “akademiya” bazasining 3 ta jadvalini qog‘ozda chizing: talaba, kurs, to‘lov.', v: [
  ['Ma’lumot — biznesning boyligi', 'Har bir ilova ma’lumot saqlaydi: foydalanuvchilar, buyurtmalar, to‘lovlar. Buning uchun ma’lumotlar bazasi ishlatiladi.'],
  ['Jadval, qator, ustun', 'Relyatsion baza jadvallardan iborat. Ustun — xususiyat, masalan ism; qator — bitta yozuv, masalan bitta o‘quvchi.'],
  ['SQL — baza tili', 'SQL bilan bazaga savol beramiz: qaysi o‘quvchilar 90 dan yuqori ball oldi? Bu til 50 yildan beri ishlatiladi.'],
  ['Mashhur bazalar', 'PostgreSQL, MySQL, SQLite va SQL Server. O‘rganish uchun SQLite eng oson — u bitta fayl.']],
  x: 'Ma’lumotlar bazasi (DB) — tartiblangan ma’lumot ombori. **DBMS** — uni boshqaradigan dastur (PostgreSQL, MySQL).\n\nNima uchun Excel emas? Baza millionlab qatorni tez qidiradi, bir vaqtda ko‘p foydalanuvchiga xizmat qiladi, xatolardan himoya qiladi va dasturlar bilan oson bog‘lanadi.\n\nSQL buyruqlari guruhlari: **DDL** (tuzilma: CREATE, ALTER), **DML** (ma’lumot: INSERT, UPDATE, DELETE), **DQL** (so‘rov: SELECT).',
  lang: 'sql',
  code: '-- Bu izoh\n-- sqliteonline.com saytida sinab ko‘ring\nSELECT "Salom, SQL!" AS xabar;\nSELECT 2 + 2 AS natija;',
  q: [
   ['Jadvaldagi bitta yozuv nima deyiladi?', ['Ustun','Qator','Baza','Kalit'], 1, 'Qator (row) — bitta yozuv.'],
   ['Ma’lumot so‘rash buyrug‘i?', ['GET','SELECT','FIND','SHOW ME'], 1, 'SELECT.'],
   ['Eng oson o‘rganiladigan baza?', ['SQLite','Oracle','Cassandra','Redis'], 0, 'SQLite — bitta faylli baza.']] },
{ task:'talabalar jadvalini yarating va 5 ta qator INSERT qiling.', v: [
  ['Jadval yaratish', 'CREATE TABLE bilan jadval va uning ustunlarini turi bilan e’lon qilamiz.', 'CREATE TABLE talabalar (\n  id INTEGER PRIMARY KEY,\n  ism TEXT NOT NULL,\n  ball INTEGER\n);'],
  ['Asosiy kalit', 'PRIMARY KEY har bir qatorni noyob belgilaydi — ikki talabaning id si bir xil bo‘lmaydi.'],
  ['Ma’lumot qo‘shish', 'INSERT INTO yangi qator qo‘shadi.', 'INSERT INTO talabalar (ism, ball) VALUES ("Ali", 88);'],
  ['Cheklovlar', 'NOT NULL bo‘sh qiymatni, UNIQUE takrorni, CHECK esa noto‘g‘ri qiymatni taqiqlaydi.']],
  x: 'Asosiy turlar: `INTEGER`, `REAL`/`DECIMAL`, `TEXT`/`VARCHAR(n)`, `DATE`, `BOOLEAN`.\n\nCheklovlar ma’lumotni toza saqlaydi: `NOT NULL`, `UNIQUE`, `DEFAULT 0`, `CHECK (ball BETWEEN 0 AND 100)`.\n\nBir nechta qatorni bir so‘rovda qo‘shish: `VALUES (...), (...), (...)`.',
  lang: 'sql',
  code: 'CREATE TABLE kurslar (\n  id INTEGER PRIMARY KEY,\n  nom TEXT NOT NULL UNIQUE,\n  narx INTEGER DEFAULT 0 CHECK (narx >= 0)\n);\n\nINSERT INTO kurslar (nom, narx) VALUES\n  ("Python asoslari", 0),\n  ("JavaScript", 59000),\n  ("Machine Learning", 149000);',
  q: [
   ['Jadval yaratish buyrug‘i?', ['NEW TABLE','CREATE TABLE','MAKE TABLE','ADD TABLE'], 1, 'CREATE TABLE.'],
   ['Har qatorni noyob belgilovchi?', ['FOREIGN KEY','PRIMARY KEY','INDEX','NULL'], 1, 'PRIMARY KEY.'],
   ['Bo‘sh qiymatni taqiqlash?', ['NOT NULL','NO EMPTY','REQUIRED','FULL'], 0, 'NOT NULL.']] },
{ task:'Ball 70 dan yuqori talabalarni chiqaruvchi so‘rov yozing.', v: [
  ['SELECT — savol berish', 'SELECT dan keyin qaysi ustunlar, FROM dan keyin qaysi jadval.', 'SELECT ism, ball FROM talabalar;'],
  ['Hammasi', 'Yulduzcha barcha ustunlarni tanlaydi. Katta jadvallarda faqat kerakli ustunlarni yozgan ma’qul.', 'SELECT * FROM talabalar;'],
  ['WHERE — filtr', 'WHERE shartga mos qatorlarni qoldiradi.', 'SELECT ism FROM talabalar WHERE ball >= 80;'],
  ['LIKE va IN', 'LIKE andaza bo‘yicha qidiradi, IN esa ro‘yxatdagi qiymatlardan birini tanlaydi.', 'SELECT * FROM talabalar WHERE ism LIKE "A%";']],
  x: 'Shart operatorlari: `=`, `<>` (teng emas), `>`, `<`, `BETWEEN 70 AND 90`, `IN (...)`, `IS NULL`, `LIKE`.\n\n`LIKE` andazalari: `%` — istalgan belgilar, `_` — bitta belgi. `"A%"` — A bilan boshlanadi, `"%ov"` — “ov” bilan tugaydi.\n\nShartlarni `AND`, `OR`, `NOT` bilan birlashtirasiz. `DISTINCT` takrorlarni olib tashlaydi: `SELECT DISTINCT shahar FROM talabalar;`',
  lang: 'sql',
  code: 'SELECT ism, ball\nFROM talabalar\nWHERE ball BETWEEN 70 AND 100\n  AND shahar IN ("Toshkent", "Samarqand")\n  AND ism LIKE "%a";',
  q: [
   ['Qatorlarni shart bilan filtrlash?', ['FILTER','WHERE','IF','WHEN'], 1, 'WHERE.'],
   ['"A" bilan boshlanadigan ismlar?', ['LIKE "A%"','LIKE "%A"','= "A*"','IN ("A")'], 0, '% — istalgan davom.'],
   ['Takroriy qiymatlarni olib tashlash?', ['UNIQUE','DISTINCT','ONLY','SINGLE'], 1, 'SELECT DISTINCT.']] },
{ task:'Har bir kurs bo‘yicha talabalar sonini va o‘rtacha ballni chiqaring.', v: [
  ['Tartiblash', 'ORDER BY natijani tartiblaydi. DESC kamayish tartibida.', 'SELECT ism, ball FROM talabalar ORDER BY ball DESC;'],
  ['LIMIT', 'Faqat birinchi bir nechta qatorni olish — top-3 kabi hisobotlar uchun.', 'SELECT ism FROM talabalar ORDER BY ball DESC LIMIT 3;'],
  ['Agregat funksiyalar', 'COUNT, SUM, AVG, MIN, MAX ko‘p qatordan bitta natija chiqaradi.', 'SELECT AVG(ball) FROM talabalar;'],
  ['GROUP BY', 'GROUP BY qatorlarni guruhlab, har guruh uchun agregat hisoblaydi — masalan, har shahar bo‘yicha o‘rtacha ball.', 'SELECT shahar, AVG(ball)\nFROM talabalar GROUP BY shahar;']],
  x: '`GROUP BY` bilan tanlangan ustunlar yoki guruhlash ustunida, yoki agregat ichida bo‘lishi kerak.\n\n`HAVING` — guruhlardan keyingi filtr: `HAVING COUNT(*) > 5`. `WHERE` guruhlashdan **oldin**, `HAVING` esa **keyin** ishlaydi.\n\n`AS` bilan ustunga chiroyli nom: `SUM(summa) AS jami_tushum`.',
  lang: 'sql',
  code: 'SELECT kurs_id,\n       COUNT(*)     AS tolovlar_soni,\n       SUM(summa)   AS jami_tushum\nFROM tolovlar\nWHERE holat = "tolandi"\nGROUP BY kurs_id\nHAVING COUNT(*) >= 10\nORDER BY jami_tushum DESC;',
  q: [
   ['Kamayish tartibi?', ['ASC','DESC','DOWN','REVERSE'], 1, 'DESC.'],
   ['Qatorlar sonini hisoblash?', ['SUM(*)','COUNT(*)','TOTAL()','NUM()'], 1, 'COUNT(*).'],
   ['Guruhlardan keyingi filtr?', ['WHERE','HAVING','FILTER','LIMIT'], 1, 'HAVING.']] },
{ task:'talaba va kurs jadvallarini JOIN qilib, kim qaysi kursda ekanini chiqaring.', v: [
  ['Nega bir nechta jadval?', 'Talaba ma’lumotini har bir to‘lovda takrorlamaslik uchun ularni alohida jadvallarda saqlab, id orqali bog‘laymiz.'],
  ['Tashqi kalit', 'FOREIGN KEY boshqa jadvaldagi qatorga ishora qiladi: tolovlar.talaba_id → talabalar.id.'],
  ['INNER JOIN', 'INNER JOIN ikkala jadvalda mos kelgan qatorlarni birlashtiradi.', 'SELECT t.ism, p.summa\nFROM tolovlar p\nJOIN talabalar t ON t.id = p.talaba_id;'],
  ['LEFT JOIN', 'LEFT JOIN chap jadvalning hammasini qoldiradi — masalan, hali to‘lov qilmagan talabalarni ham ko‘rish uchun.']],
  x: 'Jadvallarni to‘g‘ri ajratish **normalizatsiya** deyiladi: har bir fakt bitta joyda saqlanadi.\n\nJOIN turlari: `INNER` (faqat moslari), `LEFT` (chapning hammasi), `RIGHT`, `FULL`. Mos kelmagan joyda `NULL` chiqadi.\n\nJadvalga qisqa nom (alias) berish so‘rovni o‘qishni osonlashtiradi: `FROM talabalar t`.',
  lang: 'sql',
  code: '-- Hali birorta to‘lov qilmagan talabalar\nSELECT t.ism\nFROM talabalar t\nLEFT JOIN tolovlar p ON p.talaba_id = t.id\nWHERE p.id IS NULL;',
  q: [
   ['Boshqa jadvalga ishora qiluvchi kalit?', ['PRIMARY KEY','FOREIGN KEY','UNIQUE','INDEX'], 1, 'FOREIGN KEY.'],
   ['Faqat mos qatorlarni birlashtiradi?', ['LEFT JOIN','INNER JOIN','FULL JOIN','CROSS'], 1, 'INNER JOIN.'],
   ['Chap jadvalning hammasini qoldiradi?', ['LEFT JOIN','INNER JOIN','RIGHT JOIN','SELF JOIN'], 0, 'LEFT JOIN.']] },
{ task:'Bitta talabaning ballini UPDATE qiling, keyin sinov qatorini DELETE qiling — WHERE’ni unutmang.', v: [
  ['Yangilash', 'UPDATE qatorlarni o‘zgartiradi. WHERE ni unutmang — aks holda butun jadval o‘zgaradi!', 'UPDATE talabalar SET ball = 95 WHERE id = 3;'],
  ['O‘chirish', 'DELETE ham WHERE bilan ishlatiladi. Avval SELECT bilan nima o‘chishini tekshiring.', 'DELETE FROM tolovlar WHERE holat = "bekor";'],
  ['Tranzaksiya', 'Bir nechta o‘zgarish yoki hammasi bajarilsin, yoki hech biri — pul o‘tkazmalarida bu juda muhim.', 'BEGIN;\n-- ...\nCOMMIT;'],
  ['SQL injection', 'Foydalanuvchi matnini so‘rovga to‘g‘ridan-to‘g‘ri qo‘shmang. Parametrli so‘rovlar bu hujumdan himoya qiladi.']],
  x: '**Oltin qoida**: `UPDATE` va `DELETE` dan oldin xuddi shu `WHERE` bilan `SELECT` qilib ko‘ring.\n\nTranzaksiya: `BEGIN` → o‘zgarishlar → `COMMIT` (saqlash) yoki `ROLLBACK` (bekor qilish). To‘lov tizimlari shunday ishlaydi.\n\n**SQL injection**: `"SELECT * FROM users WHERE ism = \'" + kiritma + "\'"` — xavfli! To‘g‘ri usul (Python): `cursor.execute("SELECT * FROM users WHERE ism = ?", (kiritma,))`.',
  lang: 'python',
  code: 'import sqlite3\n\nbaza = sqlite3.connect("akademiya.db")\ncur = baza.cursor()\nism = input("Ism: ")\n# Xavfsiz, parametrli so‘rov:\ncur.execute("SELECT ball FROM talabalar WHERE ism = ?", (ism,))\nprint(cur.fetchone())\nbaza.close()',
  q: [
   ['UPDATE da WHERE unutilsa?', ['Hech narsa bo‘lmaydi','Butun jadval o‘zgaradi','Xato beradi','Bitta qator o‘zgaradi'], 1, 'Barcha qatorlar yangilanadi!'],
   ['O‘zgarishlarni bekor qilish?', ['COMMIT','ROLLBACK','UNDO','CANCEL'], 1, 'ROLLBACK.'],
   ['SQL injectiondan himoya?', ['Parametrli so‘rov','Katta harf','Uzun parol','Izoh yozish'], 0, 'Parametrlar kiritmani ajratadi.']] }
],
exam: [
 ['SQL nima uchun?', ['Ma’lumotlar bazasi bilan ishlash','Rasm chizish','Sayt dizayni','Ovoz yozish'], 0],
 ['Barcha ustunlarni tanlash?', ['SELECT *','SELECT ALL()','GET *','SHOW'], 0],
 ['Filtr qaysi so‘z bilan?', ['WHERE','FILTER','ONLY','IF'], 0],
 ['O‘rtacha qiymat funksiyasi?', ['MEAN','AVG','MIDDLE','SUM/2'], 1],
 ['Guruhlash?', ['GROUP BY','SORT BY','SPLIT BY','ORDER BY'], 0],
 ['Jadvallarni birlashtirish?', ['JOIN','MERGE','CONCAT','UNITE'], 0],
 ['Yangi qator qo‘shish?', ['ADD ROW','INSERT INTO','PUT','NEW'], 1],
 ['Tranzaksiyani saqlash?', ['SAVE','COMMIT','PUSH','END'], 1],
 ['LIMIT 5 nima qiladi?', ['5 ta qatorni qaytaradi','5 ustun','5 marta takror','5 soniya kutadi'], 0],
 ['SQL injectiondan himoya?', ['Parametrli so‘rovlar','Ko‘proq JOIN','DISTINCT','Katta harflar'], 0]
]
};
