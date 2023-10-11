const router = require("express").Router();

router.get("/");
router.get("/search");
router.post("/create");
router.delete("/delete/:id");
module.exports = {
  authRoutes: router,
};
