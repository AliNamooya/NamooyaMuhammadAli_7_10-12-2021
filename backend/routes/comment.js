const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/create/:id", auth, multer, commentCtrl.createComment);
router.get("/", auth, commentCtrl.listComment);
router.get("/:id", auth, commentCtrl.postsComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
