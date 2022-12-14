const express = require('express');
const router = express.Router();
const PostModel = require("../models/postModel");
const { isUserLoggedIn } = require("../controllers/auth");


// HOME PAGE
// URL: /
router.get("/", isUserLoggedIn, async (req, res)=>{
  try {
    const limit = 4;
    const skip = +req.query?.skip || 0;
    const posts = await PostModel
      .find()
      .limit(limit)
      .skip(skip)
      .sort({date:-1})
      .populate("auther", "_id fullName title");
    // console.log(posts);
    res.render("homePage", {
      posts,
      pagination:{
        limit, skip
      },
      ...req.payload
    });    
  } catch ({message, status}) {
    res.render("errorPage", {message, status});
  }
})

module.exports = router;