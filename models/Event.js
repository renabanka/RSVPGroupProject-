var bookshelf = require('./db');

var EventModel = bookshelf.Model.extend({
    tableName: 'events'
});

module.exports = EventModel;