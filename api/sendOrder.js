import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, msg: 'Only POST allowed' });
  }

  const { fullName, phone, username, address, product } = req.body;
  if(!fullName || !phone || !product){
    return res.status(400).json({ ok: false, msg: "Ism, telefon va mahsulot kerak!" });
  }

  const BOT_TOKEN = '8171377035:AAFz5AaUT_vNgM4DT2B1nv5mA_6cuxI0IQc';
  const CHAT_ID = '7938269088';
  const text = `
📦 Yangi buyurtma:
Ism: ${fullName}
Telefon: ${phone}
Username: ${username || '-'}
Manzil: ${address || '-'}
Mahsulot: ${product}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text
    });
    res.status(200).json({ ok: true });
  } catch(err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
}
