const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


// registration (sign up)
const register = async (req, res) => {
  try {
    // get user data from body
    const { username, email, password } = req.body;

    // check user is already exist or not
    const userIsExist = await User.findOne({ email });
    if (userIsExist) {
      return res.status(401).json({ msg: "User alredy exist" });
    }

    // hash the password
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    // create new user
    const createUser = await User.create({ username, email, password: hashedPassword });

    console.log(createUser);

    return res.status(200).json({
      msg: "Registration successful",
      token: await createUser.generateToken(),
      userId: createUser._id.toString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

// login (sign in)
const login = async (req, res) => {
  try {
    // get user data from body
    const { email, password } = req.body;

    // check user is already registerd or not
    const isRegisterd = await User.findOne({ email });
    if (!isRegisterd) {
      return res.status(401).json({ msg: "user is not registerd yet!" });
    }

    // compare the password with hashed
    const comparePassword = await bcrypt.compare(password, isRegisterd.password);

    // check if true or false
    if (!comparePassword) {
      return res.status(401).json({ msg: "password is invalid! Try again" });
    }

    return res.status(200).json({
      msg: "Login successfully",
      token: await isRegisterd.generateToken(),
      userId: isRegisterd._id.toString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

// check the one user authentication
const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log("User data: ", userData);
    // console.log(userData.email);
    return res.status(200).json({ userData });
  } catch (error) {
    return res.status(400).json({ msg: "user data not fetched" });
  }
};

// fetch all user data from DB
const usersData = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    // console.log("All users are: ", users);
    return res.status(200).json({ msg: users });
  } catch (error) {
    return res.status(401).json({ msg: "all users can't be fetched from db" });
  }
};
module.exports = { register, login, user, usersData };
