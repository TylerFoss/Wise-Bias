const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const Article = require('../models/article');

// const isAuthenticated = (req, res, next) => {
//   if (req.user)
//     next();
//    else
//      return res.json({ })
// }
//
//
// router.get('/user', isAuthenticated, (req,res) => {
//   return res.json(req.user)
// });
//
router.put("/:id", (req,res) => {
  let { affiliation } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    {$set: {affiliation}},
    {new: true},
    (err, user) => {
      res.json(user);
    });
})

module.exports = router;
