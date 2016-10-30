var db = require('./db');
var bookshelf = require('bookshelf')(db);

var RegisterModel = bookshelf.Model.extend({
    tableName: 'user_accounts'
});

module.exports = RegisterModel;


