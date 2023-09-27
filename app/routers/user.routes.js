const { getAllUser, register } = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/getAllUser", getAllUser);
router.post("/register", register);

module.exports = {
  userRoutes: router,
};
