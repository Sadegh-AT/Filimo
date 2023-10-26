const { GraphQLList } = require("graphql");
const { UserModel } = require("../../models/user.model");
const { UserType } = require("../typeDefs/user.type");

const UserResolver = {
  type: new GraphQLList(UserType),
  resolve: async () => {
    return await UserModel.find({}).populate("comments");
  },
};
module.exports = {
  UserResolver,
};
