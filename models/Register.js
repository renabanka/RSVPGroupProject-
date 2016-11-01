var Bookshelf = require('./db')

require('./EventAttendance')

var User = Bookshelf.Model.extend({
    tableName: 'users_accounts',
    event_attendance: function(){
        return this.belongsTo('events')
    }
});

module.exports = Bookshelf.model('Register', User)

