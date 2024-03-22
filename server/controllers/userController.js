import userModel from "../models/userModel.js";

export const updateUserController = async (req, resp, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    return resp.status(400).json({ message: "Please provide all fields" });
  }
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.user.userId },
      { name, lastName, email, location },
      { new: true }
    );

    if (!user) {
      return resp.status(200).send({ message: "User not found" });
    }

    const token = user.createJWT();
    resp.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error" });
  }
};

export const getUserController = async (req, resp) => {
  try {
    const user = await userModel.findById({ _id: req.user.userId });
    user.password = undefined;
    if (!user) {
      return resp
        .status(200)
        .send({ message: "User not found", success: false });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      message: "auth Error",
      success: false,
      error: error.message,
    });
  }
};
