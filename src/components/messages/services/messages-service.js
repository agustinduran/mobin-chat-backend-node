const client  = require('../../../database/redis');

exports.createMessage = async (repository, message) => {
    // TODO: NO HARDCODE. MAKE A CONST CLASS
    client.del('/api/messages/');
    return await repository.save(message);
};