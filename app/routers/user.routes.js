const { getAllUser } = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/getAllUser", getAllUser);


module.exports = {
  userRoutes: router,
};
