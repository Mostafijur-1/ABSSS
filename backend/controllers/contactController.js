const Contact = require('../models/Contact');

// Get all contact messages
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new contact message
const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const newContact = await contact.save();
    res.status(201).json({
      message: 'Message sent successfully!',
      contact: newContact
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single contact message
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark contact as read
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      { isRead: true }, 
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete contact message
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  markAsRead,
  deleteContact
}; 