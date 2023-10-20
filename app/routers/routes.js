const { verifyAccessToken } = require("../middleware/verifyAccessToken.js");
const { authRoutes } = require("./auth.routes");
const { commentRoutes } = require("./comment.routes");
const { userRoutes } = require("./user.routes");

const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/user", verifyAccessToken, userRoutes);
router.use("/comment", verifyAccessToken, commentRoutes);

module.exports = {
  AllRoutes: router,
};
