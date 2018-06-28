var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b4ef0b020db9f0',
    password: '63852dc0',
    database: 'heroku_c38de862d3d4166'
});

exports.createUser = function (user, func) {


    pool.getConnection(function (err, connection) {
        // Use the connection

        connection.query('INSERT INTO usersTbl (email, password, firstname, lastname) VALUES (?,?,?,?);', [user.email, user.password, user.firstname, user.lastname], function (err, rows, fields) {

            if (!err) {

                console.log(rows);
                func();
            }
            else
                console.log(err);
        });
        // And done with the connection.
        connection.release();


    });

}

exports.getUsers = function (func) {

    pool.getConnection(function (err, connection) {
        connection.query('SELECT * FROM usersTbl;', function (err, rows, fields) {

            if (!err) {

                console.log(rows);
                func(rows);
            }
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.addProject = function (user, project, func) {

    pool.getConnection(function (err, connection) {
        connection.query('INSERT INTO projectsTbl (name) VALUES(?);', [project.name], function (err, rows, fields) {

            if (!err)
                connection.query('SELECT MAX(projectsTbl.id) AS id FROM projectsTbl WHERE projectsTbl.name=?;', [project.name], function (err, rows, fields) {

                    if (!err)
                        connection.query('INSERT INTO projectUsersTbl (userId, projectId) VALUES(?,?);', [user.id, rows[0].id], function (err, rows, fields) {

                            if (!err) {
                                console.log(rows);
                                func();
                            }
                            else
                                console.log(err);
                        });
                    else
                        console.log(err);
                });
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.getProjects = function (func) {

    pool.getConnection(function (err, connection) {
        // connection.connect();
        connection.query('select projectsTbl.name, GROUP_CONCAT(usersTbl.firstname," ", usersTbl.lastname SEPARATOR ", ") AS members from projectsTbl, usersTbl, projectUsersTbl where projectUsersTbl.userId=usersTbl.id AND projectUsersTbl.projectId=projectsTbl.id  group by projectsTbl.name;', function (err, rows, fields) {
            /* HOLY SHIT CANVAS query: select projectsTbl.name, GROUP_CONCAT(usersTbl.firstname,' ', usersTbl.lastname SEPARATOR ', ') AS members from projectsTbl, usersTbl, projectUsersTbl where projectUsersTbl.userId=usersTbl.id AND projectUsersTbl.projectId=projectsTbl.id  group by projectsTbl.name;*/
            if (!err) {
                console.log(rows);
                console.log(fields);
                func(rows);
            } else
                console.log(err);
        });
        connection.release();
    });
}

exports.getUsersInProject = function (project, func) {

    pool.getConnection(function (err, connection) {
        // connection.connect();
        connection.query('select GROUP_CONCAT(usersTbl.firstname," ", usersTbl.lastname SEPARATOR ", ") AS members, usersTbl.id from projectsTbl, usersTbl, projectUsersTbl where projectUsersTbl.userId=usersTbl.id AND projectUsersTbl.projectId=projectsTbl.id AND projectsTbl.id=(select projectsTbl.id from projectsTbl where projectsTbl.name=?) group by projectsTbl.name, usersTbl.id;', [project.name], function (err, rows, fields) {
            /* HOLY SHIT CANVAS query: select projectsTbl.name, GROUP_CONCAT(usersTbl.firstname,' ', usersTbl.lastname SEPARATOR ', ') AS members from projectsTbl, usersTbl, projectUsersTbl where projectUsersTbl.userId=usersTbl.id AND projectUsersTbl.projectId=projectsTbl.id  group by projectsTbl.name;*/
            if (!err) {
                console.log(rows);
                console.log(fields);
                func(rows);
            } else
                console.log(err);
        });
        connection.release();
    });
}

exports.joinProject = function (user, project, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT projectsTbl.id FROM projectsTbl WHERE projectsTbl.name=?;', [project.name], function (err, rows, fields) {

            if (!err)
                connection.query('INSERT INTO projectUsersTbl (userId, projectId) VALUES(?,?);', [user.id, rows[0].id], function (err, rows, fields) {

                    if (!err) {
                        console.log(rows);
                        func();
                    }
                    else
                        console.log(err);
                });
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.getSections = function (project, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT projectsTbl.id FROM projectsTbl WHERE projectsTbl.name=?;', [project.name], function (err, rows, fields) {

            if (!err)
                connection.query('SELECT * FROM sectionsTbl WHERE sectionsTbl.projectId=?;'
                    , [rows[0].id], function (err, rows, fields) {

                        if (!err) {
                            console.log(rows);
                            func(rows);
                        }
                        else
                            console.log(err);
                    });
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.getTasks = function (project, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT projectsTbl.id FROM projectsTbl WHERE projectsTbl.name=?;', [project.name], function (err, rows, fields) {

            if (!err)
                connection.query('SELECT tasksTbl.name, tasksTbl.description, tasksTbl.duedate, tasksTbl.sectionId, tasksTbl.id, tasksTbl.startdate, usersTbl.firstname, usersTbl.lastname, sectionsTbl.name as sectionName FROM sectionsTbl, tasksTbl, usersTbl WHERE sectionsTbl.projectId=? AND tasksTbl.sectionId= sectionsTbl.id AND usersTbl.id=tasksTbl.userId;'
                    , [rows[0].id], function (err, rows, fields) {

                        if (!err) {
                            console.log(rows);
                            func(rows);
                        }
                        else
                            console.log(err);
                    });
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.getComments = function (taskId, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT commentsTbl.id, commentsTbl.message, usersTbl.firstname, usersTbl.lastname FROM commentsTbl, usersTbl WHERE commentsTbl.taskId=(select tasksTbl.id from tasksTbl where tasksTbl.name=?) AND usersTbl.id=commentsTbl.userId;'
            , [taskId], function (err, rows, fields) {

                if (!err) {
                    console.log(rows);
                    func(rows);
                }
                else
                    console.log(err);
            });
        connection.release();
    });
}

exports.addComment = function (comment, taskId, user, func) {

    pool.getConnection(function (err, connection) {

        connection.query('INSERT INTO commentsTbl(message, userId, taskId) VALUES(?,(SELECT usersTbl.id FROM usersTbl WHERE usersTbl.firstname=? AND usersTbl.lastname=?),(select tasksTbl.id from tasksTbl where tasksTbl.name=?));'
            , [comment, user[0], user[1], taskId], function (err, rows, fields) {

                if (!err) {
                    console.log(rows);
                    func(rows);
                }
                else
                    console.log(err);
            });
        connection.release();
    });
}

exports.getUsersNotInTask = function (project, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT tasksTbl.userId FROM tasksTbl WHERE tasksTbl.name=?;', [task.name], function (err, rows, fields) {

            if (!err)
                connection.query('SELECT * FROM usersTbl WHERE usersTbl.id!=?;'
                    , [rows[0].userId], function (err, rows, fields) {

                        if (!err) {
                            console.log(rows);
                            func(rows);
                        }
                        else
                            console.log(err);
                    });
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.changeUserInTask = function (user, task, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT tasksTbl.id FROM tasksTbl WHERE tasksTbl.name=?;', [task.name], function (err, rows, fields) {

            if (!err)
                connection.query('UPDATE tasksTbl.userId=(SELECT usersTbl.id FROM usersTbl WHERE usersTbl.firstname=? AND usersTbl.lastname=?) WHERE tasksTbl.id=?);'
                    , [user.firstname, user.lastname, rows[0].id], function (err, rows, fields) {

                        if (!err) {
                            console.log(rows);
                            func(rows);
                        }
                        else
                            console.log(err);
                    });
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.saveSection = function (project, section, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT projectsTbl.id FROM projectsTbl WHERE projectsTbl.name=?;', [project.name], function (err, rows, fields) {

            if (!err)
                connection.query('INSERT INTO sectionsTbl (name, projectId) VALUES(?,?);', [section.name, rows[0].id], function (err, rows, fields) {

                    if (!err) {
                        console.log(rows);
                        func();
                    }
                    else
                        console.log(err);
                });
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.changeTaskSection = function (data, func) {

    pool.getConnection(function (err, connection) {

        connection.query('UPDATE tasksTbl SET tasksTbl.sectionId=? WHERE tasksTbl.name=?;', [data.newSectionId, data.taskName], function (err, rows, fields) {

            if (!err) {
                console.log(rows);
                func();
            }
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.saveTask = function (user, section, task, project, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT sectionsTbl.id FROM sectionsTbl, projectsTbl WHERE sectionsTbl.name=? AND projectsTbl.id=sectionsTbl.projectId AND projectsTbl.id=(SELECT projectsTbl.id FROM projectsTbl WHERE projectsTbl.name=?);', [section.name, project.name], function (err, rows, fields) {

            if (!err)
                connection.query('INSERT INTO tasksTbl (name, description, duedate, userId, sectionId, startdate) VALUES(?,?,?,(select usersTbl.id from usersTbl where usersTbl.firstname=?),?,?);'
                    , [task.name, task.description, task.duedate, user, rows[0].id, task.startdate], function (err, rows, fields) {

                        if (!err) {
                            console.log(rows);
                            func();
                        }
                        else
                            console.log(err);
                    });
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.editTask = function (user, section, task, project, oldTask, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT tasksTbl.id FROM tasksTbl WHERE tasksTbl.name=?;', [oldTask.name], function (err, rows, fields) {

            if (!err)
                connection.query('UPDATE tasksTbl set name=?, description=?, duedate=?, userId=(select usersTbl.id from usersTbl where usersTbl.firstname=?) where tasksTbl.id=?;'
                    , [task.name, task.description, task.duedate, user, rows[0].id], function (err, rows, fields) {

                        if (!err) {
                            console.log(rows);
                            func();
                        }
                        else
                            console.log(err);
                    });
            else
                console.log(err);
        });
        connection.release();
    });
}

exports.saveView = function (user, view, func) {

    pool.getConnection(function (err, connection) {

        connection.query('SELECT * FROM userviewsTbl WHERE userviewsTbl.userId=?;', [user.id], function (err, rows, fields) {

            if (!err)
                if (rows.length == 0)
                    connection.query('INSERT INTO userviewsTbl (userId, viewId) VALUES(?,(select viewsTbl.id from viewsTbl where viewsTbl.view=?));'
                        , [user.id, view], function (err, rows, fields) {

                            if (!err) {
                                console.log(rows);
                                func();
                            }
                            else
                                console.log(err);
                        });
                else
                    connection.query('update userviewsTbl set viewId=(select viewsTbl.id from viewsTbl where viewsTbl.view=?) where userId=?;'
                        , [view, user.id], function (err, rows, fields) {

                            if (!err) {
                                console.log(rows);
                                func();
                            }
                            else
                                console.log(err);
                        });
        });
        connection.release();
    });
}

exports.getView = function (user, func) {

    pool.getConnection(function (err, connection) {

        connection.query('select viewsTbl.view from viewsTbl, userviewsTbl where userviewsTbl.userId=? AND userviewsTbl.viewId=viewsTbl.id;', [user.id], function (err, rows, fields) {

            if (!err) {
                console.log(rows);
                func(rows[0]);
            }
            else
                console.log(err);
        });
        connection.release();
    });
}