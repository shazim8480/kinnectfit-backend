import express, { Application } from "express";
import cors from "cors";
import { routes } from "./routes";
const app: Application = express();

// using cors
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use("/api/kv1", routes);

export default app;
