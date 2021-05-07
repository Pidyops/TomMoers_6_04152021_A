

const express = require('express'); //import express (import framework)
const dotenv = require ('dotenv');
const bodyParser = require('body-parser'); //import access to body parser (make the post api possible)
const mongoose = require('mongoose'); // import mongoose (in app.js)
const path = require('path'); // for displaying image
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const User = require('./models/user'); // import mongoose model
const userRoutes = require('./routes/user'); // get our route user.js file
const saucesRoutes = require('./routes/sauces'); 
const connectDB = require('./config/db');


// Load env vars
dotenv.config({ path: './config/config.env'});

// Connect to database
connectDB();


const app = express(); // create the app


// <><><><><><><>  CORS converese localhost  <><><><><><><>
app.use((req, res, next) => { //piece of middle-ware
	res.setHeader('Access-Control-Allow-Origin', '*'); //any request from any origin be allowed
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // allow all of this header
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // allow all of this following method (function)
	next();
});


// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // convert the body to a usable json object


// app.use(expressValidator())


// Sanitizing data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent xss (cross site scripting) attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, //10 mins
	max: 100
});



app.use(limiter);





app.use('/images', express.static(path.join(__dirname, 'images'))); // how to handle request that is going to /images

app.use('/api/auth', userRoutes); // route that the front-end app will be using. (register our user route)
app.use('/api/sauces', saucesRoutes);

module.exports = app; // make it accessible from outside this file



