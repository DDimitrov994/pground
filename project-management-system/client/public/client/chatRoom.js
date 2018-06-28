function chatRoom() {
    document.getElementById("chat").addEventListener("click", function () {

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("container").innerHTML = '<ul id="messages"></ul>'
                    + '<input id="m" autocomplete="off" /><button id="send">Send</button>';
                var socket = io.connect(URL);
                document.getElementById("send").addEventListener("click", function () {
                    socket.emit('chat message', document.getElementById("m").value + "            <small>sent by: " + document.getElementById("profile").innerText + "</small>");
                    document.getElementById("m").value = "";
                });
                socket.on('chat message', function (msg) {
                    var li = document.createElement('li');
                    li.innerHTML = msg;
                    document.getElementById("messages").appendChild(li);
                    window.scrollTo(0, document.body.scrollHeight);
                });
            }
        };

        xhttp.open("GET", URL + "/chat", true);
        //    xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
    });
}