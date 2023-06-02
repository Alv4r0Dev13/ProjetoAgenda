const path = require('path');
const express = require('express');
const route = express.Router();
const homeController = require(path.resolve(__dirname, 'src', 'controllers', 'homeController'));

route.get('/', homeController.landPage);
route.post('/', homeController.formPost);

module.exports = route;
