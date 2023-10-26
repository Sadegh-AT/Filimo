const { graphqlHTTP } = require("express-graphql");
const { verifyAccessToken } = require("../middleware/verifyAccessToken.js");
const { authRoutes } = require("./auth.routes");
const { commentRoutes } = require("./comment.routes");
const { userRoutes } = require("./user.routes");
const { graphqlConfig } = require("../utils/graphql.config.js");

const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/user", verifyAccessToken, userRoutes);
router.use("/comment", verifyAccessToken, commentRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig));
module.exports = {
  AllRoutes: router,
};
