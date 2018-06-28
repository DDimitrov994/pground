function createProject() {
    document.getElementById("createproject").addEventListener("click", function () {
        document.getElementById("container").innerHTML = createProjectRender();
        document.getElementById("create").addEventListener("click", function () {
            var project = {};
            project.name = document.getElementById("projectname").value;
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    document.getElementById("menu").innerHTML = menuRender();
                    document.getElementById("container").innerHTML = '<h2>PROJECT CREATED!</h2>';
                    logout();
                    viewProjects();
                }
            };
            xhttp.open("POST", URL + "/addProject", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(project));
        });
    })
}