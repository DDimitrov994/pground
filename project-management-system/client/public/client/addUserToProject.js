function addUserToProject() {
    var joinProjectBtnCollection = document.getElementsByClassName("joinproject");
    for (var i = 0; i < joinProjectBtnCollection.length; i++) {
        joinProjectBtnCollection[i].addEventListener("click", function () {
            var xhttp = new XMLHttpRequest();
            var project = {};
            var projectID = this.id.split("_");
            project.name = projectID[0];
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    document.getElementById(project.name + "_message").innerText = JSON.parse(this.responseText).message;
                }
            };
            xhttp.open("POST", URL + "/joinProject", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(project));
        })
    }
}