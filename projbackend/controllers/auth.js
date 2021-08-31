const User = require("../models/user");
//express-validator me inbuilt check wale function rehte  hai
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  // console.log("REQ BODY : " , req.body);
  //checking error from express-validator

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  } //if

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to save user in database",
      });
    } //if

    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

//TODO:why we are not sending jwt token when user is signedUp?

exports.signin = (req, res) => {
  //validating requests
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      parameter: errors.array()[0].param,
    });
  } //if

  //desctructuering
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email used is not present in DB",
      });
    } //if

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password doesn't match",
      });
    } //if

    //create a token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //send a cookie
    res.cookie("token", token, {
      expire: new Date() + 9999,
    });

    //sending response to front-end
    const { _id, name, email, role } = user;
    return res.status(200).json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.send({
    message: "User has signed out",
  });
};

//TODO:protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//TODO:custom middleware
exports.isAuthenticated = (req, res, next) => {
  //profile frontend se set hota hai
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  //if(!0req.profile._id)
  if (req.profile._id === 0) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
