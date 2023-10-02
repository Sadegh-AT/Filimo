const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "20s" });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw {
      status: 401,
      message: "token is invalid, please login",
    };
  }
}
module.exports = {
  signToken,
  verifyToken,
};
