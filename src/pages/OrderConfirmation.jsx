// src/pages/OrderConfirmation.jsx

import React from "react";
import './OrderConfirmation.css'; // Bu sayfanın CSS'ini import et

// App.jsx'ten 'siparisBilgisi' prop'unu burada yakalıyoruz
export default function OrderConfirmation({ siparisBilgisi }) {

  // Eğer kullanıcı sipariş vermeden /success sayfasına gelirse
  // (siparisBilgisi state'i null ise) bir uyarı göster
  if (!siparisBilgisi) {
    return (
      <div className="confirmation-page">
        <h2>Geçerli bir sipariş bulunamadı!</h2>
        <p>Lütfen önce sipariş formunu doldurun.</p>
      </div>
    );
  }

  // Gelen prop'un içindeki verileri ayrıştıralım
  const { isim, boyut, malzemeler, özel, apiYaniti } = siparisBilgisi;

  // Toplam fiyatı hesaplayalım (Örnek: Malzeme başı 5 TL)
  const malzemeFiyati = malzemeler.length * 5;
  const pizzaFiyati = 85.50; // Bu, projede yoktu ama ekleyelim
  const toplamTutar = (malzemeFiyati + pizzaFiyati).toFixed(2);

  return (
    <div className="confirmation-page">
      <h1>Teknolojik Yemekler</h1>
      <h2>Siparişin Alındı!</h2>

      {/* Sipariş Özeti Kutusu */}
      <div className="order-summary">

        {/* API'den gelen ID'yi gösterelim */}
        <div className="summary-item">
          <h4>Sipariş ID:</h4>
          <p>{apiYaniti.id}</p>
        </div>

        <div className="summary-item">
          <h4>Müşteri:</h4>
          <p>{isim}</p>
        </div>

        <div className="summary-item">
          <h4>Boyut:</h4>
          <p>{boyut}</p>
        </div>

        <div className="summary-item">
          <h4>Malzemeler:</h4>
          <ul>
            {malzemeler.map(malzeme => (
              <li key={malzeme}>- {malzeme}</li>
            ))}
          </ul>
        </div>

        {/* Eğer özel not varsa göster */}
        {özel && (
          <div className="summary-item">
            <h4>Notun:</h4>
            <p>{özel}</p>
          </div>
        )}

        <div className="summary-item total-summary">
          <h4>TOPLAM: {toplamTutar} TL</h4>
        </div>

      </div>
    </div>
  );
}