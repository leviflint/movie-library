const express = require("express");
const { updateOne } = require("../models/Post");
const router = express.Router();
const Post = require("../models/Post");

//GET BACK ALL THE POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET BACK A SPECIFIC POST
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT A POST
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    poster: req.body.poster,
    director: req.body.director,
    summary: req.body.summary,
    vudu: req.body.vudu,
    itunes: req.body.itunes,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }

  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//DELETE A SPECIFIC POST
router.delete("/:postId", async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.postId });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE A POSTA
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
