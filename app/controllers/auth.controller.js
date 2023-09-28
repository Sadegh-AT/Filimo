const { UserModel } = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash-password");
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
      password: hashPassword(password),
      registerDate: new PersianDate().now(),
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
}
async function login(req, res, next) {
  try {
    const { phone, password } = req.body;
    const user = await UserModel.findOne({ phone });
    if (!user) throw { status: 401, message: "phone or password is incorrect" };

    if (comparePassword(password, user.password)) {
      res.send({ message: "login successfully" });
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  register,
  login,
};
