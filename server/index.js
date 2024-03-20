//Pakege import
import express from "express";
import dotenv from "dotenv";
import color from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
//security packges
import helmet from "helmet"; // Sequire header data
import xss from "xss-clean"; //protect the application for the Cross-site scripting
import mongoSanitize from "express-mongo-sanitize";

const PORT = process.env.PORT || 8080;
const app = express();

//Dot Env config
dotenv.config();

//file import
import connectDB from "./config/db.js";

import errorMiddleware from "./middlewares/errorMiddleware.js";
//routs Import
import testRoutes from "./routes/testRouts.js";
import authRouts from "./routes/authRoute.js";
import userRouts from "./routes/userRoutes.js";
import jobRouts from "./routes/JobsRoute.js";

app.use(cors());

//mongoDB connection
connectDB();

//Middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routs
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRouts);
app.use("/api/v1/user", userRouts);
app.use("/api/v1/job", jobRouts);

//Error Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App is running on the port number ${PORT}`.bgYellow.white);
});
