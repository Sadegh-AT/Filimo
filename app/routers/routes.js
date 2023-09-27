const { userRoutes } = require("./user.routes");

const router = require("express").Router();

router.use("/user", userRoutes);

module.exports = {
  AllRoutes: router,
};
