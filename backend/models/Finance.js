const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['Income', 'Expense', 'Withdrawal'], 
    required: true 
  },
  amount: { type: Number, required: true },
  description: { type: String, required: true }, // যেমন: "অর্ডার #101 লাভ"
  category: { 
    type: String, 
    enum: ['ProductSale', 'DeliveryCharge', 'RawMaterial', 'Salary', 'Withdrawal'] 
  },
  doneBy: { type: String }, // কে এন্ট্রি দিলো (SuperAdmin)
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Finance', FinanceSchema);