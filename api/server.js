const express = require('express');

const apiRouter = require('./apiRouter.js');
const configureMiddleware = require('./configureMiddleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.send('<h1>Welcome to Web Auth Challenge!</h1>')
})

module.exports = server;