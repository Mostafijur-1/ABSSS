const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['conference', 'workshop', 'seminar', 'lecture', 'competition'],
    default: 'seminar'
  },
  location: {
    type: String,
    default: 'University Campus'
  },
  isUpcoming: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema); 