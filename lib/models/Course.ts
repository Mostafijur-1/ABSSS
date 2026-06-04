import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true
  },
  instructor: {
    type: String,
    trim: true,
    default: null
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'ongoing'],
    default: 'upcoming',
    required: [true, 'Course status is required']
  },
  duration: {
    type: String,
    trim: true,
    default: null
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: null
  },
  image: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

courseSchema.index({ status: 1 });
courseSchema.index({ startDate: -1 });

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
