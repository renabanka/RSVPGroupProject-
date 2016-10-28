create database RSVP;

create table user_accounts (
    id int not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password_hash varchar(61) not null,
    primary key (id)

);

create table events (
    id int not null auto_increment,
    event_name varchar(255) not null,
    start_date DATE not null,
    end_date DATE not null,
    start_time TIME not null,
    end_time TIME not null,
    description TEXT not null,
    location TEXT not null,
    primary key (id)
);

create table event_attendance (
    id int not null auto_increment,
    evtref int not null references events(id),
    uref int not null references users(addid),
    status VARCHAR(255) not null,
    comments VARCHAR(255),
    primary key(id)
);
