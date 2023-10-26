const { GraphQLObjectType, GraphQLSchema, GraphQLList } = require("graphql");
const { UserType } = require("./typeDefs/user.type");
const { UserResolver } = require("./queries/user.resolver");
const { CreateComment } = require("./mutations/comments.resolver");
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: UserResolver,
  },
});
const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    CreateComment,
  },
});

const qraphQlSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = {
  qraphQlSchema,
};
