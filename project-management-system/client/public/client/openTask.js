function openTask() {
    var tasksCollection = document.getElementsByClassName("showcomments");
    var xhttp = new XMLHttpRequest();
    var data = {};

    for (var i = 0; i < tasksCollection.length; i++) {

        tasksCollection[i].addEventListener("click", function () {
            data.taskId = this.parentElement.parentElement.parentElement.id
            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById(data.taskId).lastElementChild.lastElementChild.lastElementChild.innerHTML = renderComments(JSON.parse(this.responseText).response);
                    addComent(data.taskId);
                };

            }

            xhttp.open("POST", URL + "/getComments", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(data));
        });
    }
}