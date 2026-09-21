# Navro'z Orbitasi — portfolio sayt

🌐 **Jonli sayt:** https://navruz-orbit.vercel.app

Quyosh tizimi bo'ylab sayohat qiluvchi portfolio: Yer → Mars → Asteroidlar kamari → Yupiter → Saturn → Neptun → Geliopauza.

## VS Code'da ochish
1. Papkani VS Code'da oching: **File → Open Folder… → navruz-orbit**
2. "Live Server" kengaytmasini o'rnating (Extensions → *Live Server*, Ritwick Dey).
3. `index.html` ustida o'ng tugma → **Open with Live Server**.
   (Yoki shunchaki `index.html` ni brauzerda ikki marta bosib oching.)

## Fayllar
| Fayl | Nima bor |
|---|---|
| `index.html` | Sahifa tuzilishi (barcha bo'limlar) |
| `style.css` | Dizayn, animatsiyalar, telefon/planshet/PC moslashuvi |
| `data.js` | **Barcha matnlar (UZ/EN)**, loyihalar, ko'nikmalar, tamoyillar |
| `space.js` | Kosmik fon: yulduzlar, sayyoralar, asteroidlar, kometa, warp |
| `app.js` | Til almashtirish, slayder, oynalar, chat, "Yerga qaytish" sakrashi, forma |
| `api/signal.js` | **"Signal yuborish" → Telegram bot** (Vercel serverless funksiya) |

## Tez-tez kerak bo'ladigan o'zgarishlar
- **Matnni o'zgartirish** → `data.js` ichidagi `NV.DICT` (uz va en).
- **Yangi loyiha qo'shish** → `data.js` → `NV.PROJECTS` ga yangi obyekt (mavjudidan nusxa oling).
- **Haqiqiy AI ulash** → `app.js` → `askAI()` funksiyasi. Ichida namuna `fetch('/api/chat')` bor.
  ⚠️ OpenAI API kalitini hech qachon frontend fayllarga yozmang — faqat serverda (backend) saqlang.
- **Email** → `app.js` dagi `MAIL` va `index.html` dagi `bigmail`.

## "Signal yuborish" ni Telegram botga ulash

Forma xabarni `/api/signal` ga yuboradi → server uni Telegram botingiz orqali **sizning Telegram'ingizga** yetkazadi.
Bot tokeni faqat serverda turadi — saytni ochgan hech kim uni ko'ra olmaydi.

### 1. Bot yarating (2 daqiqa)
1. Telegram'da **@BotFather** ni oching → `/newbot` yozing.
2. Botga nom va username bering (masalan `navruz_signal_bot`).
3. BotFather bergan **token**ni saqlang (`123456789:AA...`). Uni hech kimga bermang va kodga yozmang.

### 2. Chat ID'ingizni oling
1. Yangi botingizni oching va **Start** (`/start`) bosing — bu majburiy, aks holda bot sizga yoza olmaydi.
2. Brauzerda oching: `https://api.telegram.org/bot<TOKEN>/getUpdates` (`<TOKEN>` o'rniga tokeningiz).
3. Javobdagi `"chat":{"id":123456789,...}` — shu raqam sizning **TELEGRAM_CHAT_ID**.

### 3. Vercel sozlamalari
**Settings → Environment Variables** ga qo'shing:
- `TELEGRAM_BOT_TOKEN` = tokeningiz
- `TELEGRAM_CHAT_ID` = chat ID

Keyin **Deployments → Redeploy**.

### Himoya
- Bitta IP'dan 10 daqiqada ko'pi bilan 5 ta signal (spamga qarshi).
- Odam ko'rmaydigan "tuzoq" maydon — botlar to'ldirsa, xabar jim tashlab yuboriladi.
- Barcha maydonlar serverda qayta tekshiriladi, matn HTML'dan tozalanadi.
- Server ishlamasa, forma avtomatik zaxiraga o'tadi: xabar nusxalanadi + "Email'da ochish" tugmasi.

## 🎓 Orbita Akademiya (kurslar)
- Darslar `plus.js` → `TRACKS` ichida. Har bir dars: `h` (sarlavha), `p` (tushuntirish), `tip`, `code`, `out` (natija), `q` (savol), `o` (variantlar), `a` (to'g'ri javob raqami).
- `plus.css` — Akademiya, kurs pleyeri va 3-2-1 uchish introsi dizayni.
- O'quvchi progressi brauzerda (`localStorage`, kalit `nv-ac`) saqlanadi.

## 🔗 Loyiha havolalari
- `data.js` → `NV.PROJECTS` → har bir loyihada `link:'https://...'`. Havola bo'lmasa — "Tez orada" chiqadi.
- `link:'#demo'` — sahifa ichidagi bo'limga olib boradi.

## 🪐 NOVA: 3D Quyosh tizimi
- `nova.js` / `nova.css` — Three.js bilan haqiqiy 3D Quyosh tizimi (13 sayyora = 13 loyiha), so'zma-so'z ochiladigan sarlavhalar, sektor skaneri, kartalardagi yorug'lik.
- WebGL bo'lmasa yoki "kam harakat" rejimi yoqilgan bo'lsa, avvalgi 2D orbita ko'rinadi.

## 🤖 Telegram bot (`api/bot.js`)
- /start — menyu: sayt, akademiya, loyihalar, o'yinlar, kurslar.
- Mehmon botga yozsa — xabar Navro'zga keladi; Navro'z unga **Reply** qilsa — javob mehmonga boradi.
- Kerak: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TELEGRAM_WEBHOOK_SECRET` (Vercel → Environment Variables).
- Webhookni ulash (bir marta): `https://SAYT/api/bot?setup=<TELEGRAM_WEBHOOK_SECRET>`
