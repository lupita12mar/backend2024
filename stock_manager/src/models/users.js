
/*const usersQueries= {
    getById: 'SELECT * FROM users WHERE id = ? is_active =0',
    getByUsername: 'SELECT * FROM users WHERE username =? AND is_active =0',
    create: 'INSERT INTO users (username, password, email) VALUES (?,?,?)',
    update: 'UPDATE users SET username = ? WHERE id = ?',
    delete: 'UPDATE users SET is_active = 0 WHERE  id=?',
};
module.exports = {usersQueries};*/
const usersQueries = {
    getAll: 'SELECT * FROM users WHERE is_active=1',
    getById: 'SELECT * FROM users WHERE id=? AND is_active=1',
    getByUsername: 'SELECT * FROM users WHERE username =?',
    create: 'INSERT INTO users (username, password, email) VALUES (?,?,?)',
    update: 'UPDATE users SET username = ?, password = ? WHERE id = ?', //update: 'UPDATE users SET username = ? WHERE id = ?',
    delete: 'UPDATE users SET is_active = 0 WHERE id = ?',
};

module.exports = { usersQueries };
