const redis = require('redis');
const { config } = require('../../../config');

const oneHour = 3600;

const client = redis.createClient({
    host: config.cache.host,
    port: config.cache.port,
    // password: config.cache.password
});

client.on('connect',  () => {
    console.log('Redis client connected');
});

client.on('error', (err) => {
    console.log('Something went wrong ' + err);
});

client.connect();

exports.getCache = async (key) => {
    let response = await client.get(key);
    if (!response) {
        return null;
    } else {
        return JSON.parse(response);
    }
};

exports.setCache = async (key, value, expirationInSeconds = null) => {
    if (!expirationInSeconds) {
        await client.set(key, JSON.stringify(value));
    } else {
        await client.set(key, JSON.stringify(value), {
            EX: expirationInSeconds,
            NX: true
        });
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