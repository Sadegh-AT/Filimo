const createError = require("http-errors");
async function checkAdminAccess(req, res, next) {
  try {
    const { roles } = req.user;
    if (!roles.includes("ADMIN"))
      throw createError.Forbidden("You are not admin!");
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = { checkAdminAccess };
