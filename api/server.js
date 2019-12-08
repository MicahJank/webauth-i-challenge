// express-session basically manages
// session data in a store of some kind, and manages the processing of inbound
// cookies, and outbound cookies, related to the session.
// this is what creates the req.session object for us
const session = require('express-session');

const knexSessionStore = require('connect-session-knex')(session) // <-- HOF

const express = require('express');

const apiRouter = require('./apiRouter.js');
const configureMiddleware = require('./configureMiddleware.js');

//----------------------------------------------------------------------------//
// the options for express-session. Most of these options have to do with how
// the cookies are managed, and how session data is stored.
//
// see express-session documentation at npmjs.org for info on these and other
// options.
//
// note that the options under "store:" are for connect-session-knex. You can
// read about them under that module at npmjs.org.
//----------------------------------------------------------------------------//

// set up env variable for cookie name name and secret
const cookieName = process.env.COOKIENAME || 'mycookie';
const mySecret = process.env.SECRET || 'thisismysecretcookie'

const sessionOptions = {
    name: cookieName,
    secret: mySecret,
    cookie: {
        maxAge: 1000 * 60 * 60, // how long should the cookie last(in minutes)? milliseconds * seconds * minutes = x minutes
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
};

const server = express(); 

configureMiddleware(server);

// session(sessionOptions) creates and returns a function. Since we are using server.use here without a method or URL that means that the session object will be created
// for every request that is made on the server.
server.use(session(sessionOptions));

server.use('/api', apiRouter);


server.get('/', (req, res) => {
    res.send('<h1>Welcome to Web Auth Challenge!</h1>')
})

module.exports = server; 