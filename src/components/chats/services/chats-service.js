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
    if (chatExists.length > 0) {
        await repository.update(chatExists[0]);
        return chatExists[0].id;
    } else {
        // TODO: NO HARDCODE. MAKE A CONST CLASS
        // client.del('/api/chats/');
        var chat = await repository.save(chat);
        return chat[0];
    }
};

exports.getByBothUsers = async (repository, chat) => {
    const chats = await repository.getByBothUsers(chat);
    return chats;
};