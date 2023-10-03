const { register, login } = require("../controllers/auth.controller");
const { registerValidator } = require("../validator/auth.validator");

const router = require("express").Router();

router.post("/register", registerValidator(), register);
router.post("/login", login);
module.exports = {
  authRoutes: router,
};
