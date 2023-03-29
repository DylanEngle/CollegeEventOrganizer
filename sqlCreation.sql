/*DROP DATABASE eventorganizerdb;*/

CREATE DATABASE eventorganizerdb;
use eventorganizerdb;
create table Users
(
	name  NOT NULL,
    userID  NOT NULL,
    password  NOT NULL,
    level varchar(20) NOT NULL, 
    PRIMARY KEY (userID)
);

insert into Users values (Dylan, dylan7, password,student);

create table Events(
	event_id int NOT NULL AUTO_INCREMENT,
	title ,
	subtitle ,
	event_description ,
	location_url ,
    location_name ,
    location_longitude ,
    location_latitude ,
	event_date date,
    event_time timestamp,
	category ,
	contact_name ,
	contact_phone ,
	contact_email ,
	event_url ,
    PRIMARY KEY (event_id)
);

insert into Events (
title ,
	subtitle ,
	event_description ,
	location_url ,
    location_name ,
    location_longitude ,
    location_latitude ,
	event_date ,
    event_time ,
	category ,
	contact_name ,
	contact_phone ,
	contact_email ,
	event_url 
)
 values (
	"Free Coffee and Study Space",
	"coffee is good",
	"TestDesc",
	"location_url",
    "Wesley at UCF: (Previously Limbitless Solutions",
	null,
	null,
	"2023-03-28",
    "09:00:00",
	"Social Event",
	"Erwin Lopez",
	"407-2929-292",
	"wesley.cfl@gmail.com",
	"website_url"
    );

