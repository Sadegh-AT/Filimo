const { UserModel } = require("../models/user.model");

async function getAllUser(req, res, next) {
  try {
    const result = await UserModel.find({}).limit(10).sort({ createdAt: -1 });
    console.log("New Req: " + req.connection.remoteAddress);
    res.json(result);
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
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUser,
  register,
};
