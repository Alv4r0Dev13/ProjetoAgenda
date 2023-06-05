const path = require('path');
const express = require('express');
const route = express.Router();
const homeController = require(path.resolve(__dirname, '..', 'controllers', 'homeController'));

route.get('/', homeController.index);

module.exports = route;
