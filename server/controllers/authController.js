import userModel from "../models/userModel.js";
import UserModel from "../models/userModel.js";

export const registerController = async (req, resp, next) => {
  const { name, email, password } = req.body;
  //Validate
  if (!name) {
    next("Name is Require");
  }
  if (!email) {
    next("Email is Require");
  }
  if (!password) {
    next("password is Require Gratter then 6 Character ");
  }
  //Check Exisiting User
  const exisitingUser = await UserModel.findOne({ email });
  if (exisitingUser) {
    return resp.status(200).send({
      success: false,
      message: "Email Already Register Please Login",
    });
  }
  const user = await UserModel.create({ name, email, password });
  //TOKEN
  const token = user.createJWT();
  resp.status(201).send({
    success: true,
    message: "User Create Succesfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

//This is the Login API
export const loginController = async (req, resp, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //Find user by eamil
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalide Usernmae or Password");
  }
  //Compare Password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalide Usernmae or Password");
  }
  user.password = undefined;
  const token = user.createJWT();
  resp.status(200).json({
    success: true,
    message: "Login SuccesFully",
    user,
    token,
  });
};
