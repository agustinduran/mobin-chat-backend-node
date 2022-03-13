const cacheService = require('../services/cache-services');

const findInCache = async (req, res, next) => {
    try {
        const response = await cacheService.getCache(req.originalUrl);
	console.log(req.originalUrl +" - middleware: " +response);
        if (!response) {
            next();
        } else {
	    res.status(200).json({message: "cache", response});
        }
    } catch (err) {
        console.log(err);
        next();
    }
};

module.exports = findInCache;
