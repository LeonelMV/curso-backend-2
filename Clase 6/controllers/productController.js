const { productService } = require('../services');

const createProduct = async (req, res) => {
    try{
        const { name, price, stock, userId } = req.body;
        const result = await productService.createProduct(name, price, stock, userId);
        res.status(201).send(result);
    }catch(error){
        res.status(500).send("Se produjo un error al crear el producto.");
    }
}

module.exports = {
    createProduct,
}