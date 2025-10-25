// src/App.jsx

import React,{useState} from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';
import axios from "axios";
import './App.css';

// Sayfalarımızı import ediyoruz
// ...
import Home from './pages/Home.jsx';
import OrderForm from './pages/OrderForm.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';

function App() {
  const [siparisBilgisi,setSiparisBilgisi] = useState(null);

  const navigate = useNavigate();

  const handleSiparisSubmit = (gelenformData) => { 
    console.log("App.jsx'e ulaşan veri",gelenformData);

    axios.post('https://jsonplaceholder.typicode.com/posts',gelenformData)
      .then(response => { 
        const yeniSiparis = { 
          ...gelenformData,
          apiYaniti:response.data
        };
        setSiparisBilgisi(yeniSiparis);

        navigate('/success');
      })

      .catch(error => { 
        console.error('App.jsx API Hatası:',error);
      });
    };

  return (
    <div className="App">
      <header>
        {/* Buraya tüm sayfalarda görünecek bir header (logo vb.) koyabiliriz */}
      </header>

      {/* Routes: URL'ye göre hangi component'in render edileceğini belirler */}
      <Routes>
        {/* Anasayfa (URL: /) */}
        <Route path="/" element={<Home />} />

        {/* Sipariş Formu Sayfası (URL: /order) */}
        <Route path="/order" element={<OrderForm  handleSiparisSubmit={handleSiparisSubmit}/>} />

        {/* Sipariş Onay Sayfası (URL: /success) */}
        <Route path="/success" element={<OrderConfirmation  siparisBilgisi={siparisBilgisi}/>} />
      </Routes>
    </div>
  );
}

export default App;