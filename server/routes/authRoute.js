import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

//Routs object
const router = express.Router();

//routs
//Register || POST
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

export default router;
