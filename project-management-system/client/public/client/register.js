document.getElementById("register").addEventListener("click", function () {

    var registerForm = registerFormRender();
    document.getElementById("container").innerHTML = registerForm;

    document.getElementById("registerBtn").addEventListener("click", function () {
        var userregister = {};
        userregister.email = document.getElementById("email").value;
        userregister.password = document.getElementById("password").value;
        userregister.firstname = document.getElementById("firstname").value;
        userregister.lastname = document.getElementById("lastname").value;

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("container").innerHTML = loginFormRender(JSON.parse(this.responseText).message);
            }
        };

        xhttp.open("POST", URL + "/register", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(userregister));
    });
});