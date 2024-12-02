const {request, response} = require('express');
const pool = require('../db/connection');
const userQueries = require('../models/users');

const getAllUsers = async (req = request, res = response)=> {
    let conn;

    try{
        conn = await createPool.getConnection();
        const users = await conn.query(userQueries.getAll);

        res.json(users);
        return;
    }catch(err){
        res.status(500).json(err);
    }finally{
        if (conn) conn.end();
    }
}

module.exports= {
    getAllUsers,
};