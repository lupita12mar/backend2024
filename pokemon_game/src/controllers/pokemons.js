//const {request, response} = require ('express');
//const pool = require('../db/connection');
//const pokemonsModel = require('../models/pokemons');

//const getAllPokemons = async (req = request, res = response) => {
//let conn;
//try{
//conn = await pool.getConnection();
//const pokemons =  await conn.query(pokemonsModel.getAll);
//res.send(pokemons);
//}catch (err){
  //  res.status(500).json(err);
    //return;
//}finally{
  //  if (conn) conn.end();
//}
//}

//const getPokemonById = async (req = request, res = response) => {

//}

//const get3RandomPokemons = async (req = request, res = response) => {

//}

//const createPokemon = async (req = request, res = response) => {

//}

//const updatePokemon = async (req = request, res = response) => {

//}

//const deletePokemon = async (req = request, res = response) => {

//}

//module.exports = {
    //getAllPokemons,
    //getPokemonById,
    //get3RandomPokemons,
    //createPokemon,
   // updatePokemon,
 //   deletePokemon,
//}



const {request, response} = require('express');
const pool = require('../db/connection');
const pokemonsModel= require('../models/pokemons');

const getAllPokemons = async(req=request, res=response)=>{
let conn;
  try{
    conn = await pool.getConnection();
    const pokemons=await conn.query(pokemonsModel.getAll);
    res.send(pokemons);

  } catch(err){
    res.status(500).json(err);//'Internal server error'
    return;
  }finally{
    if(conn) conn.end();
  }

}
const  getPokemonById = async(req=request, res=response)=>{
  const {id}=req.params
  if (isNaN(id)){
      res.status(400).send('invalid id')
      return;
  }
  let conn
  try{ 
      conn = await pool.getConnection()
      const pokemons = await conn.query(pokemonsModel.getById, [id]);
      if(pokemons.length === 0){
          res.status(404).send('pokemin not found')
          return
      }
      res.send(pokemons)
  
      } catch(err){
          res.status(500).send(err)
      } finally{
        if(conn) conn.end()
      }

}
const get3RandomPokemons = async(req=request, res=response)=>{

}
const createPokemon = async(req=request, res=response)=>{
  const{name}=req.body;
    if(!name){
        res.status(400).send('pokemon field is required')
        return
    }
    let conn
    try{ 
        conn = await pool.getConnection()
        const pokemon_exist = await conn.query(pokemonsModel.getByPokemonName, [name]);
        if(pokemon_exist.length > 0){
            res.status(404).send('pokemon alredy exist')
            return
        }
        const newPokemon = await conn.query(pokemonsModel.createPokemon, [name])
        if(newPokemon.affectedRows === 0){
            res.status(500).send('Failed to create pokemon')
            return
        }
        res.status(201).send('Pokemon added successfully')

        } catch(error){
            res.status(500).send(error)
        } finally{
          if(conn) conn.end()
        }
}
const updatePokemon = async(req=request, res=response)=>{
    
  const {id} = req.params;
  const {name} = req.body;
  // Validar que el id sea un número
  if (isNaN(id)){
      res.status(400).send('Invalid ID');
      return;   
  }
  // Verificar que el campo name esté presente
  if (!name) {
      res.status(400).send('Name field is required');
      return;
  }
  let conn;
  try { 
      conn = await pool.getConnection();
      // Verificar si el Pokémon existe
      const pokemon_exist = await conn.query(pokemonsModel.getById, [id]);
      if (pokemon_exist.length === 0) {
          res.status(404).send('Pokemon does not exist');
          return;
      }
      // Actualizar el nombre del Pokémon
      const updateResult = await conn.query(pokemonsModel.updatePokemon, [name, id]);
      // Verificar si la actualización tuvo éxito
      if (updateResult.affectedRows === 0) {
          res.status(500).send('Failed to update Pokemon');
          return;
      }
      res.status(200).send('Pokemon updated successfully');
  } catch (error) {
      res.status(500).send(error);
  } finally {
      if (conn) conn.end();
  }
}
const deletePokemon = async(req=request, res=response)=>{
  const {id}=req.params
    if (isNaN(id)){
        res.status(400).send('invalid id')
        return;   
    }
    let conn
    try{ 
        conn = await pool.getConnection()
        const pokemon_exist = await conn.query(pokemonsModel.getById,[id])
        if(pokemon_exist.length === 0){
            res.status(404).send('pokemon no exist')
            return
        }
        const deletePokemon = await conn.query(pokemonsModel.deletePokemon, [id])
        if(deletePokemon.affectedRows === 0){
            res.status(500).send('Failed to delete pokemon')
            return
        }
        res.status(200).send('Pokemon deleted successfully')
        } catch(error){
            res.status(500).send(error)
        } finally{
          if(conn) conn.end()
        }

}

module.exports = {
    getAllPokemons,
    getPokemonById,
    get3RandomPokemons,
    createPokemon,
    updatePokemon,
    deletePokemon,
}