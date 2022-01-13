const models = require("../models");
const utils = require("../middleware/jwtUtils");

exports.createComment = (req, res) => {
  const comment = {
    UserId: utils.getUserId(req.headers.authorization),
    PostId: req.params.id,
    content: req.body.content,
  };
  console.log(comment);
  models.Comments.create(comment)
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Comment created successfully",
        post: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
};
