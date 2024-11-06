const { getuserById } = require("../controllers/users");

const usersQueries= {
    getAll: 'SELECT * FROM users'
    getById: 'SELECT * FROM users WHERE id = ?'
};
module.exports = {usersQueries};
