var socket = io();
var a;
function loadBody() {
    fetch('/../../name.txt')
    .then(response => response.text())
    .then(data => {
        document.getElementById("title").innerHTML = "Welcome "+data;
        a = data;
    });
    var li1 = document.getElementById("li1");
var li2 = document.getElementById("li2");
var li3 = document.getElementById("li3");
var li4 = document.getElementById("li4");
var li5 = document.getElementById("li5");
var li6 = document.getElementById("li1");
var li7 = document.getElementById("li2");
var li8 = document.getElementById("li3");
var li9 = document.getElementById("li4");
var li10 = document.getElementById("li5");
li1.addEventListener('click', () => {
    window.location.href="dashboard/"+a;
});

li2.addEventListener('click', () => {
    window.location.href="/generator/"+a;
});

li3.addEventListener('click', () => {
    window.location.href="/clients/"+a;
});

li4.addEventListener('click', () => {
    window.location.href="/youtube/"+a;
});

li5.addEventListener('click', () => {
    window.location.href="/premium/"+a;
});
li6.addEventListener('click', () => {
    window.location.href="dashboard/"+a;
});

li7.addEventListener('click', () => {
    window.location.href="/generator/"+a;
});

li8.addEventListener('click', () => {
    window.location.href="/clients/"+a;
});

li9.addEventListener('click', () => {
    window.location.href="/youtube/"+a;
});

li10.addEventListener('click', () => {
    window.location.href="/premium/"+a;
});

var totalToday;
// fetch('/../../../today.txt')
// .then(response => response.text())
// .then(data => {
//     totalToday = data;
//     document.getElementById("today-num").textContent = totalToday;
//     var todayMeter = data/5;
//     todayMeter = todayMeter.toFixed(3);
//     document.getElementById("meter1").setAttribute("value", todayMeter);

// });


// var total;
// fetch('/../../../total.txt')
// .then(response => response.text())
// .then(data => {
//     total = data;
//     document.getElementById("total-num").textContent = total;
//     var todayMeter = data/500;
//     todayMeter = todayMeter.toFixed(3);
//     document.getElementById("meter2").setAttribute("value", todayMeter);

// });
// fetch('/../../../premium.txt')
// .then(response => response.text())
// .then(data => {
//     total = data;
//     document.getElementById("pre-total-num").textContent = total;
//     var todayMeter = data/300;
//     todayMeter = todayMeter.toFixed(3);
//     document.getElementById("meter3").setAttribute("value", todayMeter);

// });
}


function openMenu() {
    document.getElementById("form1").setAttribute("style", "display:none;");
    // document.getElementById("generated-today").setAttribute("style", "display:none;");
    // document.getElementById("total-generated").setAttribute("style", "display:none;");
    // document.getElementById("total-left").setAttribute("style", "display:none;");
    document.getElementById("menu").setAttribute("style", "width: 90vw; transition-duration: 0.4s;");
    document.getElementById("btn1").setAttribute("onclick", "closeMenu()");
    document.getElementById("btn2").setAttribute("onclick", "closeMenu()");
    document.getElementById("btn3").setAttribute("onclick", "closeMenu()");
    setTimeout(() => {
        document.getElementById("ul2").setAttribute("style", "display:block;");
    }, 300);
}

function closeMenu() {
    setTimeout(() => {
        document.getElementById("ul2").setAttribute("style", "display:none;");
    }, 50);
    document.getElementById("menu").setAttribute("style", "width: 0vw; transition-duration: 0.4s;");
    document.getElementById("btn1").setAttribute("onclick", "openMenu()");
    document.getElementById("btn2").setAttribute("onclick", "openMenu()");
    document.getElementById("btn3").setAttribute("onclick", "openMenu()");
    setTimeout(() => {
        document.getElementById("form1").setAttribute("style", "display:all;");
    // document.getElementById("generated-today").setAttribute("style", "display:all;");
    // document.getElementById("total-generated").setAttribute("style", "display:all;");
    // document.getElementById("total-left").setAttribute("style", "display:all;");
    }, 300);

}
function copy(value) {
    navigator.clipboard.writeText(value);
}