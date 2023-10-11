const CommentModel = require("../models/comment.model");
const PersianDate = require("../utils/persianDate");
const createError = require("http-errors");

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
  res.send({ message: "Comment Created" });
}
async function getAllComment(req, res, next) {
  try {
    const comments = await CommentModel.find({}, { __v: 0 });
    res.send(comments);
    next();
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
}
async function searchComment(req, res, next) {}
async function deleteCommentById(req, res, next) {}
module.exports = {
  createComment,
  getAllComment,
  searchComment,
  deleteCommentById,
};
