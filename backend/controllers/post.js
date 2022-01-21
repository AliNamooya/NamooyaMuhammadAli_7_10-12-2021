const models = require("../models");
const utils = require("../middleware/jwtUtils");
const fs = require("fs");

exports.create = (req, res) => {
  //Declaration de l'url de l'image
  let attachmentURL;
  //identifier qui a créé le message
  let id = utils.getUserId(req.headers.authorization);
  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { id: id },
  })
    .then((user) => {
      if (user !== null) {
        //Récupération du corps du post
        let content = req.body.content;

        if (req.file != null) {
          attachmentURL = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        } else {
          attachmentURL == null;
        }
        if (content == "null" && attachmentURL == null) {
          res.status(400).json({ error: "Rien à publier" });
        } else {
          models.Post.create({
            content: content,
            attachement: attachmentURL,

            UserId: user.id,
          })
            .then((newPost) => {
              res.status(201).json(newPost);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      } else {
        res.status(400).json(error);
      }
    })
    .catch((error) => res.status(500).json(error));
};

//Afficher les posts d'un seul user
exports.showUserPost = (req, res) => {
  const userId = req.params.id;

  //recuperer le model avec en lien le username
  models.Post.findAll({
    include: {
      where: { id: userId },
      model: models.User,
      attributes: ["username", "attachement", "isAdmin"], //on affiche le username de celui qui a crée le post
    },
    order: [["createdAt", "DESC"]],
  })
    .then((result) => {
      if (result != null) {
        //on affiche le resultat des requetes ici
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Pas de post a afficher",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Une erreur s'est produite",
      });
    });
};

//Afficher les posts sur le mur
exports.listMsg = (req, res) => {
  models.Post.findAll({
    include: [
      {
        model: models.User,
        attributes: ["username", "attachement", "isAdmin"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      if (posts != null) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "Pas de post à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

//Suppression d'un post
exports.delete = async (req, res) => {
  try {
    const userId = utils.getUserId(req.headers.authorization);
    const checkIfAdmin = await models.User.findOne({
      where: { id: userId },
    });
    const post = await models.Post.findOne({ where: { id: req.params.id } });
    if (userId === post.UserId || checkIfAdmin.isAdmin === true) {
      if (post.attachement) {
        const filename = post.attachement.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          models.Comments.destroy({ where: { PostId: post.id } })
            .then(() => {
              models.Post.destroy({ where: { id: post.id } });
            })
            .catch((err) => res.status(500).json(err));
          res.status(200).json({ message: "Post supprimé" });
        });
      } else {
        models.Comments.destroy({ where: { PostId: post.id } })
          .then(() => {
            models.Post.destroy({ where: { id: post.id } });
          })
          .catch((err) => res.status(500).json(err));
        res.status(200).json({ message: "Post supprimé" });
      }
    } else {
      res.status(401).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
