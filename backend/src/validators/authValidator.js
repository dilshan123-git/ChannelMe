const { body } = require("express-validator");

exports.registerValidator = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must contain at least 2 characters"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password must contain at least 6 characters"
    ),
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];