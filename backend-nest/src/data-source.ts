import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'

export const AppDataSource  = new DataSource({
    type:'postgres',
    host:process.env.DB_HOST,
    port:+process.env.DB_PORT,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB,
    synchronize:false,
    logging:false,
    entities:[],
    migrations:['./src/migration/*.ts'],
    subscribers:[]
})