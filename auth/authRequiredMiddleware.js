const users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
    const { username, password } = req.headers;

    if (username && password) {

        users.findBy({ username })
             .first()
             .then(user => {
                 if(user && bcrypt.compareSync(password, user.password)) {
                     next();
                 } else {
                     res.status(401).json({
                         message: 'Invalid credentials'
                     });
                 };
             })
    } else {
        res.status(401).json({
            message: 'Invalid credentials'
        });
    };
};