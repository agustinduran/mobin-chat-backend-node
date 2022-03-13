const client = require('../../../database/redis');

const findInCache = async (req, res, next) => {
    try {
        const key = req.originalUrl;
        client.get(key, (err, data) => {
            if (!data) {
                next();
            } else {
                return res.status(200).json(JSON.parse(data));
            }
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

module.exports = findInCache;
