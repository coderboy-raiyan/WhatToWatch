import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["*"], credentials: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!@");
});

export default app;
