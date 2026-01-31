import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPanel from './AdminPanel'; // নাম আপডেট করা হয়েছে
import Login from './Login';
import './App.css';

// ১. কাস্টমার অর্ডার ফর্ম
function OrderForm() {
  const [formData, setFormData] = useState({
    customerName: '', phone: '', address: '', fileLink: '',
    productName: 'Visiting Card', quantity: 1000, price: 500
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const orderData = {
      customerName: formData.customerName, phone: formData.phone, address: formData.address,
      fileLink: formData.fileLink,
      items: [{ productName: formData.productName, quantity: Number(formData.quantity), price: Number(formData.price) }],
      totalAmount: Number(formData.price) + 50, deliveryCharge: 50
    };
    
    console.log("Sending Data:", orderData); // ডাটা চেক
    const response = await axios.post('https://nexiora-1uzr.onrender.com/api/orders/add', orderData);
    console.log("Server Response:", response.data); // সার্ভার রেসপন্স চেক
    
    alert('✅ অর্ডার সফল হয়েছে!');
  } catch (error) { 
    console.error("Full Error:", error); // লাল রঙের এরর আসবে কনসোলে
    alert('❌ অর্ডার হয়নি! এরর: ' + (error.response?.data?.message || error.message)); 
  }
};
      
      // 👇 এখানে আপনার লাইভ সার্ভার লিংক বসানো হয়েছে
      await axios.post('https://nexiora-1uzr.onrender.com/api/orders/add', orderData);
      
      alert('✅ অর্ডার সফল হয়েছে!');
    } catch (error) { alert('❌ অর্ডার হয়নি! ইন্টারনেট কানেকশন চেক করুন।'); }
  };

  return (
    <div className="container">
      <h1>🖨️ Nexiora Printing Service</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="customerName" placeholder="আপনার নাম" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="মোবাইল নম্বর" onChange={handleChange} required />
        <input type="text" name="address" placeholder="ঠিকানা" onChange={handleChange} required />
        <input type="text" name="fileLink" placeholder="Google Drive Link" onChange={handleChange} required />
        <div className="product-info">
            <select name="productName" onChange={handleChange}>
                <option value="Visiting Card">Visiting Card</option>
                <option value="Banner">Banner</option>
            </select>
            <input type="number" name="quantity" defaultValue={1000} onChange={handleChange} />
            <input type="number" name="price" defaultValue={500} onChange={handleChange} />
        </div>
        <button type="submit">অর্ডার করুন</button>
      </form>
      <div style={{marginTop: '20px'}}>
        <Link to="/admin">👨‍💼 Admin Panel</Link>
      </div>
    </div>
  );
}

// ২. মেইন অ্যাপ (রাউটিং + সিকিউরিটি)
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('printAdmin');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderForm />} />
        <Route 
          path="/admin" 
          element={isLoggedIn ? <AdminPanel /> : <Login setIsLoggedIn={setIsLoggedIn} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;