import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  image: {
    type: String,
    default: null
  },
  category: {
    type: String,
    enum: ['conference', 'workshop', 'seminar', 'lecture', 'competition'],
    required: [true, 'Event category is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  isUpcoming: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
eventSchema.index({ date: -1 });
eventSchema.index({ category: 1 });
eventSchema.index({ isUpcoming: 1 });

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
