const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // frontend

const BOT_TOKEN = '8171377035:AAFz5AaUT_vNgM4DT2B1nv5mA_6cuxI0IQc';
const CHAT_ID = '7938269088';

app.post('/sendOrder', async (req, res) => {
  const { fullName, phone, username, address, product } = req.body;
  if (!fullName || !phone || !product)
    return res.json({ ok: false, msg: "Ism, telefon va mahsulot kerak!" });

  const text = `
📦 Yangi buyurtma:
Ism: ${fullName}
Telefon: ${phone}
Username: ${username || '-'}
Manzil: ${address || '-'}
Mahsulot: ${product}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, { chat_id: CHAT_ID, text });
    res.json({ ok: true });
  } catch (err) {
    console.error(err.message);
    res.json({ ok: false, msg: err.message });
  }
});

// Fallback — barcha boshqa requestlarni index.html ga yuboradi
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
