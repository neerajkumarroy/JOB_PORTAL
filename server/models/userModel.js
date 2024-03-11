import mongoose from "mongoose";
import validator from "validator";
import bcript from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Require"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is Require"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is require"],
      minlength: [6, "password must be at least 6 characters long"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);
//Middleware
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcript.genSalt(10);
  this.password = await bcript.hash(this.password, salt);
});

//Compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcript.compare(userPassword, this.password);
  return isMatch;
};

//JWT TOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);
