const cacheService = require('../services/cache-services');

const findInCache = async (req, res, next) => {
    try {
        let response = await cacheService.getCache(req.originalUrl);
        if (!response) {
            next();
        } else {
            res.status(200).json(response);
        }
    } catch (err) {
        console.log(err);
        next();
    }
};

module.exports = findInCache;