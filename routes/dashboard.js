const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.user)
    next();
   else
     return res.json({ })
}

/* GET dashboard page. */
router.get('/dashboard', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


module.exports = router;
