const { register } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/register", register);
module.exports = {
  authRoutes: router,
};
