import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // এখানে আমরা হার্ডকোড পাসওয়ার্ড দিচ্ছি শেখার জন্য
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true); // লগইন সাকসেস
      localStorage.setItem('printAdmin', 'true'); // ব্রাউজারে মনে রাখবে
      navigate('/admin'); // অ্যাডমিন পেজে পাঠিয়ে দেবে
    } else {
      alert('❌ ভুল পাসওয়ার্ড! আপনি কি আসলেই মালিক?');
    }
  };

  return (
    <div className="container" style={{maxWidth: '400px', marginTop: '100px'}}>
      <h1>🔐 অ্যাডমিন লগইন</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" style={{background: '#333'}}>লগইন</button>
      </form>
    </div>
  );
}

export default Login;