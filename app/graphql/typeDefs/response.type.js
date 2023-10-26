const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

const ResponseType = new GraphQLObjectType({
  name: "ResponseType",
  fields: {
    statusCode: { type: GraphQLInt },
    message: { type: GraphQLString },
  },
});

module.exports = {
  ResponseType,
};
