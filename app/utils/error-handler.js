const NotFoundError = (req, res, next) => {
  return res.status(404).json({
    statusCode: res.statusCode,
    error: {
      type: "Not Found",
      message: `not found ${req.url} route`,
    },
  });
};
const ErrorHandler = (err, req, res, next) => {
  return res.status(err?.status || 500).json({
    statusCode: res.statusCode,
    error: {
      message: err?.message || `Internal Server Error`,
    },
  });
};

module.exports = {
  NotFoundError,
  ErrorHandler,
};
