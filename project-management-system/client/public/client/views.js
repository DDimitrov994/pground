function kanbanView(elements) {
    document.getElementById("kanbanView").addEventListener("click", function () {
        for (var i = 0; i < elements.length; i++) {
            elements[i].className = 'col';
        }
        var view = "kanban";
        var data = {};
        data.view = view;
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText).message);
            };

        }

        xhttp.open("POST", URL + "/saveView", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
    });
}

function listView(elements) {
    document.getElementById("listView").addEventListener("click", function () {
        for (var i = 0; i < elements.length; i++) {
            elements[i].className += ' list';
        }
        var view = "list";
        var data = {};
        data.view = view;
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(this.responseText).message);
            };

        }

        xhttp.open("POST", URL + "/saveView", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));

    });
}

function changeView() {
    var elements = document.getElementsByClassName("col");
    listView(elements);
    kanbanView(elements);
}

function getView(elements) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var resp=JSON.parse(this.responseText).response;
            if (resp.view == "kanban") {
                for (var i = 0; i < elements.length; i++) {
                    elements[i].className = 'col';
                }
            } else {
                for (var i = 0; i < elements.length; i++) {
                    elements[i].className += ' flex';
                }
            }
        };
    }

    xhttp.open("GET", URL + "/getView", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}