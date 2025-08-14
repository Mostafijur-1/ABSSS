import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Publication title is required'],
    trim: true,
    maxlength: [300, 'Title cannot exceed 300 characters']
  },
  authors: [{
    type: String,
    required: [true, 'At least one author is required'],
    trim: true
  }],
  abstract: {
    type: String,
    required: [true, 'Abstract is required'],
    trim: true
  },
  pdfUrl: {
    type: String,
    required: [true, 'PDF URL is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['research', 'review', 'case-study'],
    required: [true, 'Publication category is required']
  },
  publishedDate: {
    type: Date,
    required: [true, 'Published date is required']
  },
  journal: {
    type: String,
    required: [true, 'Journal name is required'],
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
publicationSchema.index({ publishedDate: -1 });
publicationSchema.index({ category: 1 });
publicationSchema.index({ journal: 1 });

export default mongoose.models.Publication || mongoose.model('Publication', publicationSchema);
