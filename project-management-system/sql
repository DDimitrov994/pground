create table usersTbl(id int auto_increment, email varchar(255), password varchar(255), firstname varchar(255), lastname varchar(255), primary key(id));

create table projectsTbl(id int auto_increment, name varchar(255), primary key(id));

create table projectUsersTbl(id int auto_increment, userId int, projectId int, primary key(id), foreign key(userId) references usersTbl(id), foreign key(projectId) references projectsTbl(id));


create table sectionsTbl(id int auto_increment, name varchar(255), projectId int, position int, primary key(id), foreign key(projectId) references projectsTbl(id));


create table tasksTbl(id int auto_increment, name varchar(255), description varchar(255), duedate varchar(255), userId int, sectionId int, startdate varchar(255), primary key(id), foreign key(userId) references usersTbl(id), foreign key(sectionId) references sectionsTbl(id));

create table commentsTbl(id int auto_increment, message varchar(255), userId int, taskId int, primary key(id), foreign key(userId) references usersTbl(id), foreign key(taskId) references tasksTbl(id));


create table viewsTbl(id int auto_increment, view varchar(255), primary key(id));

create table userviewsTbl(id int auto_increment, userId int, viewId int, primary key(id), foreign key(userId) references usersTbl(id), foreign key(viewId) references viewsTbl(id));


insert into viewsTbl(view) values('kanban');
insert into viewsTbl(view) values('list');


