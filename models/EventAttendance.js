var Bookshelf = require('./db');

require('./Register')


var EventModel = Bookshelf.Model.extend({
    tableName: 'events',
    event_attendance: function(){
        return this.belongsTo('User')
}

});

module.exports = Bookshelf.model('EventModel', EventModel);