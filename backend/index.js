const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes'); // ১. রুট ইম্পোর্ট করলাম
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB কানেকশন চেক করার জন্য এই কোডটি দিন
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => {
    console.log('❌ Connection Error Detail:', err.message);
  });

// ২. অর্ডারের রুট সেট করলাম
// কেউ যদি /api/orders লিংকে নক করে, তাকে orderRoutes এ পাঠানো হবে
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING! 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});