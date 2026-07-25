import express  from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";


const app = express();
app.use(express.json());

app.use(loggerMiddleware);

app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
});

app.use("/auth" , authRoutes);
app.use("/users" , userRoutes);
app.use(errorHandler);
export default app;