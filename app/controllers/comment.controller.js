const CommentModel = require("../models/comment.model");

async function createComment(req, res, next) {
  const { text } = req.body;
  const { userId } = req.user;
  const { movieId } = req.movie;
  const comment = {
    text,
  };
  await CommentModel.create();
  res.send("");
}
async function getAllComment(req, res, next) {}
async function searchComment(req, res, next) {}
async function deleteCommentById(req, res, next) {}
module.exports = {
  createComment,
  getAllComment,
  searchComment,
  deleteCommentById,
};
