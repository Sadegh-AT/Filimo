const { register, login } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
module.exports = {
  authRoutes: router,
};
