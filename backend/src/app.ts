import express  from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";


const app = express();
app.use(express.json());

app.use(loggerMiddleware);

app.use(errorHandler);

app.use("/auth" , authRoutes);
app.use("/users" , userRoutes);
export default app;