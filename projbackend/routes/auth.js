const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "password should be of atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "password password field is required").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.send(req.auth);
});

module.exports = router;
