create database login;
use login;
create table user (
idUser int primary key,
username varchar(20) not null,
password varchar(8) not null);

INSERT INTO USER VALUES (1, 'vivilopes', '123');

select * from user;