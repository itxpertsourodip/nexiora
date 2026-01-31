const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // আমাদের খাতা ইম্পোর্ট করলাম

// নতুন অর্ডার তৈরি করার রাস্তা (Create Order Route)
router.post('/add', async (req, res) => {
  try {
    // ১. কাস্টমারের পাঠানো তথ্য দিয়ে নতুন অর্ডার বানাবো
    const newOrder = new Order(req.body);

    // ২. সেটা ডাটাবেসে সেভ করবো
    const savedOrder = await newOrder.save();

    // ৩. সফল হলে কাস্টমারকে কনফার্মেশন দেবো
    res.status(200).json(savedOrder);
    console.log("✅ New Order Saved!");
    
  } catch (err) {
    // ভুল হলে এরর দেখাবো
    res.status(500).json(err);
    console.log("❌ Error Saving Order:", err);
  }
});
// সব অর্ডার দেখার রাস্তা (Get All Orders Route)
router.get('/all', async (req, res) => {
  try {
    // সব অর্ডার খুঁজে বের করো, নতুনগুলো সবার আগে দেখাবে
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
// স্ট্যাটাস আপডেট করার রাস্তা (Update Status Route)
router.put('/update/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { 
        status: req.body.status,
        paymentStatus: req.body.paymentStatus
      }, 
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ৩. অর্ডার ডিলিট করার রুট
router.delete('/delete/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order Deleted!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;