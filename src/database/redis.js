const redis = require('redis');
const { config } = require('../config');

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

module.exports = client;