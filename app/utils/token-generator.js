const jwt = require("jsonwebtoken");
const createError = require("http-errors");

require("dotenv").config();
const secret = process.env.SECRET;

function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "20s" });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw createError.InternalServerError(error.message);
  }
}
module.exports = {
  signToken,
  verifyToken,
};
