const{request, response}=require('express');
const pool = require('../db/connection');
const { usersQueries } = require('../models/users');
/*const users=[
    {id: 1, name: 'lady'},
    {id: 2, name: 'Sthefany'},
    {id: 3, name: 'Agustin'},
];*/

/*const getAll=(req=request, res=response)=>{
  res.send(users);
}*/

const getAllUsers=async(req=request, res=response)=>{
  let conn;
  try{
    conn=await pool.getConnection();
    const users=await conn.query(usersQueries.getAll);
    res.send(users);

  } catch(error){
    res.status(500).send(error);//'Internal server error'
    return;
  }finally{
    if(conn) conn.end();

  }
    //res.send(users);
}

const getUserById=async(req=request, res=response)=>{
    const {id}=req.params;

    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
      }

      let conn;
      try{
        conn=await pool.getConnection();
        const user=await conn.query(usersQueries.getById, [+id]);
        if(user.length===0){
          res.status(404).send('User not found');
          return;
        }

        res.send(user);

      }catch(error){
        res.status(500).send(error);

      }finally{
        if(conn) conn.end();
      }

      //const user  = users.find(user => user.id === +id); 
}

// TAREA que explico el profesor en clase
// Crear un nuevo usuario
//const user= users.find(user=>user.name===name);

const createUser = async(req = request, res = response) => {
  const {username,password,email} = req.body;

  if (!username || !password || !email) {
      res.status(400).send('Bad request');
      return;
  }

  let conn;

  try{
    conn=await pool.getConnection();

    const user=await conn.query(usersQueries.getByUsername,[username]);

    if(user.length>0){
      res.status(409).send('User alredy exists');
      return;
    }

    const newUser=await conn.query(usersQueries.create, [username,password,email]);

    if(newUser.affecteRows===0){
      res.status(500).send('User not be created');
      return;
    }
    //console.log(newUser);

    res.status(201).send("User Created succesfully")

  }catch(error){
    res.status(500).send(error);
    return;

  }finally{
    if(conn) conn.end();
  }

  //users.push({id:users.length+1, name});
  //res.send('User created succesfully');
}

// Actualizar un usuario
const updateUser = (req = request, res = response) => {
  const {id} = req.params;
  const {name} = req.body;

  if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
  }

  const user = users.find(user => user.id === +id);

  if (!user) {
      res.status(404).send('User not found');
      return;
  }

  users.forEach(user=>{
    if(user.id===+id){
        user.name=name;
    }
});
res.send('user update succerfully');
}

// Eliminar un usuario por ID
const deleteUser = (req = request, res = response) => {
  const {id} = req.params;

  if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
  }

  const user = users.find(user => user.id === +id);

  if (!user) {
    res.status(404).send('User not found');
    return;
}

  users.splice(users.findIndex ((user)=>user.id===+id),1);
  res.send('User deleted');
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };