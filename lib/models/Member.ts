import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required'],
    trim: true
  },
  role: {
    type: String,
    enum: ['faculty', 'student', 'alumni'],
    required: [true, 'Member role is required']
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    trim: true
  },
  image: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
memberSchema.index({ role: 1 });
memberSchema.index({ department: 1 });
memberSchema.index({ isActive: 1 });
memberSchema.index({ email: 1 });

export default mongoose.models.Member || mongoose.model('Member', memberSchema);
