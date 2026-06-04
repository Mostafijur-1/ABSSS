import mongoose from 'mongoose';

const recentActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Activity description is required'],
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Activity date is required']
  },
  link: {
    type: String,
    trim: true,
    default: null
  },
  category: {
    type: String,
    trim: true,
    default: null
  }
}, {
  timestamps: true
});

recentActivitySchema.index({ date: -1 });

export default mongoose.models.RecentActivity || mongoose.model('RecentActivity', recentActivitySchema);
