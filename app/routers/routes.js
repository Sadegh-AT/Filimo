const { apiKeyMiddleware } = require("../middleware/apiKey");
const { authRoutes } = require("./auth.routes");
const { userRoutes } = require("./user.routes");

const router = require("express").Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = {
  AllRoutes: router,
};
