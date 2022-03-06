const cacheService = require('../services/cache-services');

const findInCache = async (req, res, next) => {
    let response = await cacheService.getCache(req.originalUrl);
    if (!response) {
        next();
    } else {
        res.status(200).json(response);
    }
};

module.exports = findInCache;