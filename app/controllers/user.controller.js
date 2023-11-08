const { validationResult } = require("express-validator");
const { UserModel } = require("../models/user.model");
const createError = require("http-errors");
const { validatorHandler } = require("../utils/error-handler");

// get all users
async function getAllUser(req, res, next) {
  try {
    const users = await UserModel.aggregate([
      { $match: { roles: { $ne: ["USER", "ADMIN"] } } },
      {
        $project: {
          fullName: { $concat: ["$first_name", " ", "$last_name"] },
          email: 1,
          username: 1,
          phone: 1,
          isSubscription: 1,
          registerDate: 1,
          roles: 1,
        },
      },
    ]);
    res.send(users);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
}

// get one user
async function getUser(req, res, next) {
  try {
    const user = await UserModel.findById(req.params.id, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      roles: 0,
    }).populate("comments");

    res.send(user);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
}

// delete user by id
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

// edit user
async function editUser(req, res, next) {
  try {
    const error = validationResult(req);
    if (error?.errors?.length > 0) throw validatorHandler(error);
    const { first_name, last_name, email, username, phone, isSubscription } =
      req.body;
    console.log(first_name, last_name, email, username, phone, isSubscription);
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
        isSubscription:
          isSubscription != undefined ? isSubscription : user.isSubscription,
      }
    );
    res.send({ message: "Update User Successfully" });
  } catch (error) {
    next(error);
  }
}

// seach user
async function searchUser(req, res, next) {
  try {
    console.log(allUsers());
    let { method, text } = req.query;
    if (!text) {
      res.send(await allUsers());
      return;
    }
    text = text.toString().replace("+", " ").trim();
    const reg = new RegExp(text, "gi");
    const users = await UserModel.aggregate([
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
    switch (method) {
      case "username":
        searchUserByUsername(users, reg, req, res, next);
        break;

      case "phone":
        searchUserByPhone(users, reg, req, res, next);
        break;

      case "fullname":
        searchUserByName(users, reg, req, res, next);
        break;

      default:
        searchUserByName(users, reg, req, res, next);
        break;
    }
  } catch (error) {
    next(error);
  }
}

// search methods
async function searchUserByUsername(users, reg, req, res, next) {
  try {
    const seachedUsers = users.filter((user) => user.username.match(reg));
    res.send(seachedUsers);
  } catch (error) {
    next(error);
  }
}
async function searchUserByPhone(users, reg, req, res, next) {
  try {
    const seachedUsers = users.filter((user) => user.phone.match(reg));
    res.send(seachedUsers);
  } catch (error) {
    next(error);
  }
}
async function searchUserByName(users, reg, req, res, next) {
  try {
    const seachedUsers = users.filter((user) => user.fullName.match(reg));
    res.send(seachedUsers);
  } catch (error) {
    next(error);
  }
}
async function allUsers() {
  const users = await UserModel.aggregate([
    { $match: { roles: { $ne: ["USER", "ADMIN"] } } },
    {
      $project: {
        fullName: { $concat: ["$first_name", " ", "$last_name"] },
        email: 1,
        username: 1,
        phone: 1,
        isSubscription: 1,
        registerDate: 1,
        roles: 1,
      },
    },
  ]);
  return users;
}
module.exports = {
  getAllUser,
  getUser,
  deleteUserById,
  editUser,
  searchUser,
};
