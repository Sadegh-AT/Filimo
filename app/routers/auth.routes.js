const { register, login } = require("../controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../validator/auth.validator");

const router = require("express").Router();

router.post("/register", registerValidator(), register);
router.post("/login", loginValidator(), login);
module.exports = {
  authRoutes: router,
};
