const Product = require('../models/product');
const User = require('../models/user');

const createProduct = async (name, price, stock, category, userId) => {
    let result;
    try{
        const userFound = await User.findById(userId);
        if(!userFound){
            return { status: 400, message: 'El usuario no existe', id: userId};
        }
        const newProduct = new Product({ name, price, stock, category, userOwner: userId });
        await newProduct.save();
        userFound.products.push(newProduct._id);
        await userFound.save();
        result = {
            status: 201,
            message: "El producto fue creado correctamente",
            newProduct
        }
    }catch(error){
        console.log(error);
        throw error;
    }
    return result;
}

const getProducts = async (category) => {
    let result;
    let criteria = {};
    try{
        if(category){
            criteria.category = category;
        }
        const products = await Product.find(criteria);
        result = {
            status: 200,
            products,
        }
    }catch(error){
        throw error;
    }
    return result;
}

module.exports = {
    createProduct,
    getProducts,
};