const { UserModel } = require("../models/user.model");
const PersianDate = require("../utils/persianDate");

async function register(req, res, next) {
  try {
    const { first_name, last_name, email, username, phone, password } =
      req.body;
    const result = await UserModel.create({
      first_name,
      last_name,
      email,
      username,
      phone,
      password,
      registerDate: new PersianDate().now(),
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  register,
};
