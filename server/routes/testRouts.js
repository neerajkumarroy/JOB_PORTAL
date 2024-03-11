import express from "express";
import testPostController from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routs
router.post("/test-post", userAuth, testPostController);

export default router;
