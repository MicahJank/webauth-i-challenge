const router = require('express').Router();

//credential middleware here
const authorize = require('./authRequiredMiddleware.js');

router.post('/login', authorize, (req, res) => {
    let { username } = req.headers;
    res.json({
        message: `Welcome ${username}!`
    });
});

module.exports = router;