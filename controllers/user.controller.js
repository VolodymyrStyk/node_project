const {usersService} = require('../services');
const {success} = require('../constants');

module.exports = {
    getAllUsers: (req, res) => {
        const users = usersService.findAll();

        res.json(users);
    },

    getUserById: (req, res) => {
        const {userId} = req.params;
        const userById = usersService.findOneById(userId);

        res.json(userById);
    },

    createUser: (req, res) => {
        usersService.insertUser(req.body);

        res.json(success.NEW_USER);
    },
    updateUser: (req, res) => {
        const {userId} = req.params;
        const {body} = req;

        usersService.updateCurrentUser(userId,body);

        res.json(success.UPDATE_USER);
    },

    deleteUserById: (req, res) => {
        const {userId} = req.params;
        const userById = usersService.deleteUser(userId);

        res.json(userById);
    }
}
