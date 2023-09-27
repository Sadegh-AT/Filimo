const { UserModel } = require("../models/user.model");

async function getAllUser(res, req, next) {
  try {
    const result = await UserModel.find({});
    console.log(result);
  } catch (error) {
    next(error);
  }
}
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
    });
    // console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUser,
  register,
};
