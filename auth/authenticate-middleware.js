/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if(authorization) {
    jwt.verify(
      authorization,
      "Users4Jokes",
      (err, decodedToken) => {
        if(err) {
          res.status(401).json({ message: 'Thou shall not pass!' });
        } else {
          req.decodedToken = decodedToken;
          next()
        }
      }
    )
  } else {
    res.status(400).json({message: "You're not authorized to view this page. Please login and continue"})
  }
  
};
