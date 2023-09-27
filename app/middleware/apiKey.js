function apiKeyMiddleware(req, res, next) {
  try {
    const providedApiKey = req.headers["x-api-key"];
    if (!providedApiKey || providedApiKey !== process.env.API_KEY) {
      throw res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    next();
  }
}

module.exports = {
  apiKeyMiddleware,
};
