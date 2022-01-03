//Imports
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const passwordCheck = require("../middleware/passwordCheck");

//Routage
router.post("/signup", passwordCheck, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/me", auth, userCtrl.userProfil);
router.delete("/delete", auth, userCtrl.deleteProfile);

module.exports = router;
