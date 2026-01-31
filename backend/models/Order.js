const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // ১. কাস্টমারের তথ্য
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },

  // ২. কাজের ফাইল (Google Drive Link)
  fileLink: { type: String, required: true },

  // ৩. পণ্যের বিবরণ
  items: [
    {
      productName: { type: String }, // যেমন: Visiting Card
      quantity: { type: Number },    // যেমন: 1000 pcs
      price: { type: Number }        // যেমন: 500 taka
    }
  ],

  // ৪. টাকার হিসাব
  totalAmount: { type: Number, required: true },
  deliveryCharge: { type: Number, default: 0 },
  
  // ৫. স্ট্যাটাস (অটোমেটিক সেট হবে)
  status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'Printing', 'Shipped', 'Delivered'] 
  },
  
  paymentStatus: { 
    type: String, 
    default: 'Unpaid', 
    enum: ['Unpaid', 'Paid'] 
  },

  // ৬. তারিখ
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);