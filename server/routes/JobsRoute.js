import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobControllers,
  deleteJobController,
  getAllJobsControllers,
  jobStatsController,
  updateJobController,
} from "../controllers/jobController.js";

const router = express.Router();

//Routs
//CREATE JOB || POST
router.post("/create-job", userAuth, createJobControllers);

//GET JOBS || GET
router.get("/get-job", userAuth, getAllJobsControllers);

//UPDATE JOBS || PUT or PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOB ||  USING DELETE METHOD
router.delete("/delete-job/:id", userAuth, deleteJobController);

// JOB STATS and FILTER || GET METHOD
router.get("/job-stats", userAuth, jobStatsController);

export default router;
