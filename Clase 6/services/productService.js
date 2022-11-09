const Product = require('../models/product');
const User = require('../models/user');

const createProduct = async (name, price, stock, userId) => {
    let result;
    try{
        const userFound = await User.findById(userId);
        if(!userFound){
            return;
        }
        const newProduct = new Product({ name, price, stock, userOwner: userId });
        await newProduct.save();
        userFound.products.push(newProduct._id);
        await userFound.save();
    }catch(error){
        console.log(error);
        throw error;
    }
    return result;
}

module.exports = {
    createProduct
};