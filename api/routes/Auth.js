const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secretKey = "JayaVardhanNani";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const findUser = (req,res,next)=>{
  var {blogtoken} = req.cookies;
  jwt.verify(blogtoken,secretKey,{},(error,userInfo)=>{
      if(error)req._id = null;
      else req._id = userInfo._id;
  })
  next();
}


//Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    var hash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({ username, email, password: hash });
    res.status(200);
    res.send(newUser);
  } catch (e) {
    res.status(400).json(e);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDetails = await User.findOne({ username });
    // console.log(userDetails);
    
    if(userDetails==null){
      res.status(400);
      res.send({message:"User not found."});
      return;
    }


    const compare = bcrypt.compareSync(password, userDetails.password);
    if (compare) {
      // console.log(username, userDetails._id);
      jwt.sign(
        { username, _id: userDetails._id },
        secretKey,
        {},
        (err, token) => {
          if (err) {
            // console.log(err);
            res.json(err);
            return
          }
          res.cookie("blogtoken", token);
          res.json({ username, _id: userDetails._id });
          res.send();
        }
      );
    }else{
      res.status(400).json({message:"Incorrect credentials."});
    }
  } catch (err) {
    // console.log(err);
    res.status(400).send(err);
  }
});

router.get("/profile", (req, res) => {
  var { blogtoken } = req.cookies;
  jwt.verify(blogtoken, secretKey, {}, async (error, userInfo) => {
    if (error) res.json(error);
    else{
      var saved = await User.findById(userInfo._id,['username','_id','saved']);
      res.json(saved);
    }
  });
});


router.get("/logout", (req, res) => {
  res.cookie("blogtoken", "").json("ok");
});

router.post("/save",async (req,res)=>{
  const {user,blog} = req.body;
  
  try{  
    const doc = await User.findById(user,['username','_id','saved']);
    doc.saved.push(blog);
    doc.save();
    
    res.json(doc);

  }catch(err){
    // console.log(err);
    res.status(400).json(err);
  }
})

router.post("/unsave",async (req,res)=>{
  const {user,blog} = req.body;
  
  try{  
    const doc = await User.findById(user,['username','_id','saved']);
    doc.saved.pull(blog);
    doc.save();

    res.json(doc);

  }catch(err){
    // console.log(err);
    res.status(400).json(err);
  }
})

router.get('/saved',findUser,async(req,res)=>{
  const _id = req._id;
  try{
    const doc = await User.findById(_id,['username','_id','saved']).populate({
      path:'saved',
      populate:{
        path:'author',
        model:'User',
        select:['_id','username']
      }
    });
    // console.log(doc);

    res.json(doc);
  }catch(err){
    res.status(400).json({err});
  }
})

router.get('/my',findUser, async(req,res)=>{
  const _id = req._id;
  try{
    const doc = await User.findById(_id,['username','_id','own']).populate('own');
    res.json(doc);
  }catch(err){
    res.status(400).json(err);
  }
  
})

module.exports = router;