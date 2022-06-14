const client  = require('../../../database/redis');

exports.getAll = async (repository) => {
    const chats = await repository.getAll();
    return chats;
};

exports.getChatById = async (repository, id) => {
    const chat = await repository.getById(id);
    return chat;
};

exports.createChat = async (repository, chat) => {
    const chatExists = await this.getByBothUsers(repository, chat);
    // console.log(chatExists);
    if (chatExists.length > 0) {
        return await repository.update(chat);
    } else {
        // TODO: NO HARDCODE. MAKE A CONST CLASS
        client.del('/api/chats/');
        return await repository.save(chat);
    }
};

exports.getByBothUsers = async (repository, chat) => {
    const chats = await repository.getByBothUsers(chat);
    return chats;
};