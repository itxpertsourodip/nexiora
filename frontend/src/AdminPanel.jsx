import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('https://nexiora-1uzr.onrender.com/api/orders/all')
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://nexiora-1uzr.onrender.com/api/orders/update/${id}`, { status: newStatus });
      setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
    } catch (error) { alert('Update failed!'); }
  };

  const deleteOrder = async (id) => {
    if(window.confirm("অর্ডারটি ডিলিট করতে চান?")) {
      try {
        await axios.delete(`https://nexiora-1uzr.onrender.com/api/orders/delete/${id}`);
        setOrders(orders.filter(order => order._id !== id));
        alert("অর্ডার ডিলিট হয়েছে!");
      } catch (error) { alert("ডিলিট করা যায়নি!"); }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('printAdmin');
    window.location.href = '/admin';
  };

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>👨‍💼 Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ background: '#ff4d4d', padding: '10px' }}>Logout</button>
      </div>
      
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Customer</th>
            <th>Details</th>
            <th>File</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.customerName}<br/><small>{order.phone}</small></td>
              <td>{order.items[0].productName} ({order.items[0].quantity})</td>
              <td><a href={order.fileLink} target="_blank">📂 View</a></td>
              <td>
                <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Printing">Printing</option>
                    <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td>
                <button onClick={() => deleteOrder(order._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;