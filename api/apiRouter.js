const router = require('express').Router();


const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/users-router.js');

// /api/auth
router.use('/auth', authRouter);
// /api/users
router.use('/users', usersRouter);

// /api
router.get('/', (req, res) => {
    res.json({ message: 'api...is alive.'});
});

module.exports = router;