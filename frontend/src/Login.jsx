import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ব্যাকএন্ডে লগইন রিকোয়েস্ট পাঠানো
      const res = await axios.post('https://nexiora-1uzr.onrender.com/api/auth/login', {
        email,
        password
      });

      // সফল হলে টোকেন এবং ইউজারের তথ্য ব্রাউজারে সেভ রাখা
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // অ্যাপকে জানানো যে লগইন হয়েছে
      setIsLoggedIn(true);
      
      alert(`স্বাগতম, ${res.data.user.name}!`);
      navigate('/admin'); // ড্যাশবোর্ডে নিয়ে যাওয়া

    } catch (err) {
      // এরর হ্যান্ডলিং
      setError(err.response?.data?.message || 'লগইন ব্যর্থ হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
        <h2>🔐 Nexiora Admin Login</h2>
        <p>শুধুমাত্র অথরাইজড পার্টনারদের জন্য</p>
        
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="ইমেইল অ্যাড্রেস" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
          />
          <input 
            type="password" 
            placeholder="পাসওয়ার্ড" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '10px', backgroundColor: loading ? '#ccc' : '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;