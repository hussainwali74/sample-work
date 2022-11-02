import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import { seedData } from "./seeder";
import myDataSource from "./app-data-source";
import { DataSource } from "typeorm";
import Utils from "./services/utils.service";

/**
 * uncomment the below IIFE to seed db to local db 
 */
// (async ()=>{
// let dataSource = await myDataSource.initialize()
//   await seedData(dataSource);
// })();

dotenv.config();

const app: Express = express();
app.use(express.json());

// morgan for logging
app.use(morgan("tiny"));
// static
app.use(express.static("public"));
//routes
app.use(router);

//swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️ Server is running at https://localhost:${port}`);
});
