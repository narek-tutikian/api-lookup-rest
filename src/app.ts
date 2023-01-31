import express, {json, urlencoded} from "express";
import { RegisterRoutes } from "./routes";
import * as swaggerJson from './swagger.json';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import {errorConverter, errorMiddleware} from "./core/error-handling/error.middleware";

export const app = express();

if (process.env.ENV !== 'production') {
  app.use(
    ['/api-docs', '/swagger'],
    swaggerUi.serve,
    swaggerUi.setup(swaggerJson)
  );
}


// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());
RegisterRoutes(app);
app.use(helmet());
app.use(express.json());
app.use(errorConverter);
app.use(errorMiddleware);
