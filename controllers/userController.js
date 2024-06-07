const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const registerationModel = require('../model/');
const userRegisterationModel = require("../models/userRegisterationModel");

const login = async (req, res) => {
  const { name, password } = req.body;
  console.log(req.body);
  console.log(process.env.JWT_SECRET);

  try {
    console.log("Searching for user...");
    const user = await userRegisterationModel.findOne({ where: { name } });

    if (!user) {
      console.log("User not found");
      return res.status(401).send({ auth: false, message: "Incorrect name" });
    }

    console.log("User found:", user);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    console.log("Password correct:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(401).send({ auth: false, message: "Incorrect password" });
    }

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("Generating token...");
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "24h" });
    console.log("Token generated:", token);

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).send({ auth: true, token, role: user.role });

  } catch (error) {
    console.error("Error during login process:", error);
    return res.status(500).send("Internal Server Error");
  }
};


const registerUser = async (req, res) => {
  const {
    name,
    phoneNumber,
    email,
    password,
    dateOfBirth,
    bloodGroup,
    donateBlood,
    role,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user record
    const newUser = await userRegisterationModel.create({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      dateOfBirth,
      bloodGroup,
      donateBlood,
      role,
    });

    // You might have additional logic here, such as sending confirmation emails, etc.

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userRegisterationModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      bloodGroup: user.bloodGroup,
      donateBlood: user.donateBlood,
      role: user.role,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userRegisterationModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.donateBlood = req.body.donateBlood || user.donateBlood;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;

    await user.save();

    const updatedUserData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      donateBlood: user.donateBlood,
      dateOfBirth: user.dateOfBirth,
      bloodGroup: user.bloodGroup,
    };

    res
      .status(200)
      .json({ message: "User profile updated successfully", updatedUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
  registerUser,
  getUserProfile,
  updateUserProfile,

  post: [
    {
      path: "/api/user/login",
      method: login,
    },
    {
      path: "/api/user/register/customer",
      method: registerUser,
    },
  ],
  get: [
    {
      path: "/api/user/profile",
      method: getUserProfile,
    },
  ],
};
