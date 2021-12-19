var io = io();
function menuOpen() {
    document.querySelector(".menu").setAttribute("style", "width:75vw;transition-duration:0.3s;");
    document.getElementById("rest").setAttribute("style", "width: 24.5vw;");
    document.getElementById("ul").setAttribute("style", "display:block;");
}
function closeMenu() {
     console.log("ok");
    document.getElementById("rest").setAttribute("style", "width:0vw;");
    document.querySelector(".menu").setAttribute("style", "width:0vw;transition-duration:0.3s;");
    setTimeout(() => {
    document.getElementById("ul").setAttribute("style", "font-size:0px;");
    }, 100);
}