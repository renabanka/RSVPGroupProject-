create database RSVP;

n

create table events (
    id int not null auto_increment,
    image LONGTEXT,
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
    evt_id int not null references events(id),
--    evt_name not null references events(event_name),
    user_id int not null references users(id),
--    user_name not null references users(name),
    status VARCHAR(255) not null,
    comments VARCHAR(255),
    event_name VARCHAR(255),
    start_time TIME,
    end_time TIME,
    start_date text,
    end_date text,
    image LONGTEXT,


    name VARCHAR(255),
    primary key(id)
);