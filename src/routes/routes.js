const path = require('path');
const express = require('express');
const route = express.Router();

const homeController = require(path.resolve(__dirname, '..', 'controllers', 'homeController'));
const loginController = require(path.resolve(__dirname, '..', 'controllers', 'loginController'));
// const contactController = require(path.resolve(__dirname, '..', 'controllers', 'contactController'));
const { userRequired } = require(path.resolve(__dirname, '..', 'middlewares', 'sessionMiddleware'));
const contactController = require('../controllers/contactController');

// Home routes
route.get('/', homeController.index);

// Login routes
route.get('/login', loginController.indexLogin);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);
route.get('/signin', loginController.indexSignin);
route.post('/signin/register', loginController.register);

// Contact routes
route.get('/contact', userRequired, contactController.createIndex);
route.post('/contact/create', userRequired, contactController.create);
route.get('/contact/edit/:id', userRequired, contactController.updateIndex);
route.post('/contact/edit/:id', userRequired, contactController.update);
route.get('/contact/delete/:id', userRequired, contactController.deleteIndex);
route.post('/contact/delete/:id', userRequired, contactController.destroy);

// Error routes
route.get('/404', (req, res) => res.render('err/404'));

module.exports = route;
