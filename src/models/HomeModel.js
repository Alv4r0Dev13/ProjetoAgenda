const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String
});

const ContactModel = mongoose.model('Home', ContactSchema);

module.exports = ContactModel;