import React, {useMemo, useState} from "react";
import { createRoot } from "react-dom/client";
import { Gamepad2, Search, ShieldCheck, Rocket, Database, Sparkles } from "lucide-react";
import "./style.css";

const VERSION = "v0.0.8";
const games = [
  {name:"Resident Evil HD Remaster", status:"Devam Ediyor", tag:"Türkçe Altyazılı", episodes:6},
  {name:"Resident Evil 5", status:"Co-op", tag:"@x3pos", episodes:4},
  {name:"Dead Island 2", status:"Final", tag:"Co-op", episodes:6},
  {name:"Assassin's Creed Origins", status:"Planlandı", tag:"Türkçe Altyazılı", episodes:1},
  {name:"Silent Hill Homecoming", status:"Devam Ediyor", tag:"Korku", episodes:2},
  {name:"Icarus", status:"Co-op", tag:"Hayatta Kalma", episodes:4}
];
function App(){
 const [q,setQ]=useState(""); const [f,setF]=useState("Tümü");
 const filtered=useMemo(()=>games.filter(g=>(f==="Tümü"||g.status===f)&&g.name.toLowerCase().includes(q.toLowerCase())),[q,f]);
 return <main>
  <section className="hero">
   <span className="badge">{VERSION} • Dosya Temizliği + Build Fix</span>
   <h1>Hayatımız Oyun Arşiv Sistemi</h1>
   <p>Kullanıcı ekranında GitHub repo bilgisi gösterilmez. Vercel build çıktısı artık gerçek <b>dist</b> klasörü üretir.</p>
   <div className="actions"><button><Rocket/> Vercel Hazır</button><button><Database/> Supabase Notları</button><button><ShieldCheck/> BAT Koruması</button></div>
  </section>
  <section className="panel"><div className="search"><Search/><input placeholder="Oyun ara..." value={q} onChange={e=>setQ(e.target.value)}/><select value={f} onChange={e=>setF(e.target.value)}>{["Tümü","Devam Ediyor","Co-op","Final","Planlandı"].map(x=><option key={x}>{x}</option>)}</select></div></section>
  <section className="grid">{filtered.map(g=><article className="card" key={g.name}><div className="cover"><Gamepad2 size={46}/></div><h3>{g.name}</h3><p>{g.status}</p><div><span>{g.tag}</span><span>{g.episodes} bölüm</span></div></article>)}</section>
  <footer><Sparkles/> {VERSION} build başarılı • outputDirectory: dist</footer>
 </main>
}
createRoot(document.getElementById("root")).render(<App/>);
