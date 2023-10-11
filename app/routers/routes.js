const { apiKeyMiddleware } = require("../middleware/apiKey");
const { authRoutes } = require("./auth.routes");
const {commentRoutes} = require("./comment.routes");
const { userRoutes } = require("./user.routes");

const  router  = require("express").Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/comment", commentRoutes);

module.exports = {
  AllRoutes: router,
};
