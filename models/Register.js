var bookshelf = require('./db');

require('./EventAttendance');

var Register = bookshelf.Model.extend({
    tableName: 'users',
    eventattendances: function() {
        return this.hasMany('EventAttendance')
    }

});


module.exports = bookshelf.model('Register', Register);

