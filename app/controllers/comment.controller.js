const { CommentModel } = require("../models/comment.model");
const { UserModel } = require("../models/user.model");
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
  const commentMongo = await CommentModel.create(comment);
  await UserModel.findOneAndUpdate(
    { _id },
    { $push: { comments: commentMongo._id } }
  );
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
    if (!text) throw createError.BadRequest("please enter text");
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
      throw createError.NotFound("Comment not found for delete");
    res.send({ message: "Delete Successfully" });
  } catch (error) {
    next(error);
  }
}
async function getUserComments(req, res, nex) {
  const { comments } = req.user;
  console.log(comments);

  const userComments = await CommentModel.find(
    { _id: { $in: comments } },
    { __v: 0, fullName: 0, userId: 0 }
  );
  res.send(userComments);
}
module.exports = {
  createComment,
  getAllComment,
  searchComment,
  deleteCommentById,
  getUserComments,
};
