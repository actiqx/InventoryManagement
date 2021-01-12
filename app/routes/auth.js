const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authCtrl = require("../controllers/auth");
const User = require("../models/user");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email. ")
      .custom((value) => {
        return User.findOne({ email: value }).then((userdoc) => {
          if (userdoc) {
            return Promise.reject("Email Already exist");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password will be greater than 5 character"),
    body("name").trim().not().isEmpty(),
  ],
  authCtrl.signup
);

router.post("/login", authCtrl.login);
module.exports = router;
