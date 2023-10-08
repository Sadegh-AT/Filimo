const { body } = require("express-validator");

const registerValidator = () => [
  body("first_name")
    .matches(/^[\p{L}\s]*$/u)
    .isString()
    .trim()
    .notEmpty(),
  body("last_name")
    .matches(/^[\p{L}\s]*$/u)
    .isString()
    .trim()
    .notEmpty(),
  body("email").isEmail().withMessage("Ensure email value is unique"),
  body("username")
    .trim()
    .isAlphanumeric()
    .notEmpty()
    .withMessage("Ensure username value is unique"),

  body("phone")
    .trim()
    .isMobilePhone("fa-IR")
    .withMessage("Ensure phone value is Persian Format"),
  body("password").isAlphanumeric().isLength({ min: 6 }),
];

module.exports = {
  registerValidator,
};
