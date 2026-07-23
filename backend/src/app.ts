import express  from "express";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";


const app = express();
app.use(express.json());

app.use(loggerMiddleware);

app.use(errorHandler);

export default app;