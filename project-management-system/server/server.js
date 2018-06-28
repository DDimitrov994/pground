var express = require("express");
var app = express();
var _ = require("lodash");
var bodyParser = require("body-parser");
var json2csv = require('json2csv');
var jwt = require('jsonwebtoken');
var db = require('./db.js');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var path = require('path');


var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT;

http.listen(port, function () {
    console.log('listening on *:' + port);
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });
});

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var user = {};

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'shithappens';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    db.getUsers(function (data) {
        var users = data;
        user = users[_.findIndex(users, { id: jwt_payload.id })]
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });

});

passport.use(strategy);
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/index.html"));

});

app.get("/chat", function (req, res) {
    console.log("in chat");
    res.sendFile(path.resolve(__dirname + "/../client/chat.html"));

});

app.get("/addComentJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/addComent.js"));

});

app.get("/addUserToProjectJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/addUserToProject.js"));

});

app.get("/chatJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/chat.js"));

});

app.get("/chatRoomJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/chatRoom.js"));

});

app.get("/clientJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/client.js"));

});

app.get("/createProjectJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/createProject.js"));

});

app.get("/editTaskJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/editTask.js"));

});

app.get("/getCsvAJAXJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/getCsvAJAX.js"));

});

app.get("/getPdfAJAXJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/getPdfAJAX.js"));

});

app.get("/getProjectAJAXJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/getProjectAJAX.js"));

});

app.get("/gitJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/git.js"));

});

app.get("/loginJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/login.js"));

});

app.get("/logoutJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/logout.js"));

});

app.get("/openGanttJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/openGantt.js"));

});

app.get("/openProjectJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/openProject.js"));

});

app.get("/openTaskJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/openTask.js"));

});

app.get("/registerJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/register.js"));

});

app.get("/saveSectionJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/saveSection.js"));

});

app.get("/saveTaskJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/saveTask.js"));

});

app.get("/viewProjectsJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/viewProjects.js"));

});

app.get("/viewsJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/client/views.js"));

});

app.get("/client-renderJS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/render/client-render.js"));

});

app.get("/styleCSS", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/../client/public/style/style.css"));

});

app.post("/login", function (req, res) {
    var request = {};
    request = req.body;
    if (request.email && request.password) {
        var email = request.email;
        var password = request.password;
    }
    // usually this would be a database call:
    db.getUsers(function (users) {
        user = users[_.findIndex(users, { email: email })];
        if (!user) {
            res.json({ message: "no such user found" });
            return;
        }

        if (user.password === req.body.password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            var payload = { id: user.id };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ message: "user logged in successfully", token: token, name: user.firstname + " " + user.lastname });
        } else {
            res.json({ message: "passwords did not match" });
        }
    });

});

app.post("/register", function (req, res) {

    db.getUsers(function (users) {
        if (req.body.email && req.body.password) {
            var email = req.body.email;
            var password = req.body.password;
        }
        user = users[_.findIndex(users, { email: email })];
        if (!user) {
            var request = {};
            request = req.body;
            if (request.email && request.password && request.firstname && request.lastname) {
                db.createUser(request, function () {
                    res.json({ message: "user registered successfully!" });
                });
            }
        } else {
            res.json({ message: "user with this email exists!" });
        }
    });
});

app.get("/allprojects", passport.authenticate('jwt', { session: false }), function (req, res) {
    db.getProjects(function (data) {
        res.json({ result: data });
    });

    app.post("/addProject", function (req, res) {

        var project = {};
        project = req.body;
        // usually this would be a database call:
        db.addProject(user, project, function () {
            res.json({ message: "PROJECT ADDED!" });
        });
    });

    app.post("/joinProject", function (req, res) {

        var project = {};
        project = req.body;
        // usually this would be a database call:
        db.joinProject(user, project, function () {
            res.json({ message: "User Added!" });
        });
    });
});

app.get("/sectionAuthentication", passport.authenticate('jwt', { session: false }), function (req, res) {

    app.post("/getUsersInProject", function (req, res) {

        var users = [];
        var project = req.body;
        db.getUsersInProject(project, function (data) {
            users = data;
            res.json({ response: users });
        });
    });
    app.post("/getSections", function (req, res) {

        var project = {};
        project = req.body;
        // usually this would be a database call:
        db.getSections(project, function (data) {
            res.json({ result: data });
        });
    });

    app.post("/saveSection", function (req, res) {

        var section = {};
        var project = {};
        section = req.body.section;
        project = req.body.project;
        // usually this would be a database call:
        db.saveSection(project, section, function () {
            res.json({ message: "Section Added!" });
        });
    });

    app.post("/getTasks", function (req, res) {

        var project = req.body;
        // usually this would be a database call:
        db.getTasks(project, function (data) {
            res.json({ response: data });
        });
    });

    app.post("/changeTaskSection", function (req, res) {

        var data = req.body;
        // usually this would be a database call:
        db.changeTaskSection(data, function () {
            res.json({ message: "section changed!" });
        });
    });

    app.post("/getComments", function (req, res) {

        var taskName = req.body.taskId;
        // usually this would be a database call:
        db.getComments(taskName, function (data) {
            res.json({ response: data });
        });
    });

    app.post("/addComment", function (req, res) {

        var comment = req.body.comment;
        var taskId = req.body.taskId;
        var user = req.body.user;
        user = user.split(" ");
        db.addComment(comment, taskId, user, function () {
            db.getComments(taskId, function (data) {
                res.json({ response: data });
            });
        })
        // usually this would be a database call:

    });


    app.post("/getUsersNotInTask", function (req, res) {

        var task = req.body.task;
        // usually this would be a database call:
        db.getUsersNotInTask(task, function (data) {
            res.json({ response: data });
        });
    });

    app.post("/changeUserInTask", function (req, res) {

        var task = req.body.task;
        var newUser = req.body.user;
        // usually this would be a database call:
        db.changeUserInTask(newUser, task, function () {
            res.json({ response: "User changed!" });
        });
    });

    app.post("/saveTask", function (req, res) {

        var section = {};
        var task = {};
        var userToBeAssigned = {};
        var project = req.body.project;
        section = req.body.section;
        task = req.body.task;
        if (task.user) {
            userToBeAssigned = task.user;
        } else {
            userToBeAssigned = user.firstname;
        }
        // usually this would be a database call:
        db.saveTask(userToBeAssigned, section, task, project, function () {
            res.json({ message: "Task Added!" });
        });
    });

    app.post("/editTask", function (req, res) {

        var section = {};
        var task = {};
        var oldTask = {};
        var userToBeAssigned = {};
        var project = req.body.project;
        section = req.body.section;
        oldTask = req.body.oldTask;
        oldTask.name = oldTask.name.split(": ");
        oldTask.name = oldTask.name[1];
        task = req.body.task;
        if (task.user) {
            userToBeAssigned = task.user;
        } else {
            userToBeAssigned = user.firstname;
        }
        // usually this would be a database call:
        db.editTask(userToBeAssigned, section, task, project, oldTask, function () {
            res.json({ message: "Task Changed!" });
        });
    });

    app.post("/saveView", function (req, res) {

        var view = req.body.view;
        // usually this would be a database call:
        db.saveView(user, view, function () {
            res.json({ message: "View Saved!" });
        });
    });

    app.get("/getView", function (req, res) {

        // usually this would be a database call:
        db.getView(user, function (data) {
            res.json({ response: data });
        });
    });

    app.post("/getCsv", function (req, res) {

        var project = req.body;
        // usually this would be a database call:

        db.getTasks(project, function (data) {
            var csvData = [];
            var fields = ['name', 'description', 'duedate', 'startdate', 'firstname', 'lastname', 'sectionName'];
            for (var i = 0; i < data.length; i++) {
                csvData.push({ name: data[i].name, description: data[i].description, duedate: data[i].duedate, startdate: data[i].startdate, firstname: data[i].firstname, lastname: data[i].lastname, sectionName: data[i].sectionName });
            }
            var csv = json2csv({ data: csvData, fields: fields });
            res.json({ response: csv });
        });
    });

    app.post("/getPdf", function (req, res) {

        var project = req.body;
        // usually this would be a database call:

        db.getTasks(project, function (data) {
            res.json({ response: data });
        });
    });
    res.json({ message: "auth Success!" });
});
