const users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {

    req.session.loggedin ? next() : res.status(400).json({ message: "Stop! Who approaches the Bridge of Death must answer me these questions three, 'ere the other side he see." });
    // const { username, password } = req.headers;

    // if (username && password) {

    //     users.findBy({ username })
    //          .first()
    //          .then(user => {
    //              if(user && bcrypt.compareSync(password, user.password)) {
    //                  next();
    //              } else {
    //                  res.status(401).json({
    //                      message: 'Invalid credentials'
    //                  });
    //              };
    //          })
    // } else {
    //     res.status(401).json({
    //         message: 'Invalid credentials'
    //     });
    // };
};