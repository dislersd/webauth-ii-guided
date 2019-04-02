// STEP 4 Clean up restricted function to check session 


// Now unessecarry
// const bcrypt = require('bcryptjs');
// const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  if (req && req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
  // We can now clear out this code since we check the session
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // const { username, password } = req.headers;

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
};
