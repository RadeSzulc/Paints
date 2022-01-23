const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(409).json({ message: "This e-mail already exists" });
    }
  });
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash,
    })
      .save()
      .then((user) => {
        console.log(user);
        res.status(201).json({ message: "User added" });
      });
  });
});

router.delete("/:userId", (req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(403).json({ message: "Authorization Error" });
    }

    bcrypt.compare(req.body.password, user.password, function(err, loginRes) {
      if (err){
        return res.status(403).json({message:"Error"});
      }
      if (loginRes){
        return res.status(403).json({message:"Logged in successfully"});
      } else {
        return res.json({message: 'Incorrect username or password '});
      }
    });
      
    
  });
});

module.exports = router;
