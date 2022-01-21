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
        message: "Commentaire crée",
        post: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Une erreur s'est produite",
        error: error,
      });
    });
};

//Afficher les commentaires sur le mur
exports.listComment = (req, res) => {
  models.Comments.findAll({
    include: [
      {
        model: models.User,
        attributes: ["username", "attachement", "isAdmin"],
      },
    ],
  })
    .then((comments) => {
      if (comments != null) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: "Pas de commentaires à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

//afficher le commentaire liée a son post
exports.postsComment = (req, res) => {
  const postId = req.params.id;

  //recuperer le model des post
  models.Comments.findAll({
    include: {
      where: { id: postId },
      model: models.Post,
      attributes: ["id", "content", "userId"], //on affiche le username de celui qui a crée le post
    },
  })
    .then((result) => {
      if (result != null) {
        //on affiche le resultat des requetes ici

        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Post introuvable",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Une erreur s'est produite",
      });
    });
};

//Suppression d'un commentaire (fonctionne pas pour l'instant)
exports.deleteComment = async (req, res) => {
  try {
    const userId = utils.getUserId(req.headers.authorization);
    const checkIfAdmin = await models.User.findOne({
      where: { id: userId },
    });
    const comment = await models.Comments.findOne({
      where: { id: req.params.id },
    });
    if (userId === comment.UserId || checkIfAdmin.isAdmin === true) {
      models.Comments.destroy({ where: { id: comment.id } });
      res.status(200).json({ message: "Commentaire supprimé" });
    } else {
      res.status(401).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
