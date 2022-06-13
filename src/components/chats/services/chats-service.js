exports.getAll = async (repository) => {
    const chats = await repository.getAll();
    return chats;
};

exports.getChatById = async (repository, id) => {
    const chat = await repository.getById(id);
    return chat;
};

exports.createChat = async (repository, chat) => {
    const newChat = await repository.save(chat);
    return newChat;
};