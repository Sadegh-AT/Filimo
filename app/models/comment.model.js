const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  fullName: { type: String, default: "" },
  text: { type: String, default: "" },
  date: { type: String, default: "" },
  movieId: {
    type: mongoose.Types.ObjectId,
    ref: "movies",
    default: null,
  },
});
commentSchema.index({ text: "text" });
const CommentModel = mongoose.model("comments", commentSchema);

module.exports = CommentModel;
