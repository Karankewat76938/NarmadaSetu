const mongoose = require('mongoose');

const partnerApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true // One application per partner account
    },
    serviceCategory: {
      type: String,
      required: [true, 'Primary service category is required'],
      enum: ['boat_ride', 'homestay', 'food', 'local_guide', 'narmada_aarti', 'other']
    },
    businessName: {
      type: String,
      required: [true, 'Business/service name is required'],
      trim: true
    },
    experienceYears: {
      type: Number,
      default: 1,
      min: 0
    },
    contactDetails: {
      phone: { type: String, required: true },
      address: { type: String, required: true },
      ghatOrCity: { type: String, required: true }
    },
    documents: {
      idProofType: { type: String, default: 'Aadhaar / Government ID' },
      idProofNumber: { type: String, default: '' },
      licenseNumber: { type: String, default: '' }
    },
    applicationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending',
      index: true
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: {
      type: Date
    },
    rejectionReason: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const PartnerApplication = mongoose.model('PartnerApplication', partnerApplicationSchema);

module.exports = PartnerApplication;

