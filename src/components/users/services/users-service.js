exports.getAll = async (repository) => {
    const users = await repository.getAll();
    return users;
};

exports.getUserById = async (repository, id) => {
    const user = await repository.getById(id);
    return user;
};

exports.saveUser = async (repository, user) => {
    const newUser = await repository.save(user);
    return newUser;
};