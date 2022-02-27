require('dotenv').config();

exports.config = {
    db: {
        host: process.env.DB_HOST         || 'localhost',
        port: process.env.DB_PORT         || '3306',
        user: process.env.DB_USER         || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME     || 'promiedos-fueguino'
    },
    server: {
        port: process.env.SERVER_PORT || 3000,
    },
    keys: {
        jwt: process.env.KEY_JWT || '$3CR3T!',
    }
};