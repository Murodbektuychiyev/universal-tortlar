import { useState } from "react";

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

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const sendOrder = async () => {
    if(!fullName || !phone || !selectedProduct) return alert("Ism, telefon va mahsulot kerak!");

    const payload = {
      fullName, phone, username, address,
      product: `${selectedProduct.title} — ${selectedProduct.price} so'm`
    };

    try {
      const resp = await fetch("/api/sendOrder", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if(data.ok){
        alert("Buyurtmangiz qabul qilindi!");
      } else {
        alert("Xatolik: " + data.msg);
      }
    } catch(err) {
      alert("Server xatosi: " + err.message);
    }
  };

  return (
    <div>
      <h1>Universal Tortlar</h1>
      <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
        {products.map(p => (
          <div key={p.id} style={{border:"1px solid #ccc", padding:12}}>
            <img src={p.img} alt={p.title} width={200} />
            <h3>{p.title}</h3>
            <p>{p.price} so'm</p>
            <button onClick={()=>setSelectedProduct(p)}>Zakaz qilish</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div style={{ marginTop:20, border:"1px solid #000", padding:12 }}>
          <h2>Zakaz: {selectedProduct.title}</h2>
          <input placeholder="Ism" value={fullName} onChange={e=>setFullName(e.target.value)} />
          <input placeholder="Telefon" value={phone} onChange={e=>setPhone(e.target.value)} />
          <input placeholder="@username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input placeholder="Manzil" value={address} onChange={e=>setAddress(e.target.value)} />
          <button onClick={sendOrder}>Yuborish</button>
        </div>
      )}
    </div>
  );
}
