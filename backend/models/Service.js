const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['boat_ride', 'guide', 'stay'], default: 'boat_ride' },
  imageUrl: { type: String },
  location: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
