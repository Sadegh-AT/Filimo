const { GraphQLList, GraphQLString } = require("graphql");
const { UserModel } = require("../../models/user.model");
const { UserType } = require("../typeDefs/user.type");
const mongoose = require("mongoose");
const {
  verifyAccessTokenInGraphQL,
} = require("../../middleware/verifyAccessToken.js");
const UserResolver = {
  type: new GraphQLList(UserType),

  resolve: async (_, args, context) => {
    const { req, res } = context;
    await verifyAccessTokenInGraphQL(req, res);
    console.log(req.user);
    return await UserModel.find({}).populate("comments");
  },
};
module.exports = {
  UserResolver,
};
