const express=require("express");

const app=express();
const usuarios=[
    {
        id: 1,
        nombre: "Guadalupe",
        apellido: "Martinez",
        email: "lupitajosmar1227@gmail.com"
    },
    {
        id: 2,
        nombre: "Marlene",
        apellido: "Martinez",
        email: "marly.1212@gmail.com"
    },
];
app.get("/usuarios", (req, res)=> {
    
    res.status(200).send({usuarios});
})//obtener informacion

app.get("/usuarios/:id", (req, res)=>{
const id = req.params;
const usuario= usuarios.find((usuario)=>usuario.id=== +id);
    
    res.status(200).send("probando");
});
app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000")
});

