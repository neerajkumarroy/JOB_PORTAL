//Pakege import
import express from "express";
import dotenv from 'dotenv';
import color from 'colors';
import cors from 'cors';
const PORT = process.env.PORT || 8080;
const app = express();
//Dot Env config
dotenv.config();

//file import
import connectDB from "./config/db.js";
import testRoutes from './routes/testRouts.js'
import morgan from "morgan";


app.use(cors());

//mongoDB connection
connectDB();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/test", testRoutes);

app.listen(PORT, () => {
    console.log(`App is running on the port number ${PORT}`.bgBlue.white);
});