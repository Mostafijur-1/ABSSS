const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authors: [{
    type: String,
    required: true
  }],
  abstract: {
    type: String,
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['research', 'review', 'case-study', 'blog'],
    default: 'research'
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  journal: {
    type: String,
    default: 'ABSSS Journal'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Publication', publicationSchema); 