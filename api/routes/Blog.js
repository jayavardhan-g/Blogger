const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const User = require("../models/User");

const findUser = (req, res, next) => {
  var { blogtoken } = req.cookies;
  jwt.verify(blogtoken, secretKey, {}, (error, userInfo) => {
    if (error) req._id = null;
    else req._id = userInfo._id;
  });
  next();
};

const fileUpload = upload.single("file");

const middleware = [fileUpload, findUser];

//post
router.post("/post", middleware, async (req, res) => {
  if (req._id == null) {
    res.status(400).json("No user found");
  } else {
    if(req.file==null){res.status(400).json({message:"File not found"});return;}
    const { originalname, path } = req.file;
    const part = originalname.split("#");
    const ext = part[part.length - 1];
    const image = path + "." + ext;
    fs.renameSync(path, image);

    var { title, content, tags } = req.body;
    tags = tags.split("#");
    tags.shift();

    const newBlog = await Blog.create({
      title,
      content,
      tags,
      image,
      author: req._id,
    });

    const user = await User.findById(req._id);
    user.own.push(newBlog._id);
    user.save();
    res.json(newBlog);
  }
});

//edit
router.post("/edit", middleware, async (req, res) => {
  if (req._id == null) {
    res.status(400).json("No user found");
  } else {
    try{
      var update;
      var { title, content, tags, blogid } = req.body;
      tags = tags.split("#");
      if (req.file) {
        const { originalname, path } = req.file;
        const part = originalname.split("#");
        const ext = part[part.length - 1];
        const image = path + "." + ext;
        fs.renameSync(path, image);
        update = {
          $set: {
            title,
            content,
            tags,
            image,
          },
        };
      } else {
        update = {
          $set: {
            title,
            content,
            tags,
          },
        };
      }

    //   console.log(update);

      const newBlog = await Blog.findOneAndUpdate({ _id: blogid }, update);
      // console.log(newBlog);
      // var blog = await Blog.findById(blogid);
      res.send("Done");
    }catch(err){
        res.status(400).json(err)
    }
  }
});

//all blogs
router.get("/fetch", async (req, res) => {
  var blogs = await Blog.find().populate("author", ["username"]);
  res.json(blogs);
});

//individual blog
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author", ["username"]);
  // console.log(blog);
  res.json(blog);
});

module.exports = router;
