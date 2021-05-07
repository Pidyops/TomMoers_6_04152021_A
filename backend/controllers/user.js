const bcrypt = require('bcrypt'); //import bcrypt (just installed: npm install --save bcrypt)
const jwt = require('jsonwebtoken'); // import tje package (npm install --save jsonwebtoken)
const User = require('../models/user'); //import the user model


// @desc      POST signup
// @route     POST /api/auth/signup
// @access    Public
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then( //we crypt the data we want to hash, 10 is the number of number hashed
		(hash) => { // we receive the hash
			const user = new User({
				email: req.body.email,
				password: hash
            });
            console.log(user)
			user.save().then( //save it to the database. it returns another promess
				() => {
					res.status(201).json({
						message: 'User added successfully! well played!'
				});
				}
			).catch(
				(error) => {
					res.status(500).json({ // 500 is a server error
						error: error
                    });
                    
				}
			);
		}
	);
};


// @desc      POST signin
// @route     POST /api/auth/signup
// @access    Public
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {

        if (!user) {
            // return res.status(401).json({
            // error: new Error('User not found!')
            throw ({ status: 401, code: 'Email not found', message: 'This email is not registered' });
            // });
        }
        bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
            if (!valid) {
                // return res.status(401).json({ // we say return when we also want to end the function
                // error: new Error('Incorrect password!')
                
                const err = ({ status: 401, code: 'Password not valid', message: 'Please, enter a correct password' });
                // });
                console.log("erreur password", err)
                throw err
                
            }
            const token = jwt.sign({ userId: user._id }, //sign-up mothod with the argument user id,
                "RANDOM_TOKEN_SECRET", //secret string, unique for the app. Usually long and random
                { expiresIn: '24h'}); 
            res.status(200).json({
                userId: user._id,
                token: token
            });
            console.log("logged In");
            }
            
        ).catch(
            (error) => {
            res.status(error.status).json({
                error: error
            });
            }
            
        );
        }
    ).catch(
        
        (error) => { if (error.code && error.code == 'Email not found') {
        res.status(error.status).json({
                    error: error
                });
        } else {
            res.status(500).json({
                error: error})
        }
        
    }
    );
}
