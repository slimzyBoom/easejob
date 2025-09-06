import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.config";
const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_env === "development" ? "dev" : "common"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

export default app;
