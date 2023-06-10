const path = require('path');
const Contact = require(path.resolve(__dirname, '..', 'models', 'ContactModel'));

const index = async (req, res) => {
  const contacts = await Contact.readAll();
  res.render('index', { contacts });
};

module.exports = {
  index
};