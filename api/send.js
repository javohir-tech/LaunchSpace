export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  const token  = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  const text = `🚀 *LaunchSpace — Yangi xabar!*\n\n👤 *Ism:* ${name}\n📧 *Email:* ${email}\n\n💬 *Xabar:*\n${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
    });

    const data = await response.json();

    if (data.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: data.description });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
}