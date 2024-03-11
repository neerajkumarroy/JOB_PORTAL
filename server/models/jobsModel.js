import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company Name is Require"],
    },
    Position: {
      type: String,
      require: [true, "Job Position is Require"],
      minlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "Internship", "contaract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Dehradun",
      required: [true, "Work Location is Require"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("job", jobSchema);
