const { logger, appCache } = require('../commons');

const cacheProducts = async (req, res, next) => {
    try{
        const { category } = req.query;
        if(category && appCache.has(category)) {
            logger.info("** Country already exist on redis cache **");
            const cachedData = await appCache.get(category);
            logger.info(JSON.stringify(cachedData))
            return res.status(200).send(cachedData);
        }else{
            next();
        }
    }catch(error){
        logger.error("Error in middleware cache.");
        logger.error(error);
    }
}

module.exports = {
    cacheProducts,
}
