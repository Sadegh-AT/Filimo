const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const { UserType } = require("./user.type");

const CommnetType = new GraphQLObjectType({
  name: "CommnetType",
  fields: {
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    fullName: { type: GraphQLString },
    text: { type: GraphQLString },
    date: { type: GraphQLString },
  },
});

module.exports = {
  CommnetType,
};
