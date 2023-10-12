const {
  getAllUser,
  getUser,
  editUser,
  deleteUserById,
} = require("../controllers/user.controller");
const { editUserValidator } = require("../validator/user.validator");

const router = require("express").Router();

router.get("/", getAllUser);
router.get("/find/:id", getUser);
router.delete("/delete/:id", deleteUserById);
router.put("/edit/:id", editUserValidator(), editUser);

module.exports = {
  userRoutes: router,
};
