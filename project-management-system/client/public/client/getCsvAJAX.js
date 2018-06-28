function getCsvAJAX(project, that) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    that.href = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(JSON.parse(this.responseText).response);
                    that.download = project.name + '.csv';
                }
            };

            xhttp.open("POST", URL + "/getCsv", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(project));
        }
    };

    xhttp.open("GET", URL + "/sectionAuthentication", true);
    xhttp.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
    xhttp.send();

}