
// this method create custom express validator using middleware

const { validationResult, check } = require('express-validator')

exports.resultsValidator = (req) => {
  const messages = []
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array()
    for (const i of errors) {
      messages.push(i)
    }
  }
  return messages
}

exports.registerValidator = () => {
  return [
    check('username')
      .notEmpty()
      .withMessage('username is required')
      .not()
      .custom((val) => /[^A-za-z0-9\s]/g.test(val))
      .withMessage('Username not use uniq characters'),
    check('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be 8 characters')
  ]
}

exports.loginValidator = () => {
  return [
    check('username').notEmpty().withMessage('username or email is required'),
    check('password').notEmpty().withMessage('password is required')
  ]
}






// const {check, validationResult}= require('express-validator');
// // const {body, validationResult}= require('express-validator');
// const urlencodeParser= bodyParser.urlencoded({ extended:false});

// module.exports = [
//     check('username', 'this username must be 3+ carracters long') //what to check, message
//         .exists() // check if it exist
//         .isLength({ min: 3 }), //check length
//     check('email', 'Email is not valid')
//         .isEmail() // if exist
//         .normalizeEmail(), //check @
//     check('password'),trim().isLength(5).withMessage('password must be 5+ carracters max')


// ], (req, res, next)=> {

//     const errors = validationResult(req)
//     if(!error.isEmpty)
//     return res.status(422).jsonp(errors.array())

//     const alert = errors.array()

//     res.render('register',)


// }



 
// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => { // export our middleware
//      try {
//         const token = req.headers.authorization.split(' ')[1]; //token is sent as an header, and get the second part without the bearer (key)
//         const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') //take the secret string back from the controllers
//         const userId = decodedToken.userId; // userId is from the const token from controllers
//         if (req.body.userId && req.body.userId !== userId) { // check if there is a user id and if yes, if it the same extracted from the token
//             throw 'Invalid user ID';
//         } else {
//             next(); // if ok, we'll pass to the next piece of middle ware on the route
//         }
//      } catch {
//         res.status(401).json({
//             error: new Error('Invalid request! (token)')
//         });
//      }
// };







// // this method create custom express validator using middleware

// const { validationResult, check } = require('express-validator')

// exports.resultsValidator = (req) => {
//   const messages = []
//   if (!validationResult(req).isEmpty()) {
//     const errors = validationResult(req).array()
//     for (const i of errors) {
//       messages.push(i)
//     }
//   }
//   return messages
// }

// exports.registerValidator = () => {
//   return [
//     check('username')
//       .notEmpty()
//       .withMessage('username is required')
//       .not()
//       .custom((val) => /[^A-za-z0-9\s]/g.test(val))
//       .withMessage('Username not use uniq characters'),
//     check('password')
//       .notEmpty()
//       .withMessage('password is required')
//       .isLength({ min: 8 })
//       .withMessage('password must be 8 characters')
//   ]
// }

// exports.loginValidator = () => {
//   return [
//     check('username').notEmpty().withMessage('username or email is required'),
//     check('password').notEmpty().withMessage('password is required')
//   ]
// }

// // how to use express validator in controller for results message
// const errors = resultsValidator(req)
//   if (errors.length > 0) {
//     return res.status(400).json({
//       method: req.method,
//       status: res.statusCode,
//       error: errors
//     })
//   }

// // how to use express validator in route
// route.post('/login', loginValidator(), (req, res) => {
//    return res.status(200).send('Login Sucessfuly');
// });

// route.post('/register', registerValidator(), (req, res) => {
//    return res.status(200).send('Register Sucessfuly');
// });