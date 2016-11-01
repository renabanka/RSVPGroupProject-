var bookshelf = require('./db');

require('./Register');

var EventAttendance = bookshelf.Model.extend({
    tableName: 'event_attendance',
    user: function() {
        return this.belongsTo('Register')
    }
});

module.exports = bookshelf.model('EventAttendance', EventAttendance);