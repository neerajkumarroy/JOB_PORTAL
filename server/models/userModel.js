import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Name is Require"],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is Require'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "password is require"],
    },
    location: {
        type: String,
        default: "India"
    }
}, { timestamps: true });

export default mongoose.model("user", userSchema);