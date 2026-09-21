const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Service must have a provider']
    },
    category: {
      type: String,
      required: [true, 'Service category is required'],
      enum: ['boat_ride', 'homestay', 'food', 'local_guide', 'narmada_aarti', 'other'],
      index: true
    },
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
      index: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
      index: true
    },
    pricingUnit: {
      type: String,
      enum: ['per_person', 'per_ride', 'per_night', 'per_meal', 'per_group'],
      default: 'per_person'
    },
    location: {
      name: { type: String, required: true, trim: true },
      ghat: { type: String, trim: true, default: '' },
      city: { type: String, required: true, trim: true, default: 'Jabalpur', index: true },
      coordinates: {
        lat: { type: Number, default: 23.1815 },
        lng: { type: Number, default: 79.9864 }
      }
    },
    images: {
      type: [String],
      default: []
    },
    availability: {
      days: {
        type: [String],
        default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      timeSlots: {
        type: [String],
        default: ['Morning (6:00 AM - 10:00 AM)', 'Afternoon (11:00 AM - 3:00 PM)', 'Evening (4:00 PM - 8:00 PM)']
      },
      isAvailable: {
        type: Boolean,
        default: true
      }
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'active',
      index: true
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
      index: true
    },
    categoryDetails: {
      // Boat specific
      boatName: { type: String, default: '' },
      boatType: { type: String, default: 'Motor Boat' },
      capacity: { type: Number, default: 6 },
      durationMinutes: { type: Number, default: 45 },
      safetyEquipment: { type: [String], default: ['Life Jackets', 'First Aid Kit', 'Trained Lifeguard'] },
      boardingPoint: { type: String, default: '' },

      // Homestay specific
      propertyName: { type: String, default: '' },
      roomType: { type: String, default: 'Riverside Standard Room' },
      guestCapacity: { type: Number, default: 4 },
      amenities: { type: [String], default: ['Wi-Fi', 'Hot Water', 'River View', 'Vegetarian Meals'] },
      checkInTime: { type: String, default: '12:00 PM' },
      checkOutTime: { type: String, default: '11:00 AM' },
      houseRules: { type: String, default: 'No smoking, Vegetarian only' },

      // Food specific
      foodType: { type: String, default: 'Traditional Malwi Thali' },
      isPureVeg: { type: Boolean, default: true },
      menuItems: { type: [String], default: ['Dal Bafla', 'Laddu', 'Kadhi', 'Rice', 'Salad'] },
      servingCapacity: { type: Number, default: 20 },

      // Guide specific
      languages: { type: [String], default: ['Hindi', 'English'] },
      specializations: { type: [String], default: ['Narmada History', 'Temple Architecture', 'Mythology'] },
      tourDuration: { type: String, default: '3 Hours' },

      // Aarti specific
      ghatLocation: { type: String, default: 'Gwarighat' },
      aartiTiming: { type: String, default: '7:00 PM - 8:00 PM' },
      includesSpecialSeating: { type: Boolean, default: true },
      includesPrasad: { type: Boolean, default: true }
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Compound text index for search
serviceSchema.index({
  title: 'text',
  description: 'text',
  'location.name': 'text',
  'location.ghat': 'text',
  'location.city': 'text'
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

