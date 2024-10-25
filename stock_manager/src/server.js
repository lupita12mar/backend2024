const express = require("express");

const usersRoutes = require('./routes/users');


class Server{
    constructor(){
        this.app = express();
        this.port = 3000;

        this.app.use(express.json());
        
        this.middleweares();
        this.routes(); 
    }

    middleweares(){
        this.app.use(express.json());
    }


    routes(){
        this.app.use('/users', usersRoutes);
        }
    

    start(){
        this.app.listen(this.port, ()=> {
            console.log('Example app listening on port 3000! ' + this.port);
         });
    }
}

module.exports = {Server};


