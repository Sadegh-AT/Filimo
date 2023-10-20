const { body } = require("express-validator");

const editUserValidator = () => [
  body("first_name")
    .matches(/^[\p{L}\s]*$/u)
    .isString()
    .trim(),
  body("last_name")
    .matches(/^[\p{L}\s]*$/u)
    .isString()
    .trim(),
  body("email").isEmail().withMessage("Ensure email value is unique"),
  body("username")
    .matches(/^[A-Za-z0-9_]+$/)
    .trim()
    .withMessage("Ensure username value is unique"),

  body("phone")
    .trim()
    .isMobilePhone("fa-IR")
    .withMessage("Ensure phone value is Persian Format"),

  body("isSubscription").isBoolean().withMessage("just true or false value"),
];

module.exports = {
  editUserValidator,
};
