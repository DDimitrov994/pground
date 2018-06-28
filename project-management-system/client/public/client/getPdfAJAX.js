function getPdfAJAX(project, that) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {

                    var doc = new jsPDF();
                    var data = JSON.parse(this.responseText).response;
                    var text = "";
                    for (var i = 0; i < data.length; i++) {
                        text += "\n\n\n" + data[i].name + "\n" + data[i].description + "\n" + data[i].startdate + " " + data[i].duedate + "\n" + data[i].firstname + " " + data[i].lastname + "\n" + data[i].sectionName
                    }
                    doc.text(text, 0, 20);
                    doc.save(project.name + '.pdf');
                    //that.href = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(JSON.parse(this.responseText).response);
                    //that.download = project.name + '.csv';
                }
            };

            xhttp.open("POST", URL + "/getPdf", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(project));
        }
    };

    xhttp.open("GET", URL + "/sectionAuthentication", true);
    xhttp.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
    xhttp.send();

}