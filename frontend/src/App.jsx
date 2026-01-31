import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPanel from './AdminPanel';
import Login from './Login'; // লগইন পেজ ইম্পোর্ট
import './App.css';

// ১. কাস্টমার অর্ডার ফর্ম (আগেরটাই আছে)
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
      await axios.post('http://localhost:5000/api/orders/add', orderData);
      alert('✅ অর্ডার সফল হয়েছে!');
    } catch (error) { alert('❌ অর্ডার হয়নি!'); }
  };

  return (
    <div className="container">
      <h1>🖨️ Printing Master</h1>
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

// ২. সিকিউরড অ্যাডমিন রুট (মেইন অ্যাপ)
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // পেজ রিফ্রেশ দিলেও যেন লগইন থাকে
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
        
        {/* এখানে লজিক বসালাম: লগইন করা থাকলে Admin দেখাবে, না থাকলে Login পেজ দেখাবে */}
        // আগে ছিল <Admin /> এখন হবে <AdminPanel />
<Route 
  path="/admin" 
  element={isLoggedIn ? <AdminPanel /> : <Login setIsLoggedIn={setIsLoggedIn} />} 
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;