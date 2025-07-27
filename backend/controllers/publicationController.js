const Publication = require('../models/Publication');

// Get all publications
const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find().sort({ publishedDate: -1 });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recent publications
const getRecentPublications = async (req, res) => {
  try {
    const publications = await Publication.find()
      .sort({ publishedDate: -1 })
      .limit(6);
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new publication
const createPublication = async (req, res) => {
  try {
    const publication = new Publication(req.body);
    const newPublication = await publication.save();
    res.status(201).json(newPublication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single publication
const getPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update publication
const updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(publication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete publication
const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPublications,
  getRecentPublications,
  createPublication,
  getPublication,
  updatePublication,
  deletePublication
}; 