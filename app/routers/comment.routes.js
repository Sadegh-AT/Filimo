const {
  getAllComment,
  searchComment,
  createComment,
  deleteCommentById,
  getUserComments,
} = require("../controllers/comment.controller");
const { checkAdminAccess } = require("../middleware/checkAdminAccess");
const {
  checkUserCanDeleteComment,
} = require("../middleware/checkUserCanDeleteComment");
const router = require("express").Router();

router.get("/", getAllComment);
router.get("/search", checkAdminAccess, searchComment);
router.get("/user-comment", getUserComments);
router.post("/create", createComment);
router.delete(
  "/delete/:id",
  checkAdminAccess,
  checkUserCanDeleteComment,
  deleteCommentById
);
module.exports = {
  commentRoutes: router,
};
