const redis = require('redis');
const { config } = require('../../../config');

const oneHour = 3600;

const client = redis.createClient(config.cache.port, config.cache.host);

client.get("hola", (err, data) => {
    console.log(data);
});

client.on('connect',  () => {
    console.log('Redis client connected');
});

client.on('error', (err) => {
    console.log('Something went wrong ' + err);
});

exports.getCache = (key) => {
    return client.get(key, (err, data) => {
	if (!data) {
            return null;
        } else {
	    return JSON.parse(data);
	}
    });
};

exports.setCache = async (key, value, expirationInSeconds = null) => {
    console.log(key);
    console.log(value);
    if (!expirationInSeconds) {
        await client.set(key, JSON.stringify(value));
    } else {
	// TODO: Use expirationInSeconds
        await client.set(key, JSON.stringify(value));
    }
};

exports.deleteCache = async (key) => {
    // return 1 if was deleted successfully, 0 if was cannot delete
    return await client.del(key);
};

exports.existsCache = (key) => {
    // return 1 if exists, 0 if dont exists
    return client.exists(key);
};
