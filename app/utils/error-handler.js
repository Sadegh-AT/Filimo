const createError = require("http-errors");
const NotFoundError = (req, res, next) => {
  next(createError.NotFound(`Not Found Route => ${req.url}`));
};
function validatorHandler(error) {
  const obj = {
    inValidParams: {},
  };

  error?.errors?.forEach((err) => {
    obj.inValidParams[err.path] = err.msg;
  });

  return error.errors ? obj : error;
}
const ErrorHandler = (err, req, res, next) => {
  return res.status(err?.status || 500).json({
    statusCode: res.statusCode,
    error: {
      message: err?.message || `Internal Server Error`,
      inValidParams: err.inValidParams ? err.inValidParams : null,
    },
  });
};

module.exports = {
  NotFoundError,
  ErrorHandler,
  validatorHandler,
};
