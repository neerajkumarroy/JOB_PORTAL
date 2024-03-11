import JWT from "jsonwebtoken";

const userAuth = async (req, resp, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Authentication Failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.SECRET_KEY);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("Authentication Failed");
  }
};

export default userAuth;
