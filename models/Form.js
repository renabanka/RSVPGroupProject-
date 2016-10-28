var db = require('./db');
var bookshelf = require('bookshelf')(db);

var FormModel = bookshelf.Model.extend({
    tableName: 'user_accounts'
});

console.log('Form party!');

module.exports = FormModel;


