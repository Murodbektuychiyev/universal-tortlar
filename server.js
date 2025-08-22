const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Telegram sozlamalari
const BOT_TOKEN = "8171377035:AAFz5AaUT_vNgM4DT2B1nv5mA_6cuxI0IQc";
const CHAT_ID   = "7938269088";

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Frontend HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Buyurtma route
app.post("/api/sendOrder", async (req, res) => {
  const { fullName, phone, username, address, product } = req.body;

  if (!fullName || !phone || !product) {
    return res.status(400).json({ ok: false, msg: "Ism, telefon va mahsulot kerak!" });
  }

  const text = `
📦 Yangi buyurtma:
Ism: ${fullName}
Telefon: ${phone}
Username: ${username || "-"}
Manzil: ${address || "-"}
Mahsulot: ${product}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ ok: false, msg: err.message });
  }
});

// Serverni ishga tushurish
app.listen(PORT, () => {
  console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
