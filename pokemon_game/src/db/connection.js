const mariadb = require('mariadb');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'r00tP45w0rd',
    database: 'pokemons',
    port: 3306,
    connectionLimit: 10,
};

const pool = mariadb.createPool(config);

module.exports = pool;