
//const pokemonsModel = {
  //  getAll: 'SELECT * FROM pokemons',
//};

//module.exports = pokemonsModel;


const pokemonsModel = {
    getAll: 'SELECT * FROM pokemons',
    
    //getAll: 'SELECT * FROM pokemons WHERE is_deleted=0',
    getById: "SELECT * FROM pokemons WHERE id = ?",
    //getByID: 'SELECT * FROM pokemons WHERE id = ? AND is_deleted=0',
    getByPokemonName: 'SELECT * FROM pokemons WHERE name = ?',
    createPokemon: 'INSERT INTO pokemons (name) VALUES(?)',
    updatePokemon: 'UPDATE pokemons SET name = ? WHERE id = ?',
    deletePokemon: 'DELETE FROM pokemons WHERE id = ?', // 'UPDATE pokemons SET is_deleted=1 WHERE id =?',
};

module.exports =  pokemonsModel ;