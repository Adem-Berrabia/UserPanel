require("dotenv").config(); 

var jwt = require("jsonwebtoken");
const AuthUser = require("../models/authUser");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const requireAuth = (req, res, next) => {
  console.log("before run the function");
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, (err) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
const checkIfUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const currentUser = await AuthUser.findById(decoded.id);
        res.locals.user = currentUser;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports = { requireAuth, checkIfUser };
