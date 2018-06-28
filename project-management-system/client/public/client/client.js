const URL = "https://rocky-bayou-80245.herokuapp.com";

var client_renderJS = document.createElement("script");
client_renderJS.src = URL + "/client-renderJS";

var addComentJS = document.createElement("script");
addComentJS.src = URL + "/addComentJS";

var addUserToProjectJS = document.createElement("script");
addUserToProjectJS.src = URL + "/addUserToProjectJS";

var chatJS = document.createElement("script");
chatJS.src = URL + "/chatJS";

var chatRoomJS = document.createElement("script");
chatRoomJS.src = URL + "/chatRoomJS";

var createProjectJS = document.createElement("script");
createProjectJS.src = URL + "/createProjectJS";

var editTaskJS = document.createElement("script");
editTaskJS.src = URL + "/editTaskJS";

var getCsvAJAXJS = document.createElement("script");
getCsvAJAXJS.src = URL + "/getCsvAJAXJS";

var getPdfAJAXJS = document.createElement("script");
getPdfAJAXJS.src = URL + "/getPdfAJAXJS";

var getProjectAJAXJS = document.createElement("script");
getProjectAJAXJS.src = URL + "/getProjectAJAXJS";

var gitJS = document.createElement("script");
gitJS.src = URL + "/gitJS";

var loginJS = document.createElement("script");
loginJS.src = URL + "/loginJS";

var logoutJS = document.createElement("script");
logoutJS.src = URL + "/logoutJS";

var openGanttJS = document.createElement("script");
openGanttJS.src = URL + "/openGanttJS";

var openProjectJS = document.createElement("script");
openProjectJS.src = URL + "/openProjectJS";

var openTaskJS = document.createElement("script");
openTaskJS.src = URL + "/openTaskJS";

var registerJS = document.createElement("script");
registerJS.src = URL + "/registerJS";

var saveSectionJS = document.createElement("script");
saveSectionJS.src = URL + "/saveSectionJS";

var saveTaskJS = document.createElement("script");
saveTaskJS.src = URL + "/saveTaskJS";

var viewProjectsJS = document.createElement("script");
viewProjectsJS.src = URL + "/viewProjectsJS";

var viewsJS = document.createElement("script");
viewsJS.src = URL + "/viewsJS";

var styleCSS = document.createElement("style");
styleCSS.src = URL + "/styleCSS";


var body = document.getElementsByTagName("body");
body[0].appendChild(addComentJS);
body[0].appendChild(addUserToProjectJS);
body[0].appendChild(chatJS);
body[0].appendChild(chatRoomJS);
body[0].appendChild(createProjectJS);
body[0].appendChild(editTaskJS);
body[0].appendChild(getCsvAJAXJS);
body[0].appendChild(getPdfAJAXJS);
body[0].appendChild(getProjectAJAXJS);
body[0].appendChild(gitJS);
body[0].appendChild(loginJS);
body[0].appendChild(logoutJS);
body[0].appendChild(openGanttJS);
body[0].appendChild(openProjectJS);
body[0].appendChild(openTaskJS);
body[0].appendChild(registerJS);
body[0].appendChild(saveSectionJS);
body[0].appendChild(saveTaskJS);
body[0].appendChild(viewProjectsJS);
body[0].appendChild(viewsJS);
body[0].appendChild(styleCSS);
body[0].appendChild(client_renderJS);