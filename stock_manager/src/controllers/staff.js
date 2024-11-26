const{request, response}=require('express');
const pool = require('../db/connection');
const { staffQueries } = require('../models/staff');

const getAllStaff=async(req=request, res=response)=>{
  let conn;
  try{
    conn=await pool.getConnection();
    const staff=await conn.query(staffQueries.getAll);
    res.send(staff);

  } catch(error){
    res.status(500).send(error);//'Internal server error'
    return;
  }finally{
    if(conn) conn.end();

  }
    //res.send(users);
}

const getStaffById=async(req=request, res=response)=>{
    const {id}=req.params;

    console.log("getStaffById", (id));

    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
      }

      let conn;
      try{
        conn=await pool.getConnection();
        const staffMember=await conn.query(staffQueries.getById, [+id]);
        if(staffMember.length===0){
          res.status(404).send('Staff member not found');
          return;
        }

        res.send(Member);



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

const createStaff = async(req = request, res = response) => {
  const {first_name,
    last_name,
    birth_date,
    gender, 
    phone_number,
    email, 
    address, 
    user_id,
   } = req.body;

  if (first_name,
    last_name,
    birth_date,
    gender, 
    phone_number,
    email, 
    address, 
    user_id) {
      res.status(400).send('Bad request');
      return;
  }

  let conn;

  try{
    conn=await pool.getConnection();

    const staffMember = await conn.query(staffQueries.getByEmail,[email]);

    if(user.length>0){
      res.status(409).send('Email alredy exists');
      return;
    }

    const newStaffMember = await conn.query(staffQueries.create, [
      first_name,
     last_name,
     birth_date,
     gender, 
     phone_number,
     email, 
     address, 
     user_id,
    ]);

    if(newStaffMember.affectedRows===0){
      res.status(500).send('Staff member not be created');
      return;
    }
    //console.log(newUser);

    res.status(201).send("Staff member Created succesfully")

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
const updateStaff = async (req = request, res = response) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    birth_date,
    gender, 
    phone_number,
    email, 
    address, 
    user_id,
   } = req.body;

  if (isNaN(id) || !username ) {
      res.status(400).send('Invalid request');
      return;
  }

let conn;
try{
conn = await pool.getConnection();

const staffMember = await conn.query(staffQueries.getById, [+id]);
if (staffMember.length ==0){
  res.status(404).send('Staff member not found');
  return;
}

const updateStaffMember = await conn.query(staffQueries.update, [
    first_name,
    last_name,
    birth_date,
    gender, 
    phone_number,
    email, 
    address, 
    user_id,
    +id
]);

if (updateStaffMember.affectedRows ==0){
  res.status(500).send('Staff member could not be update')
  return;
}

res.status(200).send(200).send("Staff member update succesfully");
}catch(error){
  res.status(500).send(error);
  return;
}finally {
  if (conn) conn.end();
    }



  try {
      conn = await pool.getConnection();
      
      // Verificar si el usuario existe
      const user = await conn.query(staffQueries.getById, [+id]);
      if (staffMember.length === 0) {
          res.status(404).send('not found');
          return;
      }
      
      // Actualizar usuario
      const result = await conn.query(staffQueries.update, [username, +id]);
      
      if (result.affectedRows === 0) {
          res.status(500).send(' not be updated');
          return;
      }

      res.send('User updated ');
  } catch (error) {
      res.status(500).send(error);
  } finally {
      if (conn) conn.end();
  }
};
// Eliminar un usuario por ID
const deleteStaff = async(req = request, res = response) => {
  const {id} = req.params;

  if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
  }
let conn;
  try{
    conn=await pool.getConnection();
        const staff =await conn.query(staffQueries.getById, [+id]);
        if(staffMember.length===0){
          res.status(404).send('Staff member not found');
          return;
        }

        const deleteStafMember = await conn.query(staffQueries.delete, [+id]);
      
      if (deletedStaffMember.affectedRows === 0) {
          res.status(500).send('Staff member could not be deleted');
          return;
      }
      res.send('Staff member deleted succesfully');

  }catch(error){
    res.status(500).send(error);
  }finally{
    if (conn) conn.end();
  }


};

module.exports = { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff };