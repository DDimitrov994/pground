function registerFormRender() {
    var html = '<div class="container">'
        + '<form>'
        + '<div class="form-group">'
        + '<input type="email" class="form-control" id="email" name="email" placeholder="Enter email">'
        + '</div >'
        + '<div class="form-group">'
        + '<input type="password" class="form-control" id="password" name="password" placeholder="Password">'
        + '</div>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" id="firstname" name="firstname" placeholder="First Name">'
        + '</div>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" id="lastname" name="lastname" placeholder="Last Name">'
        + '</div>'
        + '<a class="nav-item nav-link" href="#" id="registerBtn">Register</a>'
        + '</form>'
        + '</div>';
    return html;
}

function loginFormRender(data) {
    if (!data) {
        data = "";
    }
    var html = '<div class="container">'
        + '<p>' + data + '</p>'
        + '<p>Login</p>'
        + '<form>'
        + '<div class="form-group">'
        + '<input type="email" class="form-control" id="email" name="email" placeholder="Enter email">'
        + '</div >'
        + '<div class="form-group">'
        + '<input type="password" class="form-control" id="password" name="password" placeholder="Password">'
        + '</div>'
        + '<a class="nav-item nav-link" href="#" id="loginBtn">Login</a>'
        + '</form>'
        + '</div>';
    return html;
}

function menuRender(data) {
    var html = '<nav class="navbar navbar-expand-lg navbar-light bg-light">'
        + '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"'
        + 'aria-expanded="false" aria-label="Toggle navigation">'
        + '<span class="navbar-toggler-icon"></span>'
        + '</button>'
        + '<div class="collapse navbar-collapse" id="navbarNavAltMarkup">'
        + '<div class="navbar-nav">'
        + '<a class="nav-item nav-link" href="#" id="logout">Log Out</a>'
        + '<a class="nav-item nav-link" href="#" id="profile">' + data + '</a>'
        + '<a class="nav-item nav-link" href="#" id="createproject">Create Project</a>'
        + '<a class="nav-item nav-link" href="#" id="viewprojects">View projects</a>'
        + '<a class="nav-item nav-link" href="#" id="chat">Chat Room</a>'
        + '</div>'
        + '</div>'
        + '</nav>';
    return html;
}

function mainProjectScreenRender(data) {
    var html = '<h1>All Projects</h1>'
    if (data.length == 0) {
        html += '<h2>No Projects!</h2>'
            + '<p>Create a project first!</p>';
    }
    for (var i = 0; i < data.length; i++) {
        html += '<div class="card" style="width: 20rem;">'
            + '<div class="card-body">'
            + '<h4 class="card-title">' + data[i].name + '</h4>'
            + '<h6 class="card-title"> Members:' + data[i].members + '</h6>'
            + '<h6 class="card-title" id="' + data[i].name + '_message"></h6>';
        var currentUser = document.getElementById("profile").innerText;
        var projectMember = data[i].members.split(", ");
        var isExist = false;
        for (var j = 0; j < projectMember.length; j++) {
            if (currentUser == projectMember[j]) {
                isExist = true;
            }
        }
        if (isExist == false) {
            html += '<a href="#" id="' + data[i].name + '_join" class="card-link joinproject">Join Project</a>';
        } else {
            html += '<a href="#" id="' + data[i].name + '_open" class="card-link openproject">Open Project</a>';
        }
        html += '<a href="#" id="' + data[i].name + '_csv" class="card-link csv">Export Project as CSV</a>';
        html += '<a href="#" id="' + data[i].name + '_pdf" class="card-link pdf">Export Project as PDF</a>';
        html += '</div>'
            + '</div>';
    }
    return html;
}

function createProjectRender() {
    var html = '<form>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" id="projectname" placeholder="Enter Project Name">'
        + '</div>'
        + '<a class="nav-item nav-link" href="#" id="create">Add project</a>'
        + '</form>';
    return html;
}

function profileScreenRender(data) {
    var html = '<h1>Profile</h1>'
        + '<p>Name:' + data.name + '</p>'
        + '<input type="text" class="form-control" id="gitUrl" placeholder="Enter git url">'
        + '<a class="nav-item nav-link" href="#" id="git">Add Github project!</a>';
    return html;
}

function renderProjectView(data, projectName, tasks) {
    var html = '<h2 id="projectName">' + projectName + '</h2>'
        + '<div class="container">'
        + '<a class="nav-item nav-link" href="#" id="addSection">Add section</a>'
        + '<a class="nav-item nav-link" href="#" id="kanbanView">Kanban</a>'
        + '<a class="nav-item nav-link" href="#" id="listView">List</a>'
        + '<a class="nav-item nav-link" href="#" id="gantt">Gantt Diagram</a>'
        + '<div class="row">';

    for (var i = 0; i < data.length; i++) {
        html += '<div class="col" id="' + data[i].id + '">'
            + data[i].name;
        html += '<div class="row">'
            + '<button id="' + data[i].name + '" class="btn btn-primary addTask">Add task</button>'
            + '</div>'
        for (var j = 0; j < tasks.length; j++) {
            if (tasks[j].sectionId == data[i].id) {
                html += '<div class="row" id="' + tasks[j].name + '" draggable="true"><div class="card" style="width: 20rem;">'
                    + '<div class="card-body tasks">'
                    + '<h4 class="card-title name">Title: ' + tasks[j].name + '</h4>'
                    + '<h6 class="card-title description"> Description: ' + tasks[j].description + '</h6>'
                    + '<h6 class="card-title">Due Date: ' + tasks[j].duedate + '</h6>'
                    + '<h6 class="card-title">Assigned to: ' + tasks[j].firstname + ' ' + tasks[j].lastname + '</h6>'
                    + '<a class="nav-item nav-link showcomments" href="#">Comments</a>'
                    + '<a class="nav-item nav-link editTask" href="#">Edit Task</a>'
                    + '<h6 class="card-title comments"></h6>';
                html += '</div>'
                    + '</div></div>';
            }
        }
        html += '</div>';
    }
    html += '</div>'
        + '</div>';
    return html;
}

function newSectionFormRender() {

    var html = '<form>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" id="sectionName" placeholder="Enter section name">'
        + '</div>'
        + '<a id="addSection" class="btn btn-primary">Add section</a>'
        + '</form>';
    return html;
}

function newTaskFormRender(users) {

    var html = '<form>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" id="taskName" placeholder="Enter task name">'
        + '</div>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" id="taskDescription" placeholder="Enter task description">'
        + '</div>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" data-provide="datepicker" id="taskDuedate" placeholder="Select due date">'
        + '</div>'
        + '<select value="Select User" id="users">'
    for (var i = 0; i < users.length; i++) {
        html += '<option value=' + users[i].members + '>' + users[i].members + '</option>';
    }
    html += '</select>'
        + '<a id="addTask" class="btn btn-primary">Add task</a>'
        + '</form>';
    return html;
}

function editTaskFormRender(users) {

    var html = '<form>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" id="taskName" placeholder="Enter task name">'
        + '</div>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" id="taskDescription" placeholder="Enter task description">'
        + '</div>'
        + '<div class="form-group">'
        + '<input type="text" class="form-control" data-provide="datepicker" id="taskDuedate" placeholder="Select due date">'
        + '</div>'
        + '<select value="Select User" id="users">'
    for (var i = 0; i < users.length; i++) {
        html += '<option value=' + users[i].members + '>' + users[i].members + '</option>';
    }
    html += '</select>'
        + '<a id="editTask" class="btn btn-primary">Edit task</a>'
        + '</form>';
    return html;
}

function renderComments(data) {
    var html = "";
    if (data.length == 0) {
        return '<input type="text" class="form-control" id="comment" placeholder="Comment">'
            + '<a id="addComment" class="btn btn-primary">Add Comment</a>';
    }

    for (var i = 0; i < data.length; i++) {

        html += '<div class="row">'
            + '<div class="card" style="width: 20rem;">'
            + '<div class="card-body comments" id="' + data[i].id + '">'
            + '<h6 class="card-title"> Comment: ' + data[i].message + '</h6>'
            + '<h6 class="card-title">Author: ' + data[i].firstname + ' ' + data[i].lastname + '</h6>'
            + '</div>'
            + '</div>'
            + '</div>';
    }
    html += '<input type="text" class="form-control" id="comment" placeholder="Comment">'
        + '<a id="addComment" class="btn btn-primary">Add Comment</a>';
    return html;
}

function renderGantt(sections, tasks) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var startDates = [];
    var dueDates = [];
    for (var i = 0; i < tasks.length; i++) {
        startDates.push(moment(tasks[i].startdate));
        dueDates.push(moment(tasks[i].duedate));
    }
    var maxDueDate = moment.max(dueDates);
    var minStartDate = moment.min(startDates);
    maxDueDate = maxDueDate.format("l");
    minStartDate = minStartDate.format("l");
    var displayDays = moment(maxDueDate).diff(moment(minStartDate), 'days');
    canvas.height = 120 * (tasks.length + 1);
    canvas.width = 120 * (displayDays + 2);
    canvas.id = "canvas";
    var xOffSet = 120;
    var yOffSet = 120
    var date = moment(minStartDate).format("l");
    var dateRects = [];
    var taskRects = [];
    var colors = [];
    function get_random_color() {
        var letters = 'ABCDE'.split('');
        var color = '#';
        for (var i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    for (var i = xOffSet; i < canvas.width; i += xOffSet) {
        ctx.strokeRect(i, 0, xOffSet, 50);
        dateRects.push({ x: i, y: 0, w: xOffSet, h: 50, date: date });
        ctx.font = "20px Georgia";
        ctx.fillText(date, i, 30);
        date = moment(date).add(1, "d").format("l");
        // rects.push({ text: date, x: i, y: 30 });

    }
    var indx = 0;
    for (var j = yOffSet; j < canvas.height; j += yOffSet) {
        ctx.strokeRect(0, j, yOffSet, yOffSet);
        taskRects.push({ x: 0, y: j, w: yOffSet, h: yOffSet, task: tasks[indx] });
        ctx.font = "20px Georgia";
        ctx.fillText(tasks[indx].name, 0, j + 20);
        if (indx == tasks.length - 1)
            break;
        indx++;
    }
    var drawTasks = [];
    var x, y, w, h;

    for (var k = 0; k < sections.length; k++) {
        var color = get_random_color();
        colors.push({ id: sections[k].id, name: sections[k].name, color: color });
    }


    for (var i = 0; i < taskRects.length; i++) {
        for (var j = 0; j < dateRects.length; j++) {
            if (taskRects[i].task.startdate == dateRects[j].date) {
                x = dateRects[j].x;
                y = taskRects[i].y;
            }
            if (taskRects[i].task.duedate == dateRects[j].date) {
                w = dateRects[j].x - x;
                h = taskRects[i].h;
            }
        }
        for (var k = 0; k < colors.length; k++) {
            if (colors[k].id == taskRects[i].task.sectionId) {
                ctx.font = "20px Georgia";
                ctx.fillStyle = colors[k].color;
                ctx.fillText(colors[k].name, 1, (k * 20 + 20));
            }
        }

        ctx.fillRect(x, y, w, h);

    }
    return canvas;
}

function renderExportCanvas() {
    var btn = document.createElement("a");
    btn.className = 'nav-item nav-link';
    btn.innerText = "Export As Image";
    btn.href = "#";
    btn.addEventListener("click", function () {
        var canvas = document.getElementById("canvas");
        // save canvas image as data url (png format by default)
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        window.location.href = image; // it will save locally
    });
    return btn;
}