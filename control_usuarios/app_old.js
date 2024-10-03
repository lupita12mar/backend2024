const express = require('express');

const app = express();

app.get("/", (req, res)=>{
    res.status(200).send("Hola Mundo!");
}) ;

app.post("/", (req, res)=>{
    res.status(200).send("Hola desde post!");
}) ;
//crea un nuevo recurso completo(sustituye)
app.put("/", (req, res)=>{
    res.status(200).send("Hola desde put!");
}) ;
//actualizar un recurso parcial
app.patch("/", (req, res)=>{
    res.status(200).send("Hola desde patch!");
}) ;
//elimina el recurso
app.delete("/", (req, res)=>{
    res.status(200).send("Hola desde delete!");
}) ;

app.listen(3000,()=>{
    console.log("servidor corriendo en http://localhost:3000");
});