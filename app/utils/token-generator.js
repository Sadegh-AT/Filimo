const jwt = require("jsonwebtoken");
const createError = require("http-errors");

require("dotenv").config();
const secret = process.env.SECRET;

function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "120s" });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw createError.Unauthorized("token is expired, please login..");
  }
}
module.exports = {
  signToken,
  verifyToken,
};
