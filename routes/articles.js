const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const Article = require('../models/article');

// const isAuthenticated = (req, res, next) => {
//   if (req.article)
//     next();
//    else
//      return res.json({ })
// };

router.get('/', (req,res) => {
  Article.find((err, articles) =>{
    if (err) {
      console.log(err)
    } else {
      console.log(articles);
      res.json(articles);
    }

  });
});

router.post("/", (req, res) => {
  new Article({
    title: req.body.title,
    url: req.body.url,
    categories: req.body.categories,
    affiliation: req.body.affiliation
  }).save( (err, article) => {
    if(err) {
      console.log(err);
    }
    res.json(article);
  });
});

module.exports = router;
