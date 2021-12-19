var socket = io();
console.warn("hi");
socket.on('mailSend', (id) => {
    console.log("yep!");
    fetch('uId.txt')
    .then(response => response.text())
    .then(data => {
        if(data==id) {
            console.log("Yes This is for  this user");
        }
        else {
            console.log("not found");
        }
    })
})