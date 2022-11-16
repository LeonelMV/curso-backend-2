const { productService } = require('../services');
const { appCache } = require('../commons');

const createProduct = async (req, res) => {
    try{
        const { name, price, stock, category, userId } = req.body;
        const result = await productService.createProduct(name, price, stock, category, userId);
        res.status(result.status).send(result);
    }catch(error){
        res.status(500).send("Se produjo un error al crear el producto.");
    }
}

const getProducts = async (req, res) => {
    try{
        const { category } = req.query;
        const result = await productService.getProducts(category);
        
        //Caching result with name key
        if(category){
            appCache.set(category, result?.data);
        }
        res.status(result.status).send(result);
    }catch(error){
        res.status(500).send("Se produjo un error al listar los productos.");
    }
}

module.exports = {
    createProduct,
    getProducts,
}