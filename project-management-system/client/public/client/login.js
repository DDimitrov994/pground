document.getElementById("login").addEventListener("click", function () {

    var loginForm = loginFormRender();
    document.getElementById("container").innerHTML = loginForm;

    document.getElementById("loginBtn").addEventListener("click", function () {
        var userlogin = {};
        userlogin.email = document.getElementById("email").value;
        userlogin.password = document.getElementById("password").value;

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                localStorage.setItem('token', JSON.parse(this.responseText).token);
                alert(JSON.parse(this.responseText).message);
                if (JSON.parse(this.responseText).token) {
                    document.getElementById("menu").innerHTML = menuRender(JSON.parse(this.responseText).name);
                    document.getElementById("container").innerHTML = profileScreenRender(JSON.parse(this.responseText));
                    logout();
                    viewProjects();
                    createProject();
                    chatRoom();
                    git();
                }
            }
        };

        xhttp.open("POST", URL + "/login", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(userlogin));
    });
});