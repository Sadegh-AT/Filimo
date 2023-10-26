const createError = require("http-errors");
const { verifyToken } = require("../utils/token-generator");
const { UserModel } = require("../models/user.model");
async function verifyAccessToken(req, res, next) {
  try {
    const authorization = req.headers?.authorization;

    if (!authorization) throw createError.Unauthorized("Please login");
    const [bearer, token] = authorization.split(" ");
    if (bearer && bearer.toLowerCase() !== "bearer")
      throw createError.BadRequest(
        "authorization should be with bearer stratgy"
      );

    if (!token) throw createError.Unauthorized("please login to your account");

    const payload = await verifyToken(token);
    if (!payload)
      throw createError.Unauthorized("please login to your account");

    const user = await UserModel.findOne(
      { email: payload.email },
      {
        password: 0,
        watched_movie: 0,
        liked_movie: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
async function verifyAccessTokenInGraphQL(req, res) {
  try {
    const authorization = req.headers?.authorization;

    if (!authorization) throw createError.Unauthorized("Please login");
    const [bearer, token] = authorization.split(" ");
    if (bearer && bearer.toLowerCase() !== "bearer")
      throw createError.BadRequest(
        "authorization should be with bearer stratgy"
      );

    if (!token) throw createError.Unauthorized("please login to your account");

    const payload = await verifyToken(token);
    if (!payload)
      throw createError.Unauthorized("please login to your account");

    const user = await UserModel.findOne(
      { email: payload.email },
      {
        password: 0,
        watched_movie: 0,
        liked_movie: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );

    req.user = user;
  } catch (error) {
    throw error;
  }
}

module.exports = { verifyAccessToken, verifyAccessTokenInGraphQL };
