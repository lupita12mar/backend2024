const express = require("express");

const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const staffRouters = require('./routes/staff');
const suppliersRoutes = require('./routes/suppliers');
const purchasesRoutes = require('./routes/purchases'); 

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
        this.app.use('/products', productsRoutes);
        this.app.use('/staff', staffRouters);
        this.app.use('/suppliers', suppliersRoutes);
        this.app.use('/purchases', purchasesRoutes);  
        }
    

    start(){
        this.app.listen(this.port, ()=> {
            console.log('Example app listening on port 3000! ' + this.port);
         });
    }
}

module.exports = {Server};


