let bcrypt = require("bcrypt");
let models = require("../models");
let utils = require("../middleware/jwtUtils");

//Création d'un user
exports.signup = (req, res) => {
  // Valider les paramètres de la requète
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (email == null || username == null || password == null) {
    res.status(400).json({ error: "il manque un paramètre" });
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
              res.status(403).json({ error: "invalid password" });
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
  let id = utils.getUserId(req.headers.authorization);
  models.User.findOne({
    attributes: ["id", "email", "username", "isAdmin"],
    where: { id: id },
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};

//Suppression d'un compte
exports.deleteProfile = (req, res) => {
  //récupération de l'id de l'user
  let userId = utils.getUserId(req.headers.authorization);
  if (userId != null) {
    //Recherche sécurité si user existe bien
    models.User.findOne({
      where: { id: userId },
    }).then((user) => {
      if (user != null) {
        //Delete de tous les posts de l'user même s'il y en a pas
        models.Post.destroy({
          where: { userId: user.id },
        })
          .then(() => {
            console.log("Tous les posts de ce user ont été supprimé");
            //Suppression de l'utilisateur
            models.User.destroy({
              where: { id: user.id },
            })
              .then(() => res.end())
              .catch((err) => console.log(err));
          })
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(401).json({ error: "Ce user n'existe pas" });
      }
    });
  } else {
    res.status(500).json({
      error: "Impossible de supprimer ce compte, contacter un administrateur",
    });
  }
};
