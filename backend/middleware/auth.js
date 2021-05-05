const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { // export our middleware
     try {
        const token = req.headers.authorization.split(' ')[1]; //token is sent as an header, and get the second part without the bearer (key)
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') //take the secret string back from the controllers
        const userId = decodedToken.userId; // userId is from the const token from controllers
        if (req.body.userId && req.body.userId !== userId) { // check if there is a user id and if yes, if it the same extracted from the token
            throw 'Invalid user ID';
        } else {
            next(); // if ok, we'll pass to the next piece of middle ware on the route
        }
     } catch {
        // res.status(401).json({
        //     error: new Error('Invalid request! (token)')
        // });
        return res.status(401).json({ status: 401, message: 'Invalid request! (token)'});
     }
};