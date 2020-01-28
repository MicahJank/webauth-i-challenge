const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    findSessionsCount
};

function find() {
    return db('users').select('id', 'username').orderBy('id');
};

function findBy(filter) {
    return db('users')
             .select('id', 'username', 'password')
             .where(filter);
};

function add(user) {
    return db('users')
           .insert(user,"id")
           .then(ids => {
               const [id] = ids;
               return findById(id);
           });
}

function findById(id) {
    return db('users')
             .select('id', 'username')
             .where({ id })
             .first();
}

function findSessionsCount() {
    return db('sessions')
}