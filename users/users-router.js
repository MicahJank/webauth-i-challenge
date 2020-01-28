const router = require('express').Router();

const Users = require('./users-model.js');

//authrequire here
const { checkLoggedIn } = require('../auth/authRequiredMiddleware.js');


router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/sessions', (req, res) => {
   Users.findSessionsCount()
        .then(sessions => {
        console.log("TCL: res", sessions)
            res.json({ currentSessions: sessions.length });
        }) 
        .catch(err => {
            console.log({ message: 'Couldnt get the sessions', err })
        });
})

module.exports = router;