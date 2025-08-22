const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());            // frontend uchun
app.use(express.json());    // JSON body parser

// Telegram sozlamalari
const BOT_TOKEN = '8171377035:AAFz5AaUT_vNgM4DT2B1nv5mA_6cuxI0IQc';
const CHAT_ID = '7938269088';

// Buyurtma yuborish endpointi
app.post('/sendOrder', async (req, res) => {
  const { fullName, phone, username, address, product } = req.body;

  if(!fullName || !phone || !product){
    return res.json({ ok: false, msg: "Ism, telefon va mahsulot kerak!" });
  }

  const text = `
📦 Yangi buyurtma:
Ism: ${fullName}
Telefon: ${phone}
Username: ${username || '-'}
Manzil: ${address || '-'}
Mahsulot: ${product}
  `;

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await axios.post(url, { chat_id: CHAT_ID, text });
    res.json({ ok: true });
  } catch (err) {
    console.error(err.message);
    res.json({ ok: false, msg: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
