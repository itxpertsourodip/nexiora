const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true }, // যেমন: Visiting Card
  pricePerUnit: { type: Number, required: true }, // যেমন: 500 টাকা
  minQuantity: { type: Number, default: 100 },
  image: { type: String }, // প্রোডাক্টের ছবির লিংক
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);