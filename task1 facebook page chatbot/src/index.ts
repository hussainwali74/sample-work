import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "./entity/user.entity";
import { myDataSource } from "./app-data-source";
import morgan from "morgan";
import router from "./routes/routes";
import swaggerUi from "swagger-ui-express";


// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

dotenv.config();

const app: Express = express();
app.use(express.json());

// morgan for logging
app.use(morgan('tiny'))
// static
app.use(express.static('public'))
//routes
app.use(router)

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

/**
 * ---------------------------------------------------------------------
 */
// register routes
app.get("/users", async function (req: Request, res: Response) {
  const users = await myDataSource.getRepository(User).find();
  res.json(users);
});

app.get("/users/:id", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(User).findOneBy({
    id: +req.params.id,
  });
  return res.send(results);
});

app.post("/users", async function (req: Request, res: Response) {
  const user = await myDataSource.getRepository(User).create(req.body);
  const results = await myDataSource.getRepository(User).save(user);
  return res.send(results);
});

app.put("/users/:id", async function (req: Request, res: Response) {
  const user = <User> await myDataSource.getRepository(User).findOneBy({
    id: +req.params.id,
  });
  myDataSource.getRepository(User).merge(user, req.body);
  const results = await myDataSource.getRepository(User).save(user);
  return res.send(results);
});

app.delete("/users/:id", async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(User).delete(req.params.id);
  return res.send(results);
});

/**
 * ---------------------------------------------------------------------
 */

const port = process.env.PORT;

app.get("/api", (req: Request, res: Response) => {
  console.log("hello");
});

app.listen(port, () => {
  console.log(`⚡️ Server is running at https://localhost:${port}`);
});
