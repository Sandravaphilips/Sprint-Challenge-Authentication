const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model')

router.post('/register', (req, res) => {
  // implement registration
  const {username, password} = req.body;
  const hash = bcrypt.hashSync(password, 15);

  Users.add({username, password: hash})
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json(err);
    })

});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;

  Users.findBy({username})
    .then(([user]) => {
      if(user && bcrypt.compareSync(user.password, password)) {
        const token = generateToken(user);
        res.status(201).json({message: `Welcome ${user.username}`, payload: token});
      }      
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '10m'
  };

  const privateKey = 'Users4Jokes';

  const result = jwt.sign(
    payload,
    privateKey,
    options
  );

  return result;
}

module.exports = router;
