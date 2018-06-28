function getProjectAJAX(project) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    var data = {};
                    data.sections = JSON.parse(this.responseText).result;
                    data.project = project;
                    xhttp.onreadystatechange = function () {

                        if (this.readyState == 4 && this.status == 200) {
                            data.tasks = JSON.parse(this.responseText).response;
                            document.getElementById("container").innerHTML = renderProjectView(data.sections, data.project.name, data.tasks);
                            saveSection();
                            saveTask();
                            editTask();
                            openTask();
                            changeView();
                            openGantt(data);
                            var cards = document.getElementsByClassName("row");
                            var sections = document.getElementsByClassName("col");
                            getView(sections);
                            for (var i = 0; i < sections.length; i++) {
                                sections[i].addEventListener("drop", function (ev) {
                                    ev.preventDefault();
                                    var id = ev.dataTransfer.getData("text");
                                    ev.target.appendChild(document.getElementById(id));
                                    var newSectionId = ev.target.id;
                                    var data = {};
                                    data.newSectionId = newSectionId;
                                    data.taskName = id;

                                    xhttp.onreadystatechange = function () {
                                        if (this.readyState == 4 && this.status == 200) {
                                            getProjectAJAX(project);
                                        }
                                    }

                                    xhttp.open("POST", URL + "/changeTaskSection", true);
                                    xhttp.setRequestHeader("Content-Type", "application/json");
                                    xhttp.send(JSON.stringify(data));

                                });
                                sections[i].addEventListener("dragover", function (ev) {
                                    ev.preventDefault();
                                })
                            }
                            for (var i = 0; i < cards.length; i++) {
                                cards[i].addEventListener("dragstart", function (ev) {
                                    ev.dataTransfer.setData("text", ev.target.id);
                                })
                            }
                        }
                    }

                    xhttp.open("POST", URL + "/getTasks", true);
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    xhttp.send(JSON.stringify(project));

                }
            };
            xhttp.open("POST", URL + "/getSections", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(project));
        }
    };
    xhttp.open("GET", URL + "/sectionAuthentication", true);
    xhttp.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
    xhttp.send();
}