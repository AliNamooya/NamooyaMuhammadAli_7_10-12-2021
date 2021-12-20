let models = require("../models");
let utils = require("../middleware/jwtUtils");
const fs = require("fs");

exports.create = (req, res) => {
  //Declaration de l'url de l'image
  let attachmentURL;
  //identifier qui créé le message
  let id = utils.getUserId(req.headers.authorization);
  models.User.findOne({
    attributes: ["id", "email", "username"],
    where: { id: id },
  })
    .then((user) => {
      if (user !== null) {
        //Récupération du corps du post
        let content = req.body.content;
        let title = req.body.title;
        if (req.file != undefined) {
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
            title: title,
            content: content,
            attachement: attachmentURL,
            likes: 0,
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

//Afficher un seul post
exports.showOne = (req, res) => {
  const id = req.params.id;
  const postId = req.params.id;

  //recuperer le model avec en lien le username

  models.Post.findOne({
    include: {
      where: { id: postId },
      model: models.User,
      attributes: ["username"], //on affiche le username de celui qui a crée le post
    },
  })

    .then((result) => {
      if (result) {
        //on affiche le resultat des requetes ici
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Comment not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};

//Afficher les posts sur le mur
exports.listMsg = (req, res) => {
  models.Post.findAll({
    include: [
      {
        model: models.User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      if (posts.length > null) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "Pas de post à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

//Modification d'un post
exports.update = (req, res) => {
  //identification du demandeur
  let id = utils.getUserId(req.headers.authorization);
  models.User.findOne({
    attributes: ["id", "email", "username", "isAdmin"],
    where: { id: id },
  })
    .then((user) => {
      //Vérification a faire ici

      models.Post.update(
        {
          title: req.body.title,
          content: req.body.content,
          attachement: req.body.attachement,
        },
        { where: { id: req.params.id } }
      )

        .then(() => res.end())
        .catch((err) => res.status(500).json(err));
      console.log("Modif ok pour le post :", req.params.id);
    })
    .catch((error) => res.status(500).json(error));
};

//Suppression d'un post
exports.delete = (req, res) => {
  //req => userId, postId, user.isAdmin
  //identification du demandeur
  let id = utils.getUserId(req.headers.authorization);
  models.User.findOne({
    attributes: ["id", "email", "username", "isAdmin"],
    where: { id: id },
  })
    .then((user) => {
      //rajouter verification si admin ou si c'est le bon utilisateur

      console.log("Suppression du post id :", req.params.id);
      models.Post.findOne({
        where: { id: req.params.id },
      })
        .then((postFind) => {
          if (postFind.attachement) {
            const filename = postFind.attachement.split("/images/")[1];
            console.log("test", filename);
            fs.unlink(`images/${filename}`, () => {
              models.Post.destroy({
                where: { id: postFind.id },
              })
                .then(() => res.end())
                .catch((err) => res.status(500).json(err));
            });
          } else {
            models.Post.destroy({
              where: { id: postFind.id },
            })
              .then(() => res.end())
              .catch((err) => res.status(500).json(err));
          }
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((error) => res.status(500).json(error));
};
