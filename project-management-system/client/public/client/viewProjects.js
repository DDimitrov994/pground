function viewProjects() {
    document.getElementById("viewprojects").addEventListener("click", function () {

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("container").innerHTML = mainProjectScreenRender(JSON.parse(this.responseText).result);
                addUserToProject();
                openProject();
            }
        };

        xhttp.open("GET", URL + "/allprojects", true);
        xhttp.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
        xhttp.send();
    });
}