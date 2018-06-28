function saveSection() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("addSection").addEventListener("click", function () {
                var project = {};
                project.name = document.getElementById("projectName").innerText;
                document.getElementById("container").innerHTML = newSectionFormRender();
                document.getElementById("addSection").addEventListener("click", function () {

                    var section = {};
                    var data = {};
                    section.name = document.getElementById("sectionName").value;

                    data.project = project;
                    data.section = section;
                    xhttp.onreadystatechange = function () {

                        if (this.readyState == 4 && this.status == 200) {

                            document.getElementById("container").innerHTML = getProjectAJAX(project);
                        }
                    };
                    xhttp.open("POST", URL + "/saveSection", true);
                    xhttp.setRequestHeader("Content-Type", "application/json");
                    xhttp.send(JSON.stringify(data));
                })

            })

        }
    };

    xhttp.open("GET", URL + "/sectionAuthentication", true);
    xhttp.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
    xhttp.send();
}