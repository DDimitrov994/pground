function saveTask() {
    var xhttp = new XMLHttpRequest();

    var addTaskBtnCollection = document.getElementsByClassName("addTask");
    for (var i = 0; i < addTaskBtnCollection.length; i++) {
        addTaskBtnCollection[i].addEventListener("click", function () {
            var data = {};
            var section = {};
            var task = {};
            var project = {};
            project.name = document.getElementById("projectName").innerText;
            section.name = this.id;
            data.section = section;
            data.project = project;
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    data.users = JSON.parse(this.responseText).response;
                    document.getElementById("container").innerHTML = newTaskFormRender(data.users);
                    document.getElementById("users").addEventListener("change", function () {
                        task.user = this.value;
                    });
                    document.getElementById("addTask").addEventListener("click", function () {

                        task.name = document.getElementById("taskName").value;
                        task.description = document.getElementById("taskDescription").value;
                        task.duedate = moment(document.getElementById("taskDuedate").value).format('l');
                        task.startdate = moment().format('l');
                        data.task = task;

                        xhttp.onreadystatechange = function () {

                            if (this.readyState == 4 && this.status == 200) {
                                document.getElementById("container").innerText = JSON.parse(this.responseText).message;
                            };

                        }

                        xhttp.open("POST", URL + "/saveTask", true);
                        xhttp.setRequestHeader("Content-Type", "application/json");
                        xhttp.send(JSON.stringify(data));
                    });

                }
            };
            xhttp.open("POST", URL + "/getUsersInProject", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(data.project));
        });
    }
}