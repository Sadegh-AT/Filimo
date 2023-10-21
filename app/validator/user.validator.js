const { body } = require("express-validator");

const editUserValidator = () => [
  body("first_name")
    .optional()
    .matches(/^[\p{L}\s]*$/u)
    .isString()
    .trim(),
  body("last_name")
    .optional()
    .matches(/^[\p{L}\s]*$/u)
    .isString()
    .trim(),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Ensure email value is unique"),
  body("username")
    .optional()
    .matches(/^[A-Za-z0-9_]+$/)
    .trim()
    .withMessage("Ensure username value is unique"),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone("fa-IR")
    .withMessage("Ensure phone value is Persian Format"),

  body("isSubscription").isBoolean().withMessage("just true or false value"),
];

module.exports = {
  editUserValidator,
};
