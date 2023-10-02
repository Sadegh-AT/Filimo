const { body } = require("express-validator");

const registerValidator = () => [
  body("first_name").isString().isAlpha().notEmpty(),
  body("last_name").isString().isAlpha().notEmpty(),
  body("email").isEmail(),
  body("username").isAlphanumeric().notEmpty(),
  body("phone").isMobilePhone("fa-IR"),
  body("password").isAlphanumeric().isLength({ min: 6 }),
];

module.exports = {
  registerValidator,
};
