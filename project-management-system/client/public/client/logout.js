function logout() {
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("token");
        alert("logged out!");
        location.reload();
    });
}