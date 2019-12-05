const router = require('express').Router();

//bcrypt here

//credential middleware here

const Users = require('../users/users-model.js');


router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if(user) {
            res.json({ message: `Welcome ${user.username}` });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        };
    })
    .catch(err => {
        res.status(500).json({ message: 'Couldnt log in.',
    error: err })
    });
});

module.exports = router;