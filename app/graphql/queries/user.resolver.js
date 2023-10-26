const { GraphQLList, GraphQLString } = require("graphql");
const { UserModel } = require("../../models/user.model");
const { UserType } = require("../typeDefs/user.type");
const mongoose = require("mongoose");
const UserResolver = {
  type: new GraphQLList(UserType),
  args: {
    id: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    console.log(args);
    if (Object.keys(args) <= 0)
      return await UserModel.find({}).populate("comments");
    return await UserModel.find({
      _id: mongoose.Types.ObjectId(args),
    }).populate("comments");
  },
};
module.exports = {
  UserResolver,
};
