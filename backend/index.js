const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// রাউট ইম্পোর্ট
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes'); // <--- নতুন লগইন রাউট

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB কানেকশন
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// রাউট ব্যবহার
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes); // <--- এই লাইনটিই মিসিং ছিল!

app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING! 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});