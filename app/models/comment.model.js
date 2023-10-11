const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  text: { type: String, default: "" },
  date: { type: Date, default: "" },
  movies: { type: mongoose.Types.ObjectId, ref: "movies", required: true },
});

module.exports = mongoose.model("comments", commentSchema);
