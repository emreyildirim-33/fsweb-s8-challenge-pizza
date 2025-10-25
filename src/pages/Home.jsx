// src/pages/Home.jsx

import React from "react";
// Sayfalar arası link için <Link> component'ini import ediyoruz
import { Link } from "react-router-dom";
// Bu sayfaya özel stilleri import ediyoruz
import './Home.css'; 
// Arka plan resmini JavaScript'te import ediyoruz
import homeHeroImage from '../assets/home-hero.png'; 

export default function Home() {
  return (
    // En dıştaki div'e hem className hem de inline style veriyoruz
    <div 
      className="home-container" 
      style={{ backgroundImage: `url(${homeHeroImage})` }} // <-- Düzeltilmiş inline style
    >
      <header className="home-header">
        <h1>Teknolojik Yemekler</h1>
      </header>
      
      <section className="home-hero">
        <h2>Karnı acıkan yazılımcılara,</h2>
        <h2>bi' tıkla lezzet kapında!</h2>
        
        {/* '/order' sayfasına yönlendiren Link bileşeni */}
        <Link to="/order" className="order-button">
          ACIKTIM
        </Link>
      </section>
      
      {/* IT2'de buraya ek içerik gelebilir */}
    </div>
  );
}