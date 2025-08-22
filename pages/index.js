import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  // ==== MAHSULOTLAR ====
const products = [
  {id:1,  title:"Tort Shokoladli",       price:160000, img:"public/images/namunarasm1.jpg"},
  {id:2,  title:"Tort Mevali",           price:155000, img:"public/images/namunarasm2.jpg"},
  {id:3,  title:"Tort Vanilli",          price:150000, img:"public/images/namunarasm3.jpg"},
  {id:4,  title:"Tort Karamel",          price:165000, img:"public/images/namunarasm4.jpg"},
  {id:5,  title:"Tort Qandli",           price:158000, img:"public/images/namunarasm5.jpg"},
  {id:6,  title:"Tort Yalpizli",         price:162000, img:"public/images/namunarasm6.jpg"},
  {id:7,  title:"Tort Qulupnayli",       price:157000, img:"public/images/namunarasm7.jpg"},
  {id:8,  title:"Tort Bananli",          price:154000, img:"public/images/namunarasm8.jpg"},
  {id:9,  title:"Tort Apelsinli",        price:159000, img:"public/images/namunarasm9.jpg"},
  {id:10, title:"Tort Anorli",           price:161000, img:"public/images/namunarasm10.jpg"},
  {id:11, title:"Tort Shokolad-Mevali",  price:165000, img:"public/images/namunarasm11.jpg"},
  {id:12, title:"Tort Kremli",           price:152000, img:"public/images/namunarasm12.jpg"},
  {id:13, title:"Tort Kokosli",          price:160000, img:"public/images/namunarasm13.jpg"},
  {id:14, title:"Tort Qovunli",          price:155000, img:"public/images/namunarasm14.jpg"},
  {id:15, title:"Tort Olmali",           price:158000, img:"public/images/namunarasm15.jpg"},
  {id:16, title:"Tort Shokolad-Karamel", price:167000, img:"public/images/namunarasm16.jpg"},
  {id:17, title:"Tort Vanil-Krem",       price:153000, img:"public/images/namunarasm17.jpg"},
  {id:18, title:"Tort Mevali-Yalpiz",    price:162000, img:"public/images/namunarasm18.jpg"},
  {id:19, title:"Tort Qulupnay-Krem",    price:156000, img:"public/images/namunarasm19.jpg"},
  {id:20, title:"Tort Banan-Shokolad",   price:160000, img:"public/images/namunarasm20.jpg"},
  {id:21, title:"Tort Apelsin-Krem",     price:158000, img:"public/images/namunarasm21.jpg"},
  {id:22, title:"Tort Anor-Kokos",       price:164000, img:"public/images/namunarasm22.jpg"},
  {id:23, title:"Tort Shokolad-Vanil",   price:163000, img:"public/images/namunarasm23.jpg"},
  {id:24, title:"Tort Karamel-Meva",     price:157000, img:"public/images/namunarasm24.jpg"},
  {id:25, title:"Tort Maxsus",           price:170000, img:"public/images/namunarasm25.jpg"}
];

  const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const proceedOrder = async () => {
    if(!selectedProduct) return alert("Mahsulot tanlanmadi!");
    if(!fullName || !phone) return alert("Ism va telefon majburiy!");

    const payload = {
      fullName, phone, username, address,
      product: `${selectedProduct.title} — ${fmt(selectedProduct.price)} so'm`
    };

    try {
      // ✅ Netlify Functions uchun yo‘nalish
      const resp = await fetch("/.netlify/functions/sendOrder", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });

      const data = await resp.json();

      if(data.ok) {
        alert("Buyurtmangiz qabul qilindi!");
        setModalOpen(false);
        setFullName(""); setPhone(""); setUsername(""); setAddress("");
      } else alert("Xatolik: " + data.msg);
    } catch(err) {
      alert("Server xatoligi: " + err.message);
    }
  };

  return (
    <div style={{padding:20, fontFamily:"sans-serif"}}>
      <h1>Universal Tortlar</h1>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16}}>
        {products.map(p => (
          <div key={p.id} style={{border:"1px solid #ccc", borderRadius:8, padding:10}}>
            <img src={p.img} alt={p.title} style={{width:"100%"}} />
            <h3>{p.title}</h3>
            <p>{fmt(p.price)} so'm</p>
            <button onClick={()=>{ setSelectedProduct(p); setModalOpen(true); }}>Zakaz qilish</button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center"
        }}>
          <div style={{background:"#fff", padding:20, borderRadius:8, width:"100%", maxWidth:400}}>
            <h3>Zakaz: {selectedProduct.title}</h3>
            <input placeholder="Ism" value={fullName} onChange={e=>setFullName(e.target.value)} style={{width:"100%", marginBottom:8, padding:6}}/>
            <input placeholder="Telefon" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:"100%", marginBottom:8, padding:6}}/>
            <input placeholder="Telegram username" value={username} onChange={e=>setUsername(e.target.value)} style={{width:"100%", marginBottom:8, padding:6}}/>
            <input placeholder="Manzil" value={address} onChange={e=>setAddress(e.target.value)} style={{width:"100%", marginBottom:8, padding:6}}/>
            <button onClick={proceedOrder} style={{marginRight:8}}>Davom etish</button>
            <button onClick={()=>setModalOpen(false)}>Bekor qilish</button>
          </div>
        </div>
      )}
    </div>
  );
}
