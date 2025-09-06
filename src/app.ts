import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.config";
import connectDB from "./config/db.config";
const app = express();

connectDB();

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "common"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    timestamp: new Date().toISOString(),
  });
});

export default app;
