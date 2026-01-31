const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { 
    type: String, 
    enum: ['customer', 'admin', 'superadmin'], 
    default: 'customer' 
  },
  // পার্টনারদের ওয়ালেট (টাকা ও লাভের হিসাব)
  walletBalance: { type: Number, default: 0 } 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);