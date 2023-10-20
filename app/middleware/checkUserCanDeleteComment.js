const CommentModel = require("../models/comment.model");
const createError = require("http-errors");
async function checkUserCanDeleteComment(req, res, next) {
  try {
    if (req.adminAccess) {
      next();
    } else {
      const { _id: userId } = req.user;
      const { id: commentId } = req.params;

      if (!userId && !commentId) throw createError.BadRequest("Error");
      const comment = await CommentModel.findById({ _id: commentId });
      if (!comment) throw createError.BadRequest("Comment not found");

      if (comment.userId.equals(userId)) {
        next();
      } else {
        throw createError.Forbidden("You can not delete other comment");
      }
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { checkUserCanDeleteComment };
