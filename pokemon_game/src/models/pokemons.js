
//const pokemonsModel = {
  //  getAll: 'SELECT * FROM pokemons',
//};

//module.exports = pokemonsModel;


const pokemonsModel = {
    getAll: 'SELECT * FROM pokemons',
    get3Random: 'SELECT * FROM pokemons ORDER BY RAND() LIMIT 3',

    
    getById: "SELECT * FROM pokemons WHERE id = ?",

    getByPokemonName: 'SELECT * FROM pokemons WHERE name = ?',
    createPokemon: 'INSERT INTO pokemons (name) VALUES(?)',
    updatePokemon: 'UPDATE pokemons SET name = ? WHERE id = ?',
    deletePokemon: 'DELETE FROM pokemons WHERE id = ?', // 'UPDATE pokemons SET is_deleted=1 WHERE id =?',
};

module.exports =  pokemonsModel ;