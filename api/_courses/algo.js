module.exports = {
lessons: [
{ task:'Yozgan kodlaringizdan bittasini oling va uning necha marta takrorlanishini (Big-O) taxmin qiling.', v: [
  ['Algoritm — aniq retsept', 'Algoritm — masalani yechish uchun aniq, cheklangan qadamlar ketma-ketligi. Choy damlash ham algoritm!'],
  ['Nega samaradorlik muhim?', 'Bir xil masalani bir algoritm bir soniyada, boshqasi bir soatda yechadi. Katta ma’lumotda bu farq hal qiluvchi.'],
  ['Big-O', 'Big-O ma’lumot ko‘payganda vaqt qanday o‘sishini ko‘rsatadi: O(1) — doimiy, O(n) — chiziqli, O(n²) — kvadratik.'],
  ['Qanday o‘lchaymiz?', 'Soniyalarni emas, qadamlar sonini sanaymiz. n ta elementni bir marta aylanish — O(n), ichma-ich ikki sikl — O(n²).']],
  x: 'Asosiy murakkabliklar (tezdan sekinga): `O(1)` < `O(log n)` < `O(n)` < `O(n log n)` < `O(n²)` < `O(2ⁿ)`.\n\nn = 1 000 000 bo‘lsa: O(log n) ≈ 20 qadam, O(n) — million, O(n²) — trillion qadam. Shuning uchun kvadratik algoritm katta ma’lumotda “osilib” qoladi.\n\nBig-O eng yomon holatni baholaydi va doimiy koeffitsientlarni tashlaydi: `3n + 5` → `O(n)`.',
  lang: 'python',
  code: 'def birinchi(a):          # O(1)\n    return a[0]\n\ndef yigindi(a):          # O(n)\n    s = 0\n    for x in a:\n        s += x\n    return s\n\ndef juftlar(a):          # O(n²)\n    return [(x, y) for x in a for y in a]',
  q: [
   ['Ichma-ich ikki sikl murakkabligi?', ['O(n)','O(n²)','O(1)','O(log n)'], 1, 'n × n.'],
   ['Eng tez o‘sish qaysi?', ['O(2ⁿ)','O(n)','O(log n)','O(1)'], 0, 'Eksponensial eng yomoni.'],
   ['3n + 5 ning Big-O si?', ['O(3n+5)','O(n)','O(5)','O(n²)'], 1, 'Koeffitsientlar tashlanadi.']] },
{ task:'Saralangan ro‘yxatda ikkilik qidiruvni o‘zingiz yozing va chiziqli qidiruv bilan solishtiring.', v: [
  ['Chiziqli qidiruv', 'Elementlarni birma-bir tekshiramiz. Oddiy, lekin O(n) — million elementda million qadam.', 'for i, x in enumerate(a):\n    if x == kerak:\n        return i'],
  ['Ikkilik qidiruv', 'Saralangan ro‘yxatda o‘rtadagi elementga qaraymiz va har safar yarmini tashlaymiz. Million elementda atigi 20 qadam!'],
  ['Shart', 'Ikkilik qidiruv faqat saralangan ma’lumotda ishlaydi. Lug‘atdan so‘z qidirishni eslang.'],
  ['Kod', 'Chap va o‘ng chegara, o‘rta indeks — va chegaralarni toraytiramiz.', 'mid = (l + r) // 2']],
  x: 'Ikkilik qidiruv — `O(log n)`. Har qadamda qidiruv maydoni ikki marta qisqaradi: 1 000 000 → 500 000 → 250 000 → … → 1.\n\nOdatiy xatolar: `l <= r` o‘rniga `l < r` yozish, `mid` ni yangilashda `+1`/`-1` ni unutish — cheksiz sikl.\n\nPython’da tayyor modul bor: `import bisect; bisect.bisect_left(a, x)`.',
  lang: 'python',
  code: 'def ikkilik_qidiruv(a, kerak):\n    l, r = 0, len(a) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if a[mid] == kerak:\n            return mid\n        if a[mid] < kerak:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return -1\n\nprint(ikkilik_qidiruv([2, 5, 8, 12, 16, 23, 38], 23))  # 5',
  q: [
   ['Ikkilik qidiruv sharti?', ['Ro‘yxat saralangan bo‘lishi','Ro‘yxat bo‘sh bo‘lishi','Faqat matn','Faqat 10 element'], 0, 'Saralangan bo‘lishi shart.'],
   ['Ikkilik qidiruv murakkabligi?', ['O(n)','O(log n)','O(n²)','O(1)'], 1, 'Har qadamda yarmi.'],
   ['1 000 000 elementda taxminan necha qadam?', ['20','1000','500 000','1 000 000'], 0, 'log₂(10⁶) ≈ 20.']] },
{ task:'Bubble yoki selection sortni yozing, 10 va 1000 ta element uchun vaqtni o‘lchang.', v: [
  ['Saralash nima uchun?', 'Saralangan ma’lumotda qidirish, takrorni topish va reyting tuzish oson.'],
  ['Pufakcha saralash', 'Qo‘shni elementlarni solishtirib almashtiramiz. Tushunish oson, lekin O(n²) — sekin.'],
  ['Birlashtirib saralash', 'Merge sort ro‘yxatni ikkiga bo‘ladi, har birini saralaydi va birlashtiradi. Doim O(n log n).'],
  ['Amalda', 'Python’ning sorted funksiyasi Timsort algoritmidan foydalanadi — tez va barqaror.', 'sorted(a, key=lambda o: o["ball"], reverse=True)']],
  x: 'Mashhur algoritmlar: Bubble (O(n²)), Insertion (O(n²), kichik ro‘yxatda tez), Merge (O(n log n), qo‘shimcha xotira), Quick (o‘rtacha O(n log n)).\n\n**Barqaror saralash** teng elementlarning dastlabki tartibini saqlaydi — ball bo‘yicha saralaganda bir xil balli o‘quvchilar alifbo tartibida qoladi.\n\nIntervyu va olimpiadalarda algoritmni o‘zingiz yozishni bilish kerak, ishda esa tayyor `sort()` dan foydalanasiz.',
  lang: 'python',
  code: 'def merge_sort(a):\n    if len(a) <= 1:\n        return a\n    o = len(a) // 2\n    chap, ong = merge_sort(a[:o]), merge_sort(a[o:])\n    natija, i, j = [], 0, 0\n    while i < len(chap) and j < len(ong):\n        if chap[i] <= ong[j]:\n            natija.append(chap[i]); i += 1\n        else:\n            natija.append(ong[j]); j += 1\n    return natija + chap[i:] + ong[j:]\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))',
  q: [
   ['Pufakcha saralash murakkabligi?', ['O(n log n)','O(n²)','O(n)','O(1)'], 1, 'Ikki sikl.'],
   ['Merge sort murakkabligi?', ['O(n²)','O(n log n)','O(log n)','O(2ⁿ)'], 1, 'Bo‘lib birlashtirish.'],
   ['Python sorted() qaysi algoritm?', ['Timsort','Bubble','Bogo','Selection'], 0, 'Timsort.']] },
{ task:'Stek yordamida qavslar to‘g‘ri yopilganini tekshiruvchi dastur yozing.', v: [
  ['Stek — likoplar ustuni', 'Stekda oxirgi qo‘yilgan birinchi olinadi: LIFO. Brauzerdagi orqaga tugmasi va Ctrl+Z — stek.', 'stek = []\nstek.append(1)\nstek.pop()'],
  ['Navbat', 'Navbatda birinchi kelgan birinchi xizmat oladi: FIFO. Printer navbati, bot xabarlari.', 'from collections import deque\nq = deque()\nq.append("Ali")\nq.popleft()'],
  ['Qavslar masalasi', 'Stek bilan qavslar to‘g‘ri yopilganini tekshirish — klassik intervyu savoli.'],
  ['Qaysi birini tanlash?', 'Oxirgi amalni qaytarish kerak bo‘lsa — stek, kelish tartibida ishlash kerak bo‘lsa — navbat.']],
  x: 'Python ro‘yxati stek sifatida yaxshi ishlaydi (`append`, `pop` — O(1)). Navbat uchun esa `collections.deque` ishlating: ro‘yxatning `pop(0)` amali O(n).\n\nStek qo‘llanilishi: funksiya chaqiruvlari (call stack), ifodalarni hisoblash, labirintda chuqurlik bo‘yicha qidiruv (DFS).\n\nNavbat qo‘llanilishi: kenglik bo‘yicha qidiruv (BFS) — eng qisqa yo‘lni topish, vazifalarni tartib bilan bajarish.',
  lang: 'python',
  code: 'def qavslar_togrimi(s):\n    juft = {")": "(", "]": "[", "}": "{"}\n    stek = []\n    for c in s:\n        if c in "([{":\n            stek.append(c)\n        elif c in juft:\n            if not stek or stek.pop() != juft[c]:\n                return False\n    return not stek\n\nprint(qavslar_togrimi("{[()]}"))  # True\nprint(qavslar_togrimi("([)]"))    # False',
  q: [
   ['Stek tamoyili?', ['FIFO','LIFO','Tasodifiy','Saralangan'], 1, 'Last In, First Out.'],
   ['Navbat uchun Python’dagi qulay tuzilma?', ['deque','set','tuple','str'], 0, 'collections.deque.'],
   ['Ctrl+Z qaysi tuzilmaga o‘xshaydi?', ['Navbat','Stek','Graf','Hash'], 1, 'Oxirgi amal birinchi bekor qilinadi.']] },
{ task:'Faktorial va Fibonachchini rekursiya bilan yozing, chegarasini sinab ko‘ring.', v: [
  ['Rekursiya — o‘zini chaqiruvchi funksiya', 'Rekursiv funksiya masalani o‘zining kichikroq nusxasiga bo‘ladi va o‘zini chaqiradi.'],
  ['Asosiy holat', 'Har bir rekursiyada to‘xtash sharti bo‘lishi shart. Aks holda funksiya cheksiz chaqiriladi va xato beradi.', 'def faktorial(n):\n    if n <= 1:\n        return 1\n    return n * faktorial(n - 1)'],
  ['Chaqiruv steki', 'Har bir chaqiruv stekka qo‘shiladi va javob qaytgach olib tashlanadi. Juda chuqur rekursiya stekni to‘ldiradi.'],
  ['Memoizatsiya', 'Fibonachchi kabi masalalarda bir xil hisob qayta-qayta takrorlanadi. Natijani eslab qolsak, tezlik keskin oshadi.', 'from functools import lru_cache']],
  x: 'Rekursiyaning ikki qismi: **asosiy holat** (to‘xtash) va **rekursiv qadam** (kichikroq masalaga chaqiriq).\n\nOddiy Fibonachchi `fib(n) = fib(n-1) + fib(n-2)` — O(2ⁿ)! `@lru_cache` bilan u O(n) ga tushadi. Bu **dinamik dasturlash** ning boshlang‘ich g‘oyasi.\n\nPython’da rekursiya chuqurligi chegarasi ~1000. Juda chuqur masalalarda siklga aylantirish yaxshiroq.',
  lang: 'python',
  code: 'from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(90))  # memoizatsiya bilan bir zumda\n\ndef teskari(s):\n    return s if len(s) <= 1 else teskari(s[1:]) + s[0]\nprint(teskari("orbita"))',
  q: [
   ['Rekursiyada majburiy narsa?', ['Asosiy holat (to‘xtash sharti)','Global o‘zgaruvchi','Sikl','Fayl'], 0, 'Aks holda cheksiz bo‘ladi.'],
   ['faktorial(4) = ?', ['4','10','24','16'], 2, '4·3·2·1.'],
   ['Takroriy hisoblarni eslab qolish?', ['Memoizatsiya','Rekursiya','Indeks','Saralash'], 0, 'lru_cache.']] },
{ task:'Matndagi so‘zlar sonini lug‘at (hash) yordamida sanang.', v: [
  ['Hash-jadval — tezkor qidiruv', 'Hash-jadval kalitni maxsus funksiya bilan manzilga aylantiradi va qiymatni O(1) vaqtda topadi.'],
  ['Python lug‘ati', 'Python’dagi dict va set — hash-jadval. Kalit bo‘yicha qidirish ro‘yxatdagidan ming marta tez bo‘lishi mumkin.', 'telefon = {"Ali": "+99890...", "Malika": "+99893..."}'],
  ['Klassik masala: Ikki son yig‘indisi', 'Ro‘yxatdan yig‘indisi berilgan songa teng ikki sonni topish. Ikki sikl bilan O(n²), lug‘at bilan O(n).'],
  ['Sanash', 'Counter so‘zlar yoki elementlarni bir satrda sanaydi — matn tahlilida juda foydali.', 'from collections import Counter\nCounter("olma anor olma".split())']],
  x: 'Hash-jadval o‘rtacha holatda qo‘shish, o‘chirish va qidirishni **O(1)** da bajaradi. Kalitlar o‘zgarmas (hashable) bo‘lishi kerak: son, satr, kortej.\n\n`x in royxat` — O(n), `x in toplam` (set) — O(1). Ko‘p marta tekshirish kerak bo‘lsa, ro‘yxatni `set` ga aylantiring.\n\nAlgoritmik fikrlashning oltin qoidasi: “xotira evaziga tezlik” — qo‘shimcha lug‘at saqlab, vaqtni keskin qisqartirish.',
  lang: 'python',
  code: 'def ikki_son(sonlar, maqsad):\n    korilgan = {}\n    for i, x in enumerate(sonlar):\n        kerak = maqsad - x\n        if kerak in korilgan:\n            return korilgan[kerak], i\n        korilgan[x] = i\n    return None\n\nprint(ikki_son([2, 7, 11, 15], 9))  # (0, 1)',
  q: [
   ['Lug‘atda kalit bo‘yicha qidirish (o‘rtacha)?', ['O(1)','O(n)','O(n²)','O(log n)'], 0, 'Hash — doimiy vaqt.'],
   ['x in set murakkabligi?', ['O(1)','O(n)','O(n log n)','O(n²)'], 0, 'set ham hash-jadval.'],
   ['Elementlarni sanashning qulay usuli?', ['Counter','deque','heapq','bisect'], 0, 'collections.Counter.']] }
],
exam: [
 ['Algoritm nima?', ['Masalani yechishning aniq qadamlari','Kompyuter qismi','Dasturlash tili','Virus'], 0],
 ['Ikkilik qidiruv sharti?', ['Saralangan ma’lumot','Bo‘sh ro‘yxat','Faqat son','Rekursiya'], 0],
 ['O(log n) misoli?', ['Ikkilik qidiruv','Ikki ichma-ich sikl','Bitta sikl','Barcha juftlar'], 0],
 ['Merge sort murakkabligi?', ['O(n log n)','O(n²)','O(n)','O(1)'], 0],
 ['Stek tamoyili?', ['LIFO','FIFO','LILO','Tasodifiy'], 0],
 ['Navbat tamoyili?', ['FIFO','LIFO','Saralangan','Teskari'], 0],
 ['Rekursiyada to‘xtash sharti?', ['Asosiy holat','Parametr','Import','Sikl'], 0],
 ['Lug‘atda qidirish?', ['O(1)','O(n)','O(n²)','O(2ⁿ)'], 0],
 ['Oddiy rekursiv Fibonachchi murakkabligi?', ['O(2ⁿ)','O(n)','O(1)','O(log n)'], 0],
 ['“Xotira evaziga tezlik” misoli?', ['Qo‘shimcha lug‘at saqlash','Kodni o‘chirish','Kompyuterni almashtirish','Sikl qo‘shish'], 0]
]
};
