const { authService } = require('../services');

const login = (req, res) => {
   res.status(200).send({ token: authService.createToken() });
}

const register = (req, res) => {
    //TODO
}

const sayHi = (req, res) => {
    res.status(200).send('Hola mundo, estas autenticado!');
}

module.exports = {
    login,
    register,
    sayHi,
}