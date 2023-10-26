const { GraphQLList, GraphQLString } = require("graphql");
const { CommnetType } = require("../typeDefs/comment.type");
const { createComment } = require("../../controllers/comment.controller");
const {
  verifyAccessTokenInGraphQL,
} = require("../../middleware/verifyAccessToken.js");
const { ResponseType } = require("../typeDefs/response.type");

const CreateComment = {
  type: CommnetType,
  args: {
    text: { type: GraphQLString },
  },
  
  //! fix response message
  resolve: async (_, args, context) => {
    const { req, res } = context;
    await verifyAccessTokenInGraphQL(req, res);
    const resault = await createComment(req, res, _, args);
    return {
      data: "asdsad",
    };
  },
};
module.exports = {
  CreateComment,
};
