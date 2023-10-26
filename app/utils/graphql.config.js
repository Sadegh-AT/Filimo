const { qraphQlSchema } = require("../graphql/index.graphql.js");

function graphqlConfig(req, res) {
  return {
    schema: qraphQlSchema,
    graphiql: true,
    context: { req, res },
  };
}
module.exports = {
  graphqlConfig,
};
