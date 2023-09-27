const { apiKeyMiddleware } = require("../middleware/apiKey");
const { userRoutes } = require("./user.routes");

const router = require("express").Router();

router.use("/user", apiKeyMiddleware, userRoutes);

module.exports = {
  AllRoutes: router,
};
