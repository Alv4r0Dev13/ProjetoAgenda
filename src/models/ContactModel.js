const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  tel: { type: String, required: false, default: '' },
  createdIn: { type: Date, default: Date.now() }
});

const ContactModel = mongoose.model('Contato', ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async create() {
    this.validate();
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
  }

  validate() {
    this.cleanUp();

    // The email must be valid
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido!');

    // Must fill name field
    if (!this.body.name) this.errors.push('Nome é um campo obtigatório!');

    // Must fill email or tel field
    if (!this.body.email && !this.body.tel) this.errors.push('Pelo menos um contato precisa ser enviado: email ou telefone!');
  }

  cleanUp() {
    for (const key in this.body)
      if (typeof this.body[key] !== 'string') this.body[key] = '';

    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      email: this.body.email,
      tel: this.body.tel,
    };
  }

  static async readAll() {
    const contacts = await ContactModel.find().sort({ createdIn: -1 });
    return contacts;
  }

  static async readById(id) {
    if (typeof id !== 'string') return;
    const contact = await ContactModel.findById(id);
    return contact;
  }

  async update(id) {
    if (typeof id !== 'string') return;
    this.validate();
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  static async delete(id) {
    if (typeof id !== 'string') return;
    console.log(id);
    const contact = ContactModel.findByIdAndDelete(id);
    return contact;
  }
}

module.exports = Contact;