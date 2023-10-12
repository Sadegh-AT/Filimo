const {
  getAllComment,
  searchComment,
  createComment,
  deleteCommentById,
} = require("../controllers/comment.controller");
const router = require("express").Router();

router.get("/", getAllComment);
router.get("/search", checkAdminAccess, searchComment);
router.post("/create", createComment);
router.delete("/delete/:id", checkAdminAccess, deleteCommentById);
module.exports = {
  commentRoutes: router,
};
