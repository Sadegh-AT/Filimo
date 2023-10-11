const CommentModel = require("../models/comment.model");
const PersianDate = require("../utils/persianDate");

async function createComment(req, res, next) {
  const { text } = req.body;
  const { _id, first_name, last_name } = req.user;

  // const { movieId } = req.movie;
  const comment = {
    userId: _id,
    fullName: `${first_name} ${last_name}`,
    text,
    date: new PersianDate().now(),
    movieId: null,
  };
  await CommentModel.create(comment);
  res.send("Comment Created");
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
