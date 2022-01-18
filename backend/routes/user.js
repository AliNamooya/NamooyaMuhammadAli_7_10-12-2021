//Imports
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const passwordCheck = require("../middleware/passwordCheck");
const multer = require("../middleware/multer-config");
const emailCheck = require("../middleware/emailCheck");

//Routage
router.post("/signup", emailCheck, passwordCheck, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/me", auth, userCtrl.userProfil);
router.put("/me", auth, multer, userCtrl.updateUser);
router.delete("/delete", auth, userCtrl.deleteProfile);

module.exports = router;
