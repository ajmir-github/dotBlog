const express = require('express');
const router = express.Router();
const { authCookie } = require("../controllers/auth");
const PostModel = require("../models/postModel");

router.get("/", authCookie, async (req, res)=>{
  res.render("profile", {
    user:req.payload
  });
})


router.post("/post", authCookie, async (req, res)=>{
 try {
   // create a post
    const user = req.payload;
    const post = new PostModel({
      ...req.body,
      auther:user._id
    });
    const createdPost = await post.save();
    // add the post to the user
    user.posts.push(createdPost._id);
    const changedUser = await user.save(); 
    // give message back
    res.render("profile", {
      user,
      message:"Your post have been created!",
      postID:createdPost._id
    });
 } catch ({message, status}) {
    res.render("errorPage", {message, status});
 }
})

module.exports = router;