/* ─────────────── TELEGRAM CONFIG ─────────────── */
// config.js dan keladi — bu yerga yozmang!
const TG_BOT_TOKEN = ENV.TG_BOT_TOKEN;
const TG_CHAT_ID   = ENV.TG_CHAT_ID;
/* ──────────────────────────────────────────────── */

/* ── Scroll reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── Navbar scroll shadow ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Hamburger menu ── */
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ── Smooth scroll helper ── */
function scrollTo(sel) {
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Contact form → Telegram ── */
async function handleSubmit(e) {
  e.preventDefault();

  const btn    = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');
  const name   = document.getElementById('name').value.trim();
  const email  = document.getElementById('email').value.trim();
  const msg    = document.getElementById('message').value.trim();

  btn.textContent = 'Yuborilmoqda';
  btn.classList.add('loading-dots');
  btn.disabled = true;
  status.className = 'form-status';

  const text = `🚀 *LaunchSpace — Yangi xabar!*\n\n👤 *Ism:* ${name}\n📧 *Email:* ${email}\n\n💬 *Xabar:*\n${msg}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'Markdown' })
    });

    const data = await res.json();

    if (data.ok) {
      status.className = 'form-status success';
      status.textContent = '✅ Xabaringiz muvaffaqqiyatli yuborildi! Tez orada javob beramiz.';
      e.target.reset();
    } else {
      throw new Error(data.description || 'API xatosi');
    }
  } catch (err) {
    status.className = 'form-status error';
    status.textContent = '❌ Xatolik yuz berdi. Iltimos, to\'g\'ridan-to\'g\'ri email orqali murojaat qiling.';
    console.error('Telegram error:', err);
  } finally {
    btn.textContent = 'Yuborish →';
    btn.classList.remove('loading-dots');
    btn.disabled = false;
  }
}