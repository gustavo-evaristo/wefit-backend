import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import { customerRoute } from "./infra/http/routes/customer.route";

const app = express();

app.use(express.json());

app.use("/", customerRoute);

function errorHandling(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(400).json({
    errro: err.message,
  });
}

app.use(errorHandling);

const port = process.env.PORT || 4568;

app.listen(port, () => console.log(`Escutando na porta ${port}`));
