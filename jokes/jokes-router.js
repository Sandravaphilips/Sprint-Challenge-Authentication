const axios = require('axios');

const router = require('express').Router();

router.get('/', (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  if(req.decodedToken) {
    axios
      .get('https://icanhazdadjoke.com/search', requestOptions)
      .then(response => {
        res.status(200).json(response.data.results);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error Fetching Jokes', error: err });
      });
  } else {
    res.status(404).json({message: "You're not authorized to view this page. Please login and continue"})
  }
  
});

module.exports = router;
