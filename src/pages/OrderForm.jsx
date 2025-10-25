import React, { useState, useEffect } from "react";
import './OrderForm.css'; // CSS dosyamızı import ediyoruz
import formBgImage from '../assets/form-bg.png'; // <-- Arka plan resmini JS'te import et

// Malzeme listesi (component'in dışında)
const malzemeListesi = [
  "Peppeoroni", // Not: Orijinal kodunuzdaki yazım budur
  "Sosis",
  "Mısır",
  "Zeytin",
  "Soğan",
  "Biber",
  "Mantar",
  "Ananas",
  "Jambon",
  "Kabak",
];

// App.jsx'ten gelen 'handleSiparisSubmit' prop'unu burada yakalıyoruz
export default function OrderForm({ handleSiparisSubmit }) {

  // --- Elle Yazdığımız Mantık Bölümü ---

  const [formData, setFormData] = useState({
    isim: "",
    boyut: "",
    malzemeler: [],
    özel: "",
  });

  const [errors, setErrors] = useState({
    isim: "",
    boyut: "",
    malzemeler: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData({
        ...formData,
        malzemeler: [...formData.malzemeler, value],
      });
    } else {
      setFormData({
        ...formData,
        malzemeler: formData.malzemeler.filter((malzeme) => malzeme !== value),
      });
    }
  };

  const validateForm = () => {
    let newErrors = { isim: "", boyut: "", malzemeler: "" };

    if (formData.isim.trim().length < 3) {
      newErrors.isim = "İsim en az 3 karakter olmalıdır.";
    }

    if (!formData.boyut) {
      newErrors.boyut = "Lütfen bir pizza boyutu seçin.";
    }

    // Düzeltilmiş 'else if' mantığı
    if (formData.malzemeler.length < 4) {
      newErrors.malzemeler = "En az 4 malzeme seçmelisiniz.";
    } else if (formData.malzemeler.length > 10) {
      newErrors.malzemeler = "En fazla 10 malzeme seçebilirsiniz.";
    }
    setErrors(newErrors);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const isFormValid = !Object.values(errors).some(error => error);

  // IT2: handleSubmit fonksiyonu artık axios çağırmıyor,
  // sadece veriyi App.jsx'e (yukarı) yolluyor.
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSiparisSubmit(formData);
  };

  // --- Kopyala-Yapıştır Yaptığımız JSX (Tasarım) Bölümü ---
  // (Arka plan için wrapper div ve inline style dahil)

  return (
    <div
      className="order-page-wrapper"
      style={{ backgroundImage: `url(${formBgImage})` }} // <-- Arka planı inline style ile ver
    >
      <form onSubmit={handleSubmit} className="order-form">
        <h2>Sipariş Formu</h2>

        {/* İsim Alanı */}
        <div className="form-group">
          <label>
            İsminiz:
            <input
              type="text"
              name="isim"
              value={formData.isim}
              onChange={handleChange}
              placeholder="En az 3 karakter"
            />
          </label>
          {errors.isim && <p className="error-message">{errors.isim}</p>}
        </div>

        {/* Boyut Seçimi (Custom Style için Güncellendi) */}
        <div className="form-group">
          <fieldset>
            <legend>Pizza Boyutu:</legend>
            {errors.boyut && <p className="error-message">{errors.boyut}</p>}
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="boyut"
                  value="S"
                  checked={formData.boyut === "S"}
                  onChange={handleChange}
                />
                <span className="custom-radio"></span>
                Küçük (S)
              </label>
              <label>
                <input
                  type="radio"
                  name="boyut"
                  value="M"
                  checked={formData.boyut === "M"}
                  onChange={handleChange}
                />
                <span className="custom-radio"></span>
                Orta (M)
              </label>
              <label>
                <input
                  type="radio"
                  name="boyut"
                  value="L"
                  checked={formData.boyut === "L"}
                  onChange={handleChange}
                />
                <span className="custom-radio"></span>
                Büyük (L)
              </label>
            </div>
          </fieldset>
        </div>

        {/* Malzemeler (Custom Style için Güncellendi) */}
        <div className="form-group">
          <fieldset>
            <legend>Ek malzemeler (En az 4, en fazla 10): </legend>
            {errors.malzemeler && <p className="error-message">{errors.malzemeler}</p>}
            <div className="checkbox-group">
              {malzemeListesi.map((malzeme) => (
                <label key={malzeme} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="malzemeler"
                    value={malzeme}
                    checked={formData.malzemeler.includes(malzeme)}
                    onChange={handleCheckboxChange}
                  />
                  <span className="custom-checkbox"></span>
                  {malzeme}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Sipariş Notu */}
        <div className="form-group">
          <label>
            Sipariş notunuz:
            <textarea
              name="özel"
              value={formData.özel}
              onChange={handleChange}
              rows={5}
              placeholder="Eklemek istediğiniz özel bir not var mı?"
            />
          </label>
        </div>

        {/* Submit Butonu */}
        <div className="form-submit">
          <button type="submit" disabled={!isFormValid} className="submit-button">
            Sipariş Ver
          </button>
        </div>
      </form>
    </div> // <-- Arka plan sarmalayıcının kapanışı
  );
}