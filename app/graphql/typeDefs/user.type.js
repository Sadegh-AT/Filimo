const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const { CommnetType } = require("./comment.type");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    phone: { type: GraphQLString },
    isSubscription: { type: GraphQLBoolean },
    registerDate: { type: GraphQLString },
    roles: { type: new GraphQLList(GraphQLString) },
    password: { type: GraphQLString },
    comments: { type: new GraphQLList(CommnetType) },
  },
});

module.exports = {
  UserType,
};
