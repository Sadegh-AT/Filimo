const { validationResult } = require("express-validator");
const { UserModel } = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash-password");
const PersianDate = require("../utils/persianDate");
const { signToken } = require("../utils/token-generator");
const { validatorHandler } = require("../utils/error-handler");
const createError = require("http-errors");

async function register(req, res, next) {
  try {
    const error = validationResult(req);
    if (error?.errors?.length > 0) throw validatorHandler(error);
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
    if (error.code === 11000) {
      // Customize the duplicate key error message
      next(
        createError.BadRequest(
          `Email "${Object.keys(
            error.keyValue
          )}" is already in use. Please choose a different value.`
        )
      );
    } else {
      next(error);
    }
  }
}
async function login(req, res, next) {
  try {
    const error = validationResult(req);
    if (error?.errors?.length > 0) throw validatorHandler(error);
    const { phone, password } = req.body;
    const user = await UserModel.findOne({ phone });
    if (!user) throw createError.Unauthorized("phone or password is incorrect");

    if (comparePassword(password, user.password)) {
      const token = signToken({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        isSubscription: user.isSubscription,
        loginTime: new PersianDate().now(),
      });

      const tokenStratgy = `Bearer ${token}`;

     

      res.send({ message: "login successfully", token: tokenStratgy });
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  register,
  login,
};
