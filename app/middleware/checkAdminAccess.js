const createError = require("http-errors");
async function checkAdminAccess(req, res, next) {
  try {
    const { roles } = req.user;
    if (!roles.includes("ADMIN")) {
      req.adminAccess = false;
      next();
    } else {
      req.adminAccess = true;

      next();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { checkAdminAccess };
