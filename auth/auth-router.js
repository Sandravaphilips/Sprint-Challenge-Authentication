const router = require('express').Router();

router.post('/register', (req, res) => {
  // implement registration
  const {username, password} = req.body;

  
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
