const usersService    = require('../services/users-service');
const usersRepository = require('../repositories/users-mysql-repository');

exports.getAll = async (req, res) => {
    const users = await usersService.getAll(usersRepository);
    res.status(200).json(users);
};

exports.getById = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    // He want to see their resource?
    const authorizationUserId = Number.parseInt(req.headers['authorization']);

    if (authorizationUserId === id) {
        const userFinded = usersService.getSameUserById(usersRepository, authorizationUserId); /*users.find((u) => u.id === authorizationUserId)*/
    } else {
        // NEED ROLE ADMIN
        const userFinded = usersService.getOtherUserById(usersRepository, id);
    }
    
    if (userFinded) {
        return res.status(200).json(userFinded);
    } else {
        // TODO: O no existe
        return res.status(403).json({ message: 'No tiene permiso solicitado para acceder al recurso' });
    }
};

// exports.save = async (req, res) => {
//     try {
//         // const {username, password, email, name, surname, phone} = req.body;
//         const newUser = usersService.save(usersRepository, req.body);
//         return res.status(200).json(newUser);
//     } catch(error) {
//         return res.status(403).json({ message: 'No tiene permiso solicitado para acceder al recurso' });
//     }
// };
