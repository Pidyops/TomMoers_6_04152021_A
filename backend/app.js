const express = require('express'); //import express (import framework)
const bodyParser = require('body-parser'); //import access to body parser (make the post api possible)
const app = express(); // create the app
const mongoose = require('mongoose'); // import mongoose (in app.js)
const path = require('path'); // for displaying image

const User = require('./models/user'); // import mongoose model
const userRoutes = require('./routes/user'); // get our route user.js file
const saucesRoutes = require('./routes/sauces'); 

// <><><><><><><>  connect to Mongoose  <><><><><><><>
mongoose.connect('mongodb+srv://Tom:R8Bs17QGWr2JHpMD@cluster0.f9gcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
console.log("successfully connected to MOngoDb Atlas");
})
.catch((error) => {
console.log('unable to connect to MongoDB Atlas');
console.error(error);
})


// <><><><><><><>  CORS converese localhost  <><><><><><><>
app.use((req, res, next) => { //piece of middle-ware
	res.setHeader('Access-Control-Allow-Origin', '*'); //any request from any origin be allowed
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // allow all of this header
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // allow all of this following method (function)
	next();
});


app.use(bodyParser.json()); // convert the body to a usable json object


// app.post('/api/stuff',(req, res, next) => {
// console.log(req.body); //get the response
// res.status(201).json({ // give the confirmation (needed, or it will throw an error)
// message: 'Thing created successfully!'
// });
// });

app.use('/images', express.static(path.join(__dirname, 'images'))); // how to handle request that is going to /images

app.use('/api/auth', userRoutes); // route that the front-end app will be using. (register our user route)
app.use('/api/sauces', saucesRoutes);

module.exports = app; // make it accessible from outside this file



