const { authService } = require('../services');
const User = require('../models/user');

const login = (req, res) => {
   const { email, password } = req.body;

   if(!email){
    res.status(400).send({ message: 'El campo email es requerido.' });
   } else if(!password){
    res.status(400).send({ message: 'El campo password es requerido.' });
   }

   User.findOne({ email }, (error, user) => {
        if(error){
            return res.status(500).send({ message: 'Se produjo un error al registrar el usuario.', error });
        }
        if(!user || !password || !user.comparePassword(password)){
            return res.status(401).send({ message: 'El usuario o clave no son correctos.' });
        }
        res.status(200).send({ message: 'Te has logueado correctamente', token: authService.createToken() });
    });
}

const register = (req, res) => {
    const { email, password } = req.body;

    const newUser = new User({
        email,
        password
    });

    User.findOne({ email: newUser.email }, (error, user) => {
        if(error){
            return res.status(500).send({ message: 'Se produjo un error al registrar el usuario.', error });
        }
        if(user){
            return res.status(400).send({ message: 'El email ya se encuentra en uso.' });
        }
        newUser.save((error) => {
            if(error){
                res.status(400).send({ message: 'Se produjo un error al registrar el usuario.', error });
            }
            res.status(201).send({ message: 'El registro se completo exitosamente', token: authService.createToken() });
        });
    });
}

const sayHi = (req, res) => {
    res.status(200).send('Hola mundo, estas autenticado!');
}

module.exports = {
    login,
    register,
    sayHi,
}