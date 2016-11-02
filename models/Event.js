var bookshelf = require('./db');

require('./EventAttendance');

var EventModel = bookshelf.Model.extend({
    tableName: 'events',
    eventattendances: function() {
    return this.hasMany('EventAttendance')
    }
});

module.exports = bookshelf.model('EventModel', EventModel);
