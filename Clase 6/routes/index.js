const express = require('express');
const routes = express.Router();

const { userController, productController } = require('../controllers');
const { isAuth } = require('../middlewares');
const { userSchema } = require('../controllers/schemas');

routes.post('/login', userSchema, userController.login);
routes.post('/register', userController.register);

routes.post('/products', productController.createProduct);


routes.get('/hi', isAuth, userController.sayHi);

module.exports = routes;