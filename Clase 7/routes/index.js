const express = require('express');
const routes = express.Router();

const { cacheProducts } = require("../middlewares");

const { userController, productController } = require('../controllers');
const { isAuth } = require('../middlewares');
const { userSchema } = require('../controllers/schemas');

/**
 * This function comment is parsed by doctrine
 * @route POST /login
 * @group user
 * @produces application/json
 * @consumes application/json
 * @param {string} user.body.required - user to register
 * @returns {object} 200 - token
 * @returns {Error}  default - Unexpected error
 */
routes.post('/login', userSchema, userController.login);

/**
 * This function comment is parsed by doctrine
 * @route POST /register
 * @group user
 * @produces application/json
 * @consumes application/json
 * @param {string} user.body.required - ip address to trace
 * @returns {object} 200 - new user
 * @returns {Error}  default - Unexpected error
 */
routes.post('/register', userController.register);


/**
 * This function comment is parsed by doctrine
 * @route POST /products
 * @group products
 * @produces application/json
 * @consumes application/json
 * @param {string} product.body.required - product to create
 * @returns {object} 200 - new product
 * @returns {Error}  default - Unexpected error
 */
routes.post('/products', productController.createProduct);

/**
 * This function comment is parsed by doctrine
 * @route GET /products
 * @group products
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - products
 * @returns {Error}  default - Unexpected error
 */
routes.get('/products', cacheProducts, productController.getProducts);

/**
 * This function comment is parsed by doctrine
 * @route GET /hi
 * @group test
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - text
 * @returns {Error}  default - Unexpected error
 */
routes.get('/hi', isAuth, userController.sayHi);


// http://localhost:3000/api-docs/#/

module.exports = routes;