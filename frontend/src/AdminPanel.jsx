import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  // ১. অর্ডার লোড করা (লাইভ সার্ভার থেকে)
  useEffect(() => {
    axios.get('https://nexiora-1uzr.onrender.com/api/orders/all')
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  // ২. স্ট্যাটাস আপডেট করা
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://nexiora-1uzr.onrender.com/api/orders/update/${id}`, { status: newStatus });
      setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
      alert('✅ স্ট্যাটাস আপডেট হয়েছে!');
    } catch (error) {
      alert('❌ আপডেট হয়নি!');
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Pending') return 'orange';
    if (status === 'Printing') return 'blue';
    if (status === 'Delivered') return 'green';
    return 'black';
  };

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <h1>👨‍💼 Admin Dashboard ({orders.length})</h1>
      
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#eee', height: '40px' }}>
            <th>Customer</th>
            <th>Item Details</th>
            <th>File</th>
            <th>Status Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} style={{ textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>
                <b>{order.customerName}</b><br/>
                <small>{order.phone}</small><br/>
                <small style={{color: '#777'}}>{order.address}</small>
              </td>
              <td style={{ padding: '10px' }}>
                {order.items[0].productName}<br/>
                <small>Qty: {order.items[0].quantity} | Price: {order.totalAmount}৳</small>
              </td>
              <td style={{ padding: '10px' }}>
                 <a href={order.fileLink} target="_blank" rel="noreferrer" 
                    style={{background: '#333', color: 'white', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none'}}>
                    📂 View
                 </a>
              </td>
              <td style={{ padding: '10px' }}>
                <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    style={{ 
                        fontWeight: 'bold', 
                        color: getStatusColor(order.status),
                        padding: '5px',
                        cursor: 'pointer'
                    }}
                >
                    <option value="Pending">🕒 Pending</option>
                    <option value="Printing">🖨️ Printing</option>
                    <option value="Shipped">🚚 Shipped</option>
                    <option value="Delivered">✅ Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;