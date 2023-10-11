const CommentModel = require("../models/comment.model");
const PersianDate = require("../utils/persianDate");
const createError = require("http-errors");

async function createComment(req, res, next) {
  const { text } = req.body;
  const { _id, first_name, last_name } = req.user;

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
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
}
async function searchComment(req, res, next) {
  try {
    let { text } = req.query;
    text = text.toString().replace("+", " ").trim();
    const reg = new RegExp(text, "gi");
    const comments = await CommentModel.find({}, { __v: 0, movieId: 0 });

    const searchedComment = comments.filter((comment) =>
      comment.text.match(reg)
    );
    res.send(searchedComment);
  } catch (error) {
    next(error);
  }
}
async function deleteCommentById(req, res, next) {
  try {
    const { id } = req.params;
    console.log(id);
    const resault = await CommentModel.deleteOne({ _id: id });
    if (resault.deletedCount == 0)
      throw createError.BadRequest("Comment not found for delete");
    res.send({ message: "Delete Successfully" });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createComment,
  getAllComment,
  searchComment,
  deleteCommentById,
};
