import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });
};

export const signIn = async (req, res) => {
  try {
    const { userName, fullName, email, password } = req.body;

    if (!userName || !fullName || !email || !password) {
      return res.status(400).json({ message: "All parameters all required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email format is not valid" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "This email is already lalao" });
    }

    const userNameExists = await User.findOne({ userName });
    if (userNameExists) {
      return res
        .status(400)
        .json({ message: "This username is already taken" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "The password must be at least 6 characters long" });
    }

    const newUser = new User({
      userName,
      fullName,
      email,
      password,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    generateToken(user._id, res);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try{
    const user = await User.findById(req.user._id).select("-password")

    if(!user) return res.status(400).json({error: "User not found"})

    res.status(200).json(user)
  }catch(err){
    console.log(err)
  }
}