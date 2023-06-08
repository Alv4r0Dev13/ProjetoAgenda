const path = require('path');
const express = require('express');
const route = express.Router();

const homeController = require(path.resolve(__dirname, '..', 'controllers', 'homeController'));
const loginController = require(path.resolve(__dirname, '..', 'controllers', 'loginController'));

// Home routes
route.get('/', homeController.index);

// Login routes
route.get('/login', loginController.indexLogin);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);
route.get('/signin', loginController.indexSignin);
route.post('/signin/register', loginController.register);

module.exports = route;
