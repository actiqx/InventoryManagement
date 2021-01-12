const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashpwd) => {
      const user = new User({
        email: email,
        password: hashpwd,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User Created", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let Loadeduser;
  User.findOne({ email: email })
    .then((userdoc) => {
      if (!userdoc) {
        const error = new Error("User Not Found");
        error.statusCode = 401;
        throw error;
      }
      Loadeduser = userdoc;

      return bcrypt.compare(password, userdoc.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: Loadeduser.email,
          userID: Loadeduser._id.toString(),
        },
        "someSecretKey",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userID: Loadeduser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
