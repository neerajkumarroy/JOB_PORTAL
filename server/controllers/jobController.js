import mongoose from "mongoose";
import monent from "moment";
import jobsModel from "../models/jobsModel.js";
import moment from "moment";

const { Schema } = mongoose;

/////------CREATE JOBS ---------------////////////
export const createJobControllers = async (req, resp, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  resp.status(200).json({ job });
};

//////////////--------GET JOBS-----------//////////////
export const getAllJobsControllers = async (req, resp, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  resp.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

///////------UPDATE JOBS--------////////////////
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //Response Send
  res.status(200).json({ updateJob });
};

/////////-------THIS IS THE DELETE JOBS -------------//////////////
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobsModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No Job Found With This id: ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are Not Authorized to delete this job...!");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "Job Deleted Successfully...!" });
};

//////////---------JOB STATS AND FILTER------------///////////
export const jobStatsController = async (req, resp) => {
  const stats = await jobsModel.aggregate([
    //serch by userjobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //DEFAULT STATS
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  //Monthly or yearly stats

  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  ////-----In the code, format the month and year with the help of the moment package -----------////
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM y");
      return { date, count };
    })
    .reverse();
  resp
    .status(200)
    .json({ totaljobs: stats.length, defaultStats, monthlyApplication });
};
