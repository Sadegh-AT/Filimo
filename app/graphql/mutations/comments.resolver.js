const { GraphQLList, GraphQLString } = require("graphql");
const { CommnetType } = require("../typeDefs/comment.type");
const {
  createCommentGraphQL,
} = require("../../controllers/comment.controller");
const {
  verifyAccessTokenInGraphQL,
} = require("../../middleware/verifyAccessToken.js");
const { ResponseType } = require("../typeDefs/response.type");

const CreateComment = {
  type: ResponseType,
  args: {
    text: { type: GraphQLString },
  },

  resolve: async (_, args, context) => {
    const { req, res } = context;
    await verifyAccessTokenInGraphQL(req, res);
    const { message } = await createCommentGraphQL(req, res, args);
    return {
      statusCode: res.statusCode,
      message,
    };
  },
};
module.exports = {
  CreateComment,
};
