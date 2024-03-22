import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  getUserController,
  updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

//GET User
//GET User data
router.post("/getUser", userAuth, getUserController);
//UPDATE User
router.put("/update-user", userAuth, updateUserController);

export default router;
