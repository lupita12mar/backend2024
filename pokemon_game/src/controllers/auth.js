const {request, response} = require ('express');
const bcrypt = require('bcrypt');
const { use } = require('../routes/auth');

const login = async (req = request, res = response) =>{
    const{email, password} = req.body;
    if (!email || !password){
        res.status(400).send({
            message:"Some fields are missing"
        })
        return;
    }
let conn;
try{
    conn =await createPool.getConnection();
    const[user] = await conn.query (userQueries.getEmail, [email]);

    if (!user) {
        res.status(404).send({
            message: "User not found"
        })
        return;
}

    const valid = await bcrypt.compare(password, user.password);

if (!valid) {
    res.status(401).send({
        message: "Invalid credentials"
    })
    return;
}

res.status(200).send ({
    message: "Successfully logged in",
    user
});

}catch(err) {
    res.status(500).send(err);
    return;
}finally{
    if (conn) conn.end();
}

module.exports = {
    login
}
};