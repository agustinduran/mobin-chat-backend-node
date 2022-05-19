require('dotenv').config();
const pkg = require('../../package.json');

exports.config = {
    version: pkg.version,
    author: pkg.author,
    db: {
        host: process.env.DB_HOST         || 'localhost',
        port: process.env.DB_PORT         || 3306,
        user: process.env.DB_USER         || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME     || 'boilerplate-nodejs'
    },
    server: {
        host: process.env.SERVER_HOST || 'localhost',
        port: process.env.SERVER_PORT || 3000,
    },
    keys: {
        jwt: process.env.KEY_JWT || '$3CR3T!',
    },
    cache: {
        host: process.env.CACHE_HOST         || 'localhost',
        port: process.env.CACHE_PORT         || 6379,
        password: process.env.CACHE_PASSWORD || '$3CR3T!'
    }
};