import {Sequelize} from 'sequelize'
import * as dotenv from 'dotenv';
dotenv.config()

export const db = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,{
        dialect:'sqlite',
        storage:'../__test__',
        host:process.env.DATABASE_HOST,
        port:process.env.DATABASE_PORT
    }   
    
)

