const bcrypt = require("bcrypt");
const models = require("../models");
const utils = require("../middleware/jwtUtils");

//Création d'un user
exports.signup = (req, res) => {
  // Valider les paramètres de la requète
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (email == null || username == null || password == null) {
    return res.status(400).json({ error: "il manque un paramètre" });
  }

  models.User.findOne({
    attributes: ["email"],
    where: { email: email },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(password, 10, function (err, bcryptPassword) {
          // Création de l'user
          const newUser = models.User.create({
            email: email,
            username: username,
            password: bcryptPassword,
            isAdmin: false,
          })
            .then((newUser) => {
              res.status(201).json({ id: newUser.id });
            })
            .catch((err) => {
              res.status(500).json({ error });
            });
        });
      } else {
        res.status(409).json({ error: "Cet utilisateur existe déjà " });
      }
    })
    .catch((err) => {
      res.status(500).json({ error });
    });
};

//Login d'un user
exports.login = (req, res) => {
  //Récupération et validation des paramètres
  let email = req.body.email;
  let password = req.body.password;
  if (email == null || password == null) {
    res.status(400).json({ error: "Il manque un paramètre" });
  }
  //Vérification si user existe
  models.User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          password,
          user.password,
          (errComparePassword, resComparePassword) => {
            if (resComparePassword) {
              res.status(200).json({
                userId: user.id,
                token: utils.generateToken(user),
                isAdmin: user.isAdmin,
              });
            } else {
              res.status(403).json({ error: "mot de passe invalid" });
            }
          }
        );
      } else {
        res.status(404).json({ erreur: "Cet utilisateur n'existe pas" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

//Profil d'un user
exports.userProfil = (req, res) => {
  let userId = utils.getUserId(req.headers.authorization);
  models.User.findOne({
    attributes: ["id", "email", "username", "attachement", "isAdmin"],
    where: { id: userId },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};

//modification username + photo
exports.updateUser = async (req, res) => {
  try {
    // chercher le user
    let newAttachementURL;
    const userId = utils.getUserId(req.headers.authorization);
    let user = await models.User.findOne({ where: { id: userId } });
    if (userId == user.id) {
      // si une image a été selectionner
      if (req.file != null) {
        newAttachementURL = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      } // s'il ya un username dans le input
      if (req.body.username) {
        user.username = req.body.username;
      }

      user.attachement = newAttachementURL;
      // on sauvegarde tout dans la bdd
      const newUser = await user.save({
        fields: ["username", "attachement"],
      });
      res.status(200).json({ newUser: newUser, message: "user modifié" });
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

//  Suppression d'un compte
exports.deleteProfile = async (req, res) => {
  try {
    //récupération de l'id de l'user
    let userId = utils.getUserId(req.headers.authorization);
    if (userId != null) {
      //Recherche sécurité si user existe bien
      models.User.findOne({
        where: { id: userId },
      })
        .then((user) => {
          if (user != null) {
            //suppression des commentaires liées au userId
            models.Comments.destroy({ where: { UserId: user.id } })
              .then(() => {
                //suppression des posts liées au userId
                models.Post.destroy({
                  where: { userId: user.id },
                });
              })
              .then(() => {
                console.log("Compte supprimé");
                //Suppression de l'utilisateur
                models.User.destroy({
                  where: { id: user.id },
                })
                  .then(() => res.end())
                  .catch((err) => console.log(err));
              })
              .catch((err) => res.status(500).json(err));
            res.status(200).json({ message: "User supprimé" });
            // }
          } else {
            res.status(401).json({ error: "Ce user n'existe pas" });
          }
        })
        .catch((err) => res.status(500).json(err));
    } else {
      res.status(500).json({
        error: "Impossible de supprimer ce compte, contacter un administrateur",
      });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
