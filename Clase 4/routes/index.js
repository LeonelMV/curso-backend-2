const express = require('express');
const routes = express.Router();

const { userController } = require('../controllers');
const { isAuth } = require('../middlewares');

routes.post('/login', userController.login);
routes.post('/register', userController.register);

routes.get('/hi', isAuth, userController.sayHi);

module.exports = routes;