// ==== QO'SHIMCHA O'ZGARUVCHILAR ====
const CONTACT_PHONE = "+998 99 093 2621";
const BOT_USERNAME = "@Tort_Zakazlarim_Bot";

// ==== MAHSULOTLAR ====
const products = [
  {id:1,  title:"Tort Shokoladli",       price:160000, img:"/images/namunarasm1.jpg"},
  {id:2,  title:"Tort Mevali",           price:155000, img:"/images/namunarasm2.jpg"},
  {id:3,  title:"Tort Vanilli",          price:150000, img:"/images/namunarasm3.jpg"},
  {id:4,  title:"Tort Karamel",          price:165000, img:"/images/namunarasm4.jpg"},
  {id:5,  title:"Tort Qandli",           price:158000, img:"/images/namunarasm5.jpg"},
  {id:6,  title:"Tort Yalpizli",         price:162000, img:"/images/namunarasm6.jpg"},
  {id:7,  title:"Tort Qulupnayli",       price:157000, img:"/images/namunarasm7.jpg"},
  {id:8,  title:"Tort Bananli",          price:154000, img:"/images/namunarasm8.jpg"},
  {id:9,  title:"Tort Apelsinli",        price:159000, img:"/images/namunarasm9.jpg"},
  {id:10, title:"Tort Anorli",           price:161000, img:"/images/namunarasm10.jpg"},
  {id:11, title:"Tort Shokolad-Mevali",  price:165000, img:"/images/namunarasm11.jpg"},
  {id:12, title:"Tort Kremli",           price:152000, img:"/images/namunarasm12.jpg"},
  {id:13, title:"Tort Kokosli",          price:160000, img:"/images/namunarasm13.jpg"},
  {id:14, title:"Tort Qovunli",          price:155000, img:"/images/namunarasm14.jpg"},
  {id:15, title:"Tort Olmali",           price:158000, img:"/images/namunarasm15.jpg"},
  {id:16, title:"Tort Shokolad-Karamel", price:167000, img:"/images/namunarasm16.jpg"},
  {id:17, title:"Tort Vanil-Krem",       price:153000, img:"/images/namunarasm17.jpg"},
  {id:18, title:"Tort Mevali-Yalpiz",    price:162000, img:"/images/namunarasm18.jpg"},
  {id:19, title:"Tort Qulupnay-Krem",    price:156000, img:"/images/namunarasm19.jpg"},
  {id:20, title:"Tort Banan-Shokolad",   price:160000, img:"/images/namunarasm20.jpg"},
  {id:21, title:"Tort Apelsin-Krem",     price:158000, img:"/images/namunarasm21.jpg"},
  {id:22, title:"Tort Anor-Kokos",       price:164000, img:"/images/namunarasm22.jpg"},
  {id:23, title:"Tort Shokolad-Vanil",   price:163000, img:"/images/namunarasm23.jpg"},
  {id:24, title:"Tort Karamel-Meva",     price:157000, img:"/images/namunarasm24.jpg"},
  {id:25, title:"Tort Maxsus",           price:170000, img:"/images/namunarasm25.jpg"}
];

  const gridEl = document.getElementById('grid');
  products.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="thumb" src="${p.img}" alt="${p.title}" loading="lazy" />
      <div class="meta">
        <h3 class="title">${p.title}</h3>
        <div class="small">Mahalliy pishirilgan • Fresh</div>
        <div class="price">${fmt(p.price)} so'm</div>
      </div>
      <div class="actions">
        <button class="btn preview" data-preview="${p.id}">Ko'rib chiqish</button>
        <button class="btn order" data-order="${p.id}">Zakaz qilish</button>
      </div>
    `;
    gridEl.appendChild(card);
  });

  function fmt(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

  // ======= HEADER sozlash
  document.getElementById('contactPhone').textContent = CONTACT_PHONE;
  document.getElementById('year').textContent = new Date().getFullYear();

  // ======= MODAL
  const modalBack = document.getElementById('modalBack');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn  = document.getElementById('cancelBtn');
  const proceedBtn = document.getElementById('proceedBtn');
  const productPreview = document.getElementById('productPreview');
  let selectedProduct = null;

  function openModal(prod){
    selectedProduct = prod;
    productPreview.textContent = `${prod.title} — ${fmt(prod.price)} so'm`;
    modalBack.style.display = 'grid';
    document.getElementById('modalTitle').textContent = `Zakaz: ${prod.title}`;
  }

  function hideModal(){ modalBack.style.display = 'none'; }

  document.addEventListener('click', (e)=>{
    const t = e.target;
    if(t.matches('[data-preview]')){
      const id = +t.getAttribute('data-preview');
      const prod = products.find(x=>x.id===id);
      if(prod){ window.open(prod.img, '_blank'); }
    }
    if(t.matches('[data-order]')){
      const id = +t.getAttribute('data-order');
      const prod = products.find(x=>x.id===id);
      if(prod){ openModal(prod); }
    }
  });

  [closeModal, cancelBtn].forEach(btn=>btn.addEventListener('click', hideModal));
  modalBack.addEventListener('click', (e)=>{ if(e.target===modalBack) hideModal(); });

  // ======= Davom etish (Frontend → Telegram Bot API)
proceedBtn.addEventListener('click', async () => {
  if(!selectedProduct) return;

  const fullName = document.getElementById('fullName').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const username = document.getElementById('username').value.trim();
  const address  = document.getElementById('address').value.trim();

  if(!fullName || !phone){
    alert("Ism va telefon raqam majburiy!");
    return;
  }

  // 📌 Bu joyni o'zing to'ldirasan
  const BOT_TOKEN = "8171377035:AAFz5AaUT_vNgM4DT2B1nv5mA_6cuxI0IQc";
  const CHAT_ID   = "7938269088";

  const text = `
🆕 Yangi buyurtma!

👤 Ism: ${fullName}
📞 Telefon: ${phone}
💬 Telegram: ${username || "—"}
📍 Manzil: ${address || "—"}
🎂 Mahsulot: ${selectedProduct.title} — ${fmt(selectedProduct.price)} so'm
  `;

  try {
    const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML"
      })
    });

    const data = await resp.json();

    if(data.ok){
      alert("✅ Buyurtmangiz qabul qilindi! Tez orada siz bilan bog'lanamiz.");
      hideModal();
    } else {
      alert("❌ Xatolik: " + data.description);
    }
  } catch(err){
    alert("❌ Serverga chiqishda xato: " + err.message);
  }
});

  // ======= Mini-so'rov (interaktiv)
  const poll = {shoko:0, fruit:0, caramel:0, special:0};
  const pollOptions = document.getElementById('pollOptions');
  const pollResult  = document.getElementById('pollResult');
  pollOptions.addEventListener('click', (e)=>{
    if(e.target && e.target.dataset.poll){
      poll[e.target.dataset.poll]++;
      const total = Object.values(poll).reduce((a,b)=>a+b,0);
      const pc = k => (total? Math.round(poll[k]*100/total) : 0) + '%';
      pollResult.innerHTML =
        `Natijalar — 🍫 ${pc('shoko')} · 🍓 ${pc('fruit')} · 🍯 ${pc('caramel')} · 🎁 ${pc('special')}`;
    }
  });

  document.getElementById('openPoll').addEventListener('click', ()=>{
    window.scrollTo({top: document.querySelector('.hero').offsetTop, behavior:'smooth'});
  });

  const backToTop = document.getElementById("backToTop");
  const SHOW_AFTER = 200;
  window.addEventListener("scroll", () => {
    backToTop.style.display = (window.scrollY > SHOW_AFTER) ? "block" : "none";
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({top:0, behavior:"smooth"});
  });
