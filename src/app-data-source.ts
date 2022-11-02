import { DataSource } from "typeorm";

// Using environment variables
import dotenv from "dotenv";
dotenv.config();

const myDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST||'localhost',
  port: process.env.DB_PORT?+process.env.DB_PORT:8000,
  username: process.env.DB_USERNAME||'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME||"respondio",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  // logging: true,
});

const x =myDataSource
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, );
    console.log('')
    console.log('--------------------------------------------------')
  });

export default myDataSource;
