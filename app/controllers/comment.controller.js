async function createComment(req, res, next) {
  const { text } = req.body;
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
