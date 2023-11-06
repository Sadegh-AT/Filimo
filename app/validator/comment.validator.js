const { body } = require("express-validator");

const createCommentValidator = () => [body("first_name").isString()];

module.exports = {
  createCommentValidator,
};
