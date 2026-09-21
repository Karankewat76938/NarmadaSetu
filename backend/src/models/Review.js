const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Tourist reference is required']
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service reference is required']
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: [true, 'Booking reference is required'],
      unique: true // One review per eligible booking as per PRD Section 17
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required between 1 and 5'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: ['published', 'flagged', 'hidden'],
      default: 'published'
    }
  },
  {
    timestamps: true
  }
);

// After saving review, recalculate service average rating and count
reviewSchema.post('save', async function () {
  const Service = mongoose.model('Service');
  const stats = await mongoose.model('Review').aggregate([
    { $match: { service: this.service, status: 'published' } },
    {
      $group: {
        _id: '$service',
        avgRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await Service.findByIdAndUpdate(this.service, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].numReviews
    });
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

