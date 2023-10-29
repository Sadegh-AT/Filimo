const createError = require("http-errors");

// get all users
async function paymentGetway(req, res, next) {
  try {
    const zarinpal_requset_url =
      "https://api.zarinpal.com/pg/v4/payment/request.json";
      const zarinpal_option={
        
      }
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
}

module.exports = { paymentGetway };
