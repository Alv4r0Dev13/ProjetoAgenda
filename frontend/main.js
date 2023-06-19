import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';
import './assets/css/home.css';
import './assets/css/form.css';

import Login from './modules/Login';
import Contact from './modules/Contact';

const login = new Login('.login-form');
const signin = new Login('.signin-form');
login.init();
signin.init();

const createContact = new Contact('.contact-create');
const editContact = new Contact('.contact-edit');
createContact.init();
editContact.init();
