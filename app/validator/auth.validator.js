const { body } = require("express-validator");

const registerValidator = () => [
  body("first_name")
    .matches(/^[\p{L}\s]*$/u)
    .isString()
    .notEmpty(),
  body("last_name")
    .matches(/^[\p{L}\s]*$/u)
    .isString()
    .notEmpty(),
  body("email").isEmail().withMessage("Ensure email value is unique"),
  body("username")
    .isAlphanumeric()
    .notEmpty()
    .withMessage("Ensure username value is unique"),

  body("phone")
    .isMobilePhone("fa-IR")
    .withMessage("Ensure phone value is unique"),
  body("password").isAlphanumeric().isLength({ min: 6 }),
];

module.exports = {
  registerValidator,
};
