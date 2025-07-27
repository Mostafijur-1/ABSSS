const express = require('express');
const router = express.Router();
const {
  getEvents,
  getUpcomingEvents,
  getPastEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

// GET /api/events - Get all events
router.get('/', getEvents);

// GET /api/events/upcoming - Get upcoming events
router.get('/upcoming', getUpcomingEvents);

// GET /api/events/past - Get past events
router.get('/past', getPastEvents);

// POST /api/events - Create new event
router.post('/', createEvent);

// GET /api/events/:id - Get single event
router.get('/:id', getEvent);

// PUT /api/events/:id - Update event
router.put('/:id', updateEvent);

// DELETE /api/events/:id - Delete event
router.delete('/:id', deleteEvent);

module.exports = router; 