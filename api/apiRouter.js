const router = require('express').Router();

const registerRouter = require('../auth/registerRouter.js');
const loginRouter = require('../auth/loginRouter.js');
const usersRouter = require('../users/users-router.js');

// /api/register
router.use('/register', registerRouter);

// /api/login
router.use('/login', loginRouter);

// /api/users
router.use('/users', usersRouter);

// /api
router.get('/', (req, res) => {
    res.json({ message: 'api...is alive.'});
});

module.exports = router;