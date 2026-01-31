const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  fileLink: String,
  items: [{
    productName: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  deliveryCharge: Number,
  status: { 
    type: String, 
    default: 'Pending',
    enum: ['Pending', 'Printing', 'Shipped', 'Delivered', 'Cancelled']
  },
  // পেমেন্ট স্ট্যাটাস (অটোমেটিক ইনকামের জন্য জরুরি)
  isPaid: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);