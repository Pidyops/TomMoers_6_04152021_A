const express = require('express'); // import express
const router = express.Router(); // create a router

const userCtrl = require('../controllers/user'); // import our user controller

//we expect post route
// router.post('/signup', userCtrl.bioup);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router; //export the router






