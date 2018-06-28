function addComent(taskId) {
    document.getElementById("addComment").addEventListener("click", function () {
        var xhttp = new XMLHttpRequest();
        var data = {};
        data.comment = document.getElementById("comment").value;
        data.user = document.getElementById("profile").innerText;
        data.taskId = taskId;
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(data.taskId).lastElementChild.lastElementChild.lastElementChild.innerHTML = renderComments(JSON.parse(this.responseText).response);
            };

        }
        xhttp.open("POST", URL + "/addComment", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
    })
}