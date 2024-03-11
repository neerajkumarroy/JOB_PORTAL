import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobControllers } from "../controllers/jobController.js";

const router = express.Router();

//Routs
//CREATE JOB || POST

router.post("/create-job", userAuth, createJobControllers);

export default router;
