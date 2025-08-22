import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const products = [
    {id:1,  title:"Tort Shokoladli", price:160000, img:"/images/namunarasm1.jpg"},
    {id:2,  title:"Tort Mevali", price:155000, img:"/images/namunarasm2.jpg"},
    // ... qolgan 23 ta mahsulot
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
      const resp = await fetch("/api/sendOrder", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if(data.ok) {
        alert("Buyurtmangiz qabul qilindi!");
        setModalOpen(false);
      } else alert("Xatolik: " + data.msg);
    } catch(err) {
      alert("Server xatoligi: " + err.message);
    }
  };

  return (
    <div>
      <h1>Universal Tortlar</h1>
      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card">
            <img src={p.img} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{fmt(p.price)} so'm</p>
            <button onClick={()=>{ setSelectedProduct(p); setModalOpen(true); }}>Zakaz qilish</button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modalBack">
          <div className="modal">
            <h3>Zakaz: {selectedProduct.title}</h3>
            <input placeholder="Ism" value={fullName} onChange={e=>setFullName(e.target.value)} />
            <input placeholder="Telefon" value={phone} onChange={e=>setPhone(e.target.value)} />
            <input placeholder="Telegram username" value={username} onChange={e=>setUsername(e.target.value)} />
            <input placeholder="Manzil" value={address} onChange={e=>setAddress(e.target.value)} />
            <button onClick={proceedOrder}>Davom etish</button>
            <button onClick={()=>setModalOpen(false)}>Bekor qilish</button>
          </div>
        </div>
      )}
    </div>
  );
}
