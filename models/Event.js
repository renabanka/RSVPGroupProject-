var db = require('./db');
var bookshelf = require('bookshelf')(db);

var EventModel = bookshelf.Model.extend({
    tableName: 'events'
});

module.exports = EventModel;