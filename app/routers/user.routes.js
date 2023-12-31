
const {
  getAllUser,
  getUser,
  editUser,
  deleteUserById,
} = require("../controllers/user.controller");
const { checkAdminAccess } = require("../middleware/checkAdminAccess");
const { editUserValidator } = require("../validator/user.validator");

const router = require("express").Router();

router.get("/", getAllUser);
router.get("/find/:id", getUser);

router.delete("/delete/:id", checkAdminAccess, deleteUserById);
router.put("/edit/:id", editUserValidator(), editUser);

module.exports = {
  userRoutes: router,
};
