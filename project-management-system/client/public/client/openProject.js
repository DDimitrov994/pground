function openProject() {
    var openProjectBtnCollection = document.getElementsByClassName("openproject");
    var csvProjectBtnCollection = document.getElementsByClassName("csv");
    var pdfProjectBtnCollection = document.getElementsByClassName("pdf");
    for (var i = 0; i < openProjectBtnCollection.length; i++) {
        openProjectBtnCollection[i].addEventListener("click", function () {
            var project = {};
            var projectID = this.id.split("_");
            project.name = projectID[0];
            getProjectAJAX(project);
        });
    }
    for (var i = 0; i < csvProjectBtnCollection.length; i++) {

        var project = {};
        var projectID = csvProjectBtnCollection[i].id.split("_");
        project.name = projectID[0];
        getCsvAJAX(project, csvProjectBtnCollection[i]);
    }

    for (var i = 0; i < pdfProjectBtnCollection.length; i++) {
        pdfProjectBtnCollection[i].addEventListener("click", function () {
            var project = {};
            var projectID = this.id.split("_");
            project.name = projectID[0];
            getPdfAJAX(project, this);

        })

    }
}