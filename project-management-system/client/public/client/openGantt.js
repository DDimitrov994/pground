function openGantt(data) {
    document.getElementById("gantt").addEventListener("click", function () {
        document.getElementById("container").innerHTML = "";
        document.getElementById("container").appendChild(renderGantt(data.sections, data.tasks));
        document.getElementsByClassName("navbar-nav")[0].appendChild(renderExportCanvas());
    });
}