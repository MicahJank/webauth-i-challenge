const router = require('express').Router();

//bcrypt here
const bcrypt = require('bcryptjs');

//credential middleware here
const authorize = require('./authRequiredMiddleware.js');

const Users = require('../users/users-model.js');


router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
         .then(savedUser => {
             res.status(201).json(savedUser);
         })
         .catch(err => {
             res.status(500).json({
                 message: 'There was an error trying to register the user',
                 error: err
             });
         });
});

router.post('/login', authorize, (req, res) => {
    let { username } = req.headers;

    res.json({
        message: `Welcome ${username}!`
    });
});

module.exports = router;