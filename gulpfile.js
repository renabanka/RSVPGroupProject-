'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var db = require('./models/db');


gulp.task('db_create_user_accounts_table' , function () {
    var sqlString = "create table user_accounts (" +
    "id int not null auto_increment," +
        "name varchar(255) not null," +
        "email varchar(255) not null unique," +
        "password_hash varchar(61) not null," +
        "primary key (id)" +
        ");";
    function cb(res) {
        console.log(res);

    }
    db.raw(sqlString).then(cb);
});


gulp.task('db_drop_user_accounts_table', function() {
    var sqlString = "drop table user_accounts;";
    //callback(response)
    function cb(res) {
        console.log(res);
    }
    db.raw(sqlString).then(cb);
    //db.raw(query).then(callback)
});




gulp.task('Nodemon', restartServer);

function restartServer() {
    nodemon({
        script: './bin/www',
        ext: 'js hbs scss sql'
    });
};




gulp.task('default', ['Nodemon']);