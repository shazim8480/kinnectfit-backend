import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { routes } from "./routes";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();

// using cors
app.use(cors());

// parse data
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use("/api/kv1", routes);

app.use("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "The server is running",
  });
});

// Global error handler
app.use(globalErrorHandler);

// Handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Api Not Found",
      },
    ],
  });

  next();
});

export default app;
