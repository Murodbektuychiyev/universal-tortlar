const path = require('path');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Static fayllar
app.use(express.static(__dirname)); // index.html va boshqa fayllar
app.use('/images', express.static(path.join(__dirname, 'images'))); // images papka

// Telegram sozlamalari
const BOT_TOKEN = 'SIZNING_BOT_TOKEN';
const CHAT_ID = 'SIZNING_CHAT_ID';

// Buyurtma endpointi
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

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
