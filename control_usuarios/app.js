const express=require("express");

const app=express();

app.get("/usuarios", (req, res)=> {
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
    res.status(200).send(usuarios);
})//obtener informacion

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000")
});

