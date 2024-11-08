
const usersQueries= {
    getById: 'SELECT * FROM users WHERE id = ? is_active =0',
    getByUsername: 'SELECT * FROM users WHERE username =? AND is_active =0',
    create: 'INSERT INTO users (username, password, email) VALUES (?,?,?)',
    update: 'UPDATE users SET username = ? WHERE id = ?',
    delete: 'UPDATE users SET is_active = 0 WHERE  id=?',
};
module.exports = {usersQueries};
