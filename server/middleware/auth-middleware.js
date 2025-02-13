const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized HTTP, token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  // console.log("trimmed token: ", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log("token verified:", isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
    console.log("userData without password: ", userData);

    req.user = userData;


    next();
  } catch (error) {
    return res.status(400).json({ msg: "Unauthorized. Invalid token" });
  }
};

module.exports = authMiddleware;