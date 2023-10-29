const { paymentGetway } = require("../controllers/payment.controller");

const router = require("express").Router();
router.post("/", paymentGetway);
router.post("/verify", () => {});

module.exports = {
  paymentRoutes: router,
};
