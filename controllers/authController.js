const AuthUser = require("../models/authUser");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const get_welcome = (req, res) => {
  res.render("welcome");
};
const get_signout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
const get_login = (req, res) => {
  res.render("auth/login");
};
const get_signup = (req, res) => {
  res.render("auth/signup");
};
const post_signup = async (req, res) => {
  try {
    // check validation email and password
    const objError = validationResult(req);
    if (objError.errors.length > 0) {
      return res.json({
        arrvalidationError: objError.errors,
      });
    }
    // check if email already exist
    const isCurrentEmail = await AuthUser.findOne({ email: req.body.email });
    if (isCurrentEmail) {
      return res.json({ existEmail: "Email already exist" });
    }
    // create new user and login
    const newUser = await AuthUser.create(req.body);
    var token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
    res.json({ id: newUser._id });
  } catch (error) {
    console.log(error);
  }
};
const post_login = async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ email: req.body.email });
    if (loginUser === null) {
      res.json({ notFoundEmail: "Email not found, try to sign up" });
    } else {
      const match = await bcrypt.compare(req.body.password, loginUser.password);
      if (match) {
        var token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET_KEY);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.json({ id: loginUser._id });
      } else {
        res.json({ passwordError: `Incorrect password for ${req.body.email}` });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const post_profileImg = (req, res) => {
  cloudinary.uploader.upload(
    req.file.path,
    { folder: "x-system/profile-img" },
    async (error, result) => {
      if (result) {
        var decoded = jwt.verify(req.cookies.jwt, JWT_SECRET_KEY);
        const Avatar = await AuthUser.updateOne(
          { _id: decoded.id },
          { profileImg: result.secure_url }
        );
        res.redirect("/home");
      }
    }
  );
};
const delete_account = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, JWT_SECRET_KEY);
    await AuthUser.findByIdAndDelete(decoded.id);

    res.clearCookie("jwt");
    res.json({ success: true, message: "Your account has been deleted." });
  } catch (error) {
    console.error("Delete account error:", error);
    res.json({
      success: false,
      message: "Server error while deleting account.",
    });
  }
};

module.exports = {
  get_signout,
  get_login,
  get_signup,
  post_signup,
  post_login,
  get_welcome,
  post_profileImg,
  delete_account,
};
