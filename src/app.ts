import express from 'express';
import * as dotenv from 'dotenv';
import { db } from './database/db'; // so de importar ele ja reconhece o banco 
import {UserModel} from './models/userModel'
import userRouter from './routes/userRouts'
import { Request, Response, NextFunction } from 'express';
// rota de usuarios
dotenv.config();


class AppController{
    express: any;
    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:true}));

        this.express.use((req:Request, res:Response,next:NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
          });
    }

    routes(){
        this.express.use(userRouter)
    }
}

export default new AppController().express

