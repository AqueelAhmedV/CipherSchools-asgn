const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");


const validateRegisterInput = require("../../validation/register");

const User = require("../../models/User");
const keys = require("../../config/keys");

// @route  GET api/users/test
// @desc   Tests users route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "users works!" }));

// @route  POST api/users/register
// @desc   Registers users
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
    console.log(errors, isValid)
  if (!isValid) {
    console.log("here 1")
    return res.status(400).json(errors);
  } 
  else {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors);
      } else {
        const newUser = new User(req.body);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err);
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// @route  POST api/users/login
// @desc   logs in user
// @access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
        
      return res.status(404).json({ email: "User not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched

        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 21600 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
