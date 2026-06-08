const Contact = require('../models/Contact');

const saveContactRequest = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: 'Contact request saved successfully', contact });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save contact request', error: error.message });
  }
};

const getContactRequests = async (req, res) => {
  try {
    const requests = await Contact.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load contact requests', error: error.message });
  }
};

const deleteContactRequest = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact request not found' });
    }
    res.json({ message: 'Contact request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete contact request', error: error.message });
  }
};

module.exports = {
  saveContactRequest,
  getContactRequests,
  deleteContactRequest,
};
