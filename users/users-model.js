const db = require('../data/dbConfig');

module.exports = {
    find,
    add,
    findBy,
    update,
    remove
};

function find() {
    return db('users')
}

function add(user) {
    return db('users').insert(user)
        .then(([id]) => findBy({id}))
}

function findBy(filter) {
    return db('users').where(filter)
}

function update(id, changes) {
    return db('users').where({id})
        .update(changes)
            .then(() => findBy({id}))
}

function remove(id) {
    return db('users').where({id}).
        del();
}
