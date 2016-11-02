var bookshelf = require('./db');

require('./Register');
require('./Event');

var EventAttendance = bookshelf.Model.extend({
    tableName: 'event_attendance',
    user: function() {
        return this.belongsTo('Register')
    },
    events: function() {
            return this.belongsTo('EventModel')},
});

module.exports = bookshelf.model('EventAttendance', EventAttendance);