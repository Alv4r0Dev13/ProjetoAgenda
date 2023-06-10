const path = require('path');
const Contact = require('../models/ContactModel');
// const Contact = require(path.resolve(__dirname, '..', 'models', 'ContactModel'));

const createIndex = async (req, res) => {
  return res.render('contact', { contact: {} });
};

const create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.create();
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('/contact'));
      return;
    }

    req.flash('success', 'Contato registrado com sucesso!');
    req.session.save(() => res.redirect('/'));
    return;
  } catch (e) {
    console.log(e);
    return res.redirect('/404');
  }
};

const readAll = async (req, res) => {

};

const readId = async (req, res) => {

};

const updateIndex = async (req, res) => {
  const contact = await Contact.readById(req.params.id);
  if (!contact) return res.render('err/404');
  res.render('contact', { contact });
};

const update = async (req, res) => {
  try {
    if (!req.params.id) return res.render('err/404');
    const contact = new Contact(req.body);
    await contact.update(req.params.id);
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('/contact'));
      return;
    }

    req.flash('success', 'Contato atualizado com sucesso!');
    req.session.save(() => res.redirect(`/contact/edit/${contact.contact._id}`));
    return;
  } catch (e) {
    console.log(e);
    return res.render('err/404');
  }
};

const deleteIndex = async (req, res) => {
  if (!req.params.id) return res.render('err/404');
  res.render('delete', { id: req.params.id });
};

const destroy = async (req, res) => {
  if (!req.params.id) return res.render('err/404');
  const contact = await Contact.delete(req.params.id);
  req.flash('success', 'Contato excluído!');
  req.session.save(() => res.redirect('/'));
  return;
};

module.exports = {
  createIndex,
  create,
  readAll,
  readId,
  updateIndex,
  update,
  deleteIndex,
  destroy
};