const { validationResult } = require("express-validator");
const { UserModel } = require("../models/user.model");
const createError = require("http-errors");
const { validatorHandler } = require("../utils/error-handler");
async function getAllUser(req, res, next) {
  try {
    const users = await UserModel.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          fullName: { $concat: ["$first_name", " ", "$last_name"] },
          email: 1,
          username: 1,
          phone: 1,
          isSubscription: 1,
          registerDate: 1,
        },
      },
    ]);
    res.send(users);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
}
async function getUser(req, res, next) {
  try {
    const user = await UserModel.findById(req.params.id, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      roles: 0,
    });

    res.send(user);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
}
async function deleteUserById(req, res, next) {
  try {
    const { id } = req.params;
    const resault = await UserModel.deleteOne({ _id: id });
    if (resault.deletedCount == 0)
      throw createError.BadRequest("Comment not found for delete");
    res.send({ message: "Delete Successfully" });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
}
async function editUser(req, res, next) {
  try {
    // const error = validationResult(req);
    // if (error?.errors?.length > 0) throw validatorHandler(error);
    const { first_name, last_name, email, username, phone, isSubscription } =
      req.body;
    const { id } = req.params;
    const user = await UserModel.findById({ _id: id });
    await UserModel.updateOne(
      { _id: id },
      {
        first_name: first_name ? first_name : user.first_name,
        last_name: last_name ? last_name : user.last_name,
        email: email ? email : user.email,
        username: username ? username : user.username,
        phone: phone ? phone : user.phone,
        isSubscription: isSubscription ? isSubscription : user.isSubscription,
      }
    );
    res.send({ message: "Update User Successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUser,
  getUser,
  deleteUserById,
  editUser,
};
