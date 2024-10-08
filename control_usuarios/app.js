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


app.get("/usuarios/:id",(req, res)=>{
    const {id}=req.params;
    //const params = req.params;
    //console.log(params);
    //console.log(typeof(+id));
    const usuario= usuarios.find((usuario)=>usuario.id === +id);
   if(usuario===undefined){
    res.status(404).send({error:`el usuario con id ${id} no existe`});
    return;
   };
    res.status(200).send(usuario);
    //res.status(200).send("probando");

});//end point


app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000")
});

