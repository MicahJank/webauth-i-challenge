const router = require('express').Router();

const bcrypt = require('bcryptjs');

const users = require('../users/users-model.js');

// log in
router.post('/', (req, res) => {
    let { username, password } = req.body;

    req.session.loggedin = false;

    if (username && password) {
        users.findBy({ username })
             .first()
             .then(user => {
                 if(user && bcrypt.compareSync(password, user.password)) {
                     req.session.loggedin = true;
                     console.log(req.session.cookie);
                     res.json({ message: `Welcome ${user.username}! You have successfully logged in!` });
                 } else {
                     res.status(401).json({
                         message: 'Invalid credentials, please make sure you are logging in with the correct information.'
                     });
                 };
             })
             .catch(err => {
                 res.status(500).json({ message: 'There was a problem logging into the server', error: err });
             });
    } else {
        res.status(401).json({
            message: 'Missing body information, please make sure you are providing a username and password.'
        });
    };
});


module.exports = router;