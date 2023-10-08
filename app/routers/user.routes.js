const { getAllUser, getUser } = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/getAllUser", getAllUser);
router.get("/getUser/:id", getUser);

module.exports = {
  userRoutes: router,
};
