module.exports = {
lessons: [
{ task:'Brauzer devtools’da Network bo‘limini oching va bitta saytga ketayotgan so‘rovlarni ko‘ring.', v: [
  ['Backend — saytning ko‘rinmas qismi', 'Foydalanuvchi ko‘radigan qism frontend. Ma’lumotni saqlash, to‘lovni tekshirish va hisob-kitob esa serverda — backendda bajariladi.'],
  ['HTTP — so‘rov va javob', 'Brauzer serverga so‘rov yuboradi: metod, manzil va ma’lumot. Server javob qaytaradi: status kodi va natija.'],
  ['Metodlar', 'GET — olish, POST — yaratish, PUT yoki PATCH — yangilash, DELETE — o‘chirish.'],
  ['Status kodlari', '200 — muvaffaqiyat, 201 — yaratildi, 400 — noto‘g‘ri so‘rov, 401 — ruxsat yo‘q, 404 — topilmadi, 500 — server xatosi.']],
  x: '**REST API** — resurslarga URL orqali murojaat qilish uslubi: `GET /kurslar`, `GET /kurslar/python`, `POST /tolovlar`.\n\nMa’lumot odatda **JSON** formatida almashiladi: `{"id": "python", "narx": 0}`.\n\nBackend nima uchun kerak? Maxfiy narsalar (API kalitlari, narxlar, parollar) brauzerda saqlanmaydi — foydalanuvchi ularni o‘zgartira oladi. Shu akademiyada to‘lov summasi ham faqat serverda hisoblanadi.',
  lang: 'bash',
  code: '# Terminalda HTTP so‘rov yuborish\ncurl https://navruz-orbit.vercel.app/api/catalog\n\n# Javob (JSON):\n# {"courses": [{"id": "python", "price": 0, ...}]}',
  q: [
   ['Ma’lumot yaratish uchun HTTP metodi?', ['GET','POST','DELETE','HEAD'], 1, 'POST — yaratish.'],
   ['404 status nimani bildiradi?', ['Muvaffaqiyat','Topilmadi','Server xatosi','Ruxsat yo‘q'], 1, 'Not Found.'],
   ['Narxni qayerda hisoblash xavfsiz?', ['Serverda','Brauzerda','URL’da','Cookie’da'], 0, 'Brauzerni foydalanuvchi o‘zgartira oladi.']] },
{ task:'FastAPI o‘rnatib, / manzilida “Salom” qaytaruvchi API yozing va /docs’ni oching.', v: [
  ['FastAPI — tez va zamonaviy', 'FastAPI — Python’ning eng tez rivojlanayotgan backend freymvorki. Hujjatlarni avtomatik yaratadi va turlarni tekshiradi.'],
  ['O‘rnatish', 'fastapi va uvicorn serveri o‘rnatiladi.', 'pip install fastapi uvicorn'],
  ['Birinchi endpoint', 'Dekorator yo‘lni va metodni belgilaydi, funksiya esa javob qaytaradi. Lug‘at avtomatik JSON bo‘ladi.', '@app.get("/")\ndef bosh():\n    return {"xabar": "Salom!"}'],
  ['Avtomatik hujjat', 'Serverni ishga tushirib, /docs manzilini oching — barcha endpointlar va ularni sinash tugmalari tayyor.']],
  x: 'Ishga tushirish: `uvicorn main:app --reload` — `main.py` fayldagi `app` obyekti; `--reload` kod o‘zgarsa serverni qayta yuklaydi.\n\n`/docs` (Swagger UI) va `/redoc` — FastAPI’ning eng yoqimli imkoniyati: frontend dasturchi bilan kelishish osonlashadi.\n\nFastAPI `async def` ni ham qo‘llaydi — ko‘p so‘rovni bir vaqtda qayta ishlash uchun.',
  lang: 'python',
  code: 'from fastapi import FastAPI\n\napp = FastAPI(title="Orbita API")\n\n@app.get("/")\ndef bosh():\n    return {"xabar": "Orbita API ishlayapti 🚀"}\n\n@app.get("/salom/{ism}")\ndef salom(ism: str):\n    return {"xabar": f"Salom, {ism}!"}\n\n# ishga tushirish: uvicorn main:app --reload',
  q: [
   ['FastAPI serverini ishga tushirish?', ['uvicorn main:app','python fastapi','npm start','run app'], 0, 'uvicorn.'],
   ['Avtomatik hujjat manzili?', ['/docs','/help','/api-info','/readme'], 0, '/docs — Swagger.'],
   ['Lug‘at qaytarilsa, klient nimani oladi?', ['JSON','HTML','Rasm','Hech narsa'], 0, 'Avtomatik JSON.']] },
{ task:'/kurslar/{id} va ?limit= parametrlarini qabul qiluvchi endpoint yozing.', v: [
  ['Path parametr', 'URL ichidagi o‘zgaruvchi qism: /kurslar/python. Figurali qavsda yoziladi.', '@app.get("/kurslar/{kurs_id}")\ndef kurs(kurs_id: str): ...'],
  ['Query parametr', 'Savol belgisidan keyingi qism: /kurslar?daraja=2. Funksiya parametri sifatida yoziladi.', '@app.get("/kurslar")\ndef royxat(daraja: int | None = None): ...'],
  ['Tur tekshiruvi', 'Parametr turini int deb yozsangiz, FastAPI matn kelganda avtomatik 422 xato qaytaradi.'],
  ['Xato qaytarish', 'Topilmasa HTTPException bilan 404 qaytaramiz.', 'raise HTTPException(404, "Kurs topilmadi")']],
  x: 'Qoida: **path** — resursni aniqlash (`/kurslar/python`), **query** — filtr va sozlama (`?daraja=2&sort=narx`).\n\nIxtiyoriy parametr: `= None` standart qiymati bilan. Standart qiymatli parametr: `limit: int = 10`.\n\n422 Unprocessable Entity — FastAPI kiritma validatsiyasi xatosi; javobda qaysi maydon noto‘g‘ri ekani yoziladi.',
  lang: 'python',
  code: 'from fastapi import FastAPI, HTTPException\n\napp = FastAPI()\nKURSLAR = [\n    {"id": "python", "nom": "Python asoslari", "daraja": 1, "narx": 0},\n    {"id": "ml", "nom": "Machine Learning", "daraja": 3, "narx": 149000},\n]\n\n@app.get("/kurslar")\ndef royxat(daraja: int | None = None, limit: int = 10):\n    natija = [k for k in KURSLAR if daraja is None or k["daraja"] == daraja]\n    return natija[:limit]\n\n@app.get("/kurslar/{kurs_id}")\ndef bitta(kurs_id: str):\n    for k in KURSLAR:\n        if k["id"] == kurs_id:\n            return k\n    raise HTTPException(status_code=404, detail="Kurs topilmadi")',
  q: [
   ['/kurslar?daraja=2 dagi daraja?', ['Path parametr','Query parametr','Header','Body'], 1, 'Savol belgisidan keyin — query.'],
   ['Topilmadi xatosini qaytarish?', ['raise HTTPException(404)','return 404','print("404")','exit(404)'], 0, 'HTTPException.'],
   ['Noto‘g‘ri tur kelsa FastAPI qaytaradi?', ['200','422','301','500'], 1, 'Validatsiya xatosi — 422.']] },
{ task:'Pydantic model qiling: ism (majburiy), email va yosh (18 dan katta) tekshirilsin.', v: [
  ['Pydantic — ma’lumot shakli', 'POST so‘rovda keladigan JSON’ni Pydantic modeli tasvirlaydi va avtomatik tekshiradi.', 'class Royxat(BaseModel):\n    ism: str\n    telefon: str'],
  ['Validatsiya', 'Maydon cheklovlari: uzunlik, raqam oralig‘i, email formati. Noto‘g‘ri bo‘lsa, so‘rov serverga yetib bormaydi.'],
  ['Javob modeli', 'response_model qaytariladigan ma’lumot shaklini belgilaydi — ortiqcha maydonlar, masalan parol, chiqib ketmaydi.'],
  ['Xavfsizlik', 'Foydalanuvchidan kelgan hech bir ma’lumotga ishonmang — har birini tekshiring.']],
  x: '`Field()` bilan cheklov: `ism: str = Field(min_length=2, max_length=60)`, `ball: int = Field(ge=0, le=100)`.\n\n`EmailStr` email formatini tekshiradi (`pip install pydantic[email]`).\n\nKiritmani **server tomonda** tekshirish shart — brauzerdagi tekshiruvni chetlab o‘tish oson (to‘g‘ridan-to‘g‘ri `curl` bilan so‘rov yuborish mumkin).',
  lang: 'python',
  code: 'from pydantic import BaseModel, Field\n\nclass OquvchiKirish(BaseModel):\n    ism: str = Field(min_length=2, max_length=60)\n    telefon: str = Field(pattern=r"^\\+998\\d{9}$")\n\nclass OquvchiChiqish(BaseModel):\n    id: int\n    ism: str\n\n@app.post("/oquvchilar", response_model=OquvchiChiqish, status_code=201)\ndef yaratish(o: OquvchiKirish):\n    yangi_id = 1  # bazaga yozamiz\n    return {"id": yangi_id, "ism": o.ism, "telefon": o.telefon}',
  q: [
   ['Pydantic nima qiladi?', ['Kiruvchi ma’lumotni tasvirlab tekshiradi','Rasm chizadi','Serverni ishga tushiradi','CSS yozadi'], 0, 'Validatsiya.'],
   ['Qaytariladigan shaklni belgilash?', ['response_model','return_type','output_schema','view'], 0, 'response_model.'],
   ['Brauzerdagi tekshiruv yetarlimi?', ['Yo‘q, serverda ham tekshirish kerak','Ha, yetarli','Faqat CSS kerak','Tekshiruv keraksiz'], 0, 'Server tekshiruvi majburiy.']] },
{ task:'Kurslar ro‘yxatini bazaga (yoki JSON faylga) yozib, CRUD 4 ta endpointini yozing.', v: [
  ['CRUD', 'Deyarli har bir backend to‘rt amalni bajaradi: Create, Read, Update, Delete — yaratish, o‘qish, yangilash, o‘chirish.'],
  ['Bazaga ulanish', 'SQLAlchemy yoki oddiy sqlite3 bilan ulanamiz. Har so‘rovda sessiya ochib yopamiz.'],
  ['Endpointlar xaritasi', 'POST /kurslar — yaratish, GET /kurslar — ro‘yxat, PATCH /kurslar/{id} — yangilash, DELETE /kurslar/{id} — o‘chirish.'],
  ['Parametrli so‘rovlar', 'SQL kursidagi qoidani eslang: foydalanuvchi ma’lumotini so‘rovga qo‘shishda faqat parametrlar.']],
  x: 'Katta loyihalarda **ORM** (SQLAlchemy, Tortoise) ishlatiladi: jadvallar Python klasslari, so‘rovlar metodlar ko‘rinishida.\n\nMigratsiyalar (Alembic) baza tuzilmasini versiyalab boradi — Git’ning bazadagi hamkasbi.\n\nSahifalash (pagination): katta ro‘yxatni `?limit=20&offset=40` bilan bo‘lib bering — server va foydalanuvchi vaqtini tejaydi.',
  lang: 'python',
  code: 'import sqlite3\nfrom fastapi import FastAPI, HTTPException\n\napp = FastAPI()\ndef db():\n    c = sqlite3.connect("akademiya.db")\n    c.row_factory = sqlite3.Row\n    return c\n\n@app.get("/talabalar")\ndef royxat(limit: int = 20, offset: int = 0):\n    with db() as c:\n        rows = c.execute("SELECT id, ism FROM talabalar LIMIT ? OFFSET ?", (limit, offset))\n        return [dict(r) for r in rows]\n\n@app.delete("/talabalar/{tid}", status_code=204)\ndef ochirish(tid: int):\n    with db() as c:\n        if c.execute("DELETE FROM talabalar WHERE id = ?", (tid,)).rowcount == 0:\n            raise HTTPException(404, "Topilmadi")',
  q: [
   ['CRUD’dagi U harfi?', ['Upload','Update','Undo','Unit'], 1, 'Update — yangilash.'],
   ['Katta ro‘yxatni bo‘lib berish?', ['Pagination','Compression','Cache','Merge'], 0, 'limit/offset.'],
   ['Jadvallarni Python klassi sifatida ishlatish?', ['ORM','CSS','DOM','CDN'], 0, 'Object-Relational Mapping.']] },
{ task:'API’ni bepul hostingga joylang va havolani do‘stingizga yuboring.', v: [
  ['Kim so‘rov yubordi?', 'Autentifikatsiya foydalanuvchi kimligini tasdiqlaydi, avtorizatsiya esa unga nima ruxsat etilganini hal qiladi.'],
  ['Parollar', 'Parol hech qachon ochiq saqlanmaydi — faqat bcrypt kabi hash ko‘rinishida.'],
  ['Token', 'Kirgandan so‘ng server token beradi. Klient uni har so‘rovda Authorization sarlavhasida yuboradi.', 'Authorization: Bearer eyJhbGciOi...'],
  ['Joylash', 'Tayyor API’ni Render, Railway yoki VPS’ga joylaymiz. Kalitlar muhit o‘zgaruvchilarida, HTTPS majburiy.']],
  x: 'Xavfsizlik ro‘yxati: HTTPS, parollarni hash qilish, tokenlarning muddati, so‘rovlar tezligini cheklash (rate limit), CORS’ni to‘g‘ri sozlash, loglarda maxfiy ma’lumot yozmaslik.\n\nTo‘lov tizimlari (Payme, Click) backendingizga **callback** yuboradi — uning imzosini yoki kalitini albatta tekshiring, aks holda firibgar “to‘landi” deb soxta so‘rov yuboradi.\n\nShu akademiyaning backendi Vercel serverless funksiyalarida ishlaydi — xuddi shu tamoyillar asosida.',
  lang: 'python',
  code: 'import os, hmac\nfrom fastapi import Header, HTTPException\n\nMAXFIY = os.environ["WEBHOOK_SECRET"]\n\ndef tekshir(x_signature: str = Header(...)):\n    if not hmac.compare_digest(x_signature, MAXFIY):\n        raise HTTPException(401, "Ruxsat yo‘q")\n\n@app.post("/tolov-callback")\ndef callback(data: dict, x_signature: str = Header(...)):\n    tekshir(x_signature)\n    # ... buyurtmani "to‘landi" holatiga o‘tkazamiz\n    return {"ok": True}',
  q: [
   ['Parol qanday saqlanadi?', ['Hash ko‘rinishida','Ochiq matnda','Cookie’da','URL’da'], 0, 'bcrypt kabi hash.'],
   ['Token qaysi sarlavhada yuboriladi?', ['Authorization','Content-Type','Accept','Host'], 0, 'Authorization: Bearer ...'],
   ['To‘lov callbackida nima tekshiriladi?', ['Imzo yoki kalit','Rang','Shrift','Vaqt zonasi'], 0, 'Soxta so‘rovdan himoya.']] }
],
exam: [
 ['Backend nima?', ['Server tomondagi qism','Faqat dizayn','Brauzer','Shrift'], 0],
 ['Ma’lumot olish metodi?', ['GET','POST','DELETE','PUT'], 0],
 ['500 status kodi?', ['Server xatosi','Topilmadi','Yaratildi','OK'], 0],
 ['FastAPI hujjat manzili?', ['/docs','/manual','/api','/info'], 0],
 ['/kurslar/{id} dagi id?', ['Path parametr','Query','Body','Header'], 0],
 ['Kiritmani tekshirish kutubxonasi?', ['Pydantic','Pandas','Matplotlib','NumPy'], 0],
 ['CRUD’dagi D?', ['Delete','Download','Deploy','Debug'], 0],
 ['Parol saqlash?', ['Hash','Ochiq','Base64','Emoji'], 0],
 ['Token qayerda?', ['Authorization sarlavhasida','Rasm nomida','CSS’da','README’da'], 0],
 ['To‘lov callbackini nima uchun tekshiramiz?', ['Soxta so‘rovdan himoya uchun','Tezlik uchun','Dizayn uchun','Shunchaki'], 0]
]
};
