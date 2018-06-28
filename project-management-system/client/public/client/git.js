function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

function git() {
    document.getElementById("git").addEventListener("click", function () {
        var gitUrl = document.getElementById("gitUrl").value;
        gitUrl = gitUrl.split("/");
        var gitUser = gitUrl[gitUrl.length - 2];
        var gitProject = gitUrl[gitUrl.length - 1];
        var gitApiUrl = "https://api.github.com/repos/" + gitUser + "/" + gitProject + "/branches";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var branchCollection = JSON.parse(this.responseText);
                xhttp.onreadystatechange = function () {

                    if (this.readyState == 4 && this.status == 200) {
                        project = {};
                        project.name = gitProject;

                        xhttp.onreadystatechange = function () {

                            if (this.readyState == 4 && this.status == 200) {

                                xhttp.onreadystatechange = function () {

                                    if (this.readyState == 4 && this.status == 200) {

                                        var section = {};
                                        var data = {};
                                        section.name = "backlog";

                                        data.project = project;
                                        data.section = section;
                                        xhttp.onreadystatechange = function () {

                                            if (this.readyState == 4 && this.status == 200) {
                                                var task = {};
                                                for (var i = 0; i < branchCollection.length; i++) {

                                                    document.getElementById("container").innerText = "importing task " + i + " of " + branchCollection.length;
                                                    wait(500);
                                                    task.user = document.getElementById("profile").innerText;
                                                    task.user = task.user.split(" ");
                                                    task.user = task.user[0];
                                                    task.name = branchCollection[i].name;
                                                    task.description = "Imported tasks do not have description available and duedate is default!";
                                                    task.duedate = moment("11/25/2017").format('l');
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
                                                }
                                            }
                                        };
                                        xhttp.open("POST", URL + "/saveSection", true);
                                        xhttp.setRequestHeader("Content-Type", "application/json");
                                        xhttp.send(JSON.stringify(data));
                                    }
                                };

                                xhttp.open("GET", URL + "/sectionAuthentication", true);
                                xhttp.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
                                xhttp.send();
                            }
                        }

                        xhttp.open("POST", URL + "/addProject", true);
                        xhttp.setRequestHeader("Content-Type", "application/json");
                        xhttp.send(JSON.stringify(project));
                    }
                };

                xhttp.open("GET", URL + "/allprojects", true);
                xhttp.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
                xhttp.send();

            }
        }

        xhttp.open("GET", gitApiUrl);
        xhttp.send();
    })
}