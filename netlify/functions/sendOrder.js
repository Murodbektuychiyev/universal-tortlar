import fetch from "node-fetch";

export async function handler(event) {
  const data = JSON.parse(event.body);

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const message = `
Ism: ${data.fullName}
Telefon: ${data.phone}
Telegram: ${data.username || "-"}
Manzil: ${data.address || "-"}
Mahsulot: ${data.product}
  `;

  const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message })
  });

  const telegramData = await resp.json();

  if (telegramData.ok) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } else {
    return { statusCode: 500, body: JSON.stringify({ ok: false, msg: telegramData.description }) };
  }
}
