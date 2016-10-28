create database RSVP;

create table user_accounts (
    id int not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password_hash varchar(61) not null,
    primary key (id)

);