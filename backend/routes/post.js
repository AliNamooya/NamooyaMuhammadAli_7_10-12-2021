const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Routage
router.post("/create", auth, multer, postCtrl.create);
router.get("/", auth, postCtrl.listMsg);
router.delete("/:id", auth, postCtrl.delete);
router.put("/:id", auth, postCtrl.update);

module.exports = router;
