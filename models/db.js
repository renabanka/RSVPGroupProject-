require('dotenv').config(); //# dot-env
var db = require('knex')({	//# knex
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'l33tdba',
        password: 'yellowpencil',
        database: 'RSVP'
    }
});

var bookshelf = require('bookshelf')(db);

bookshelf.plugin('registry');

module.exports = bookshelf;

