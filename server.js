// Importing Modules

const express = require("express");
const app = express();
const fs = require("fs");
const nodeMail = require("nodemailer")
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const os = require("os");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.port || 80;
const mongoose = require("mongoose");
const { Transport } = require("engine.io");
const { StringDecoder } = require("string_decoder");
mongoose.connect('mongodb+srv://Test1:shaguftanaz@cluster0.wolku.mongodb.net/Test1?retryWrites=true&w=majority', {useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "error"));
db.once('open', ()=> {
    console.log("Database Is Connected");
});

var bugStruc = new mongoose.Schema({
    problem:String,
    desc:String
});

var bug = mongoose.model("Bugs", bugStruc);

var registerStruc = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    veri : String
});
var register = mongoose.model("Register", registerStruc);

// Importing alts.json File

var altsArray = [
    {
        "alt" : "educationalmirchi@gmail.com",
        "password": "shaguftanaz"
        },
        {
            "alt" :"perobrine786@gmail.com",
            "password":"shaguftanaz"
        },
        
        {
            "alt" :"a@gmail.com",
            "password":"shaguftanaz"
        },
        {
            "alt" :"b@gmail.com",
            "password":"shaguftanaz"
        },
        {
            "alt" :"c@gmail.com",
            "password":"shaguftanaz"
        },
        {
            "alt" :"d@gmail.com",
            "password":"shaguftanaz"
        },
        {
            "alt" :"e@gmail.com",
            "password":"shaguftanaz"
        },
        {
            "alt" :"f@gmail.com",
            "password":"shaguftanaz"
        },
        {
            "alt" :"g@gmail.com",
            "password":"shaguftanaz"
        },
        {
            "alt" :"h@gmail.com",
            "password":"shaguftanaz"
        },
        {
            "alt" :"i@gmail.com",
            "password":"shaguftanaz"
        }
]

// Preparing things for email sending


var mailSender  = nodeMail.createTransport({
    host : "smtp.gmail.com",
    port :587,
    secure : false,  // Depending on http or https
    requireTLS : true,
    auth : {
        user : "educationalmirchi@gmail.com",
        pass : "Shaguftanaz@123"
    }
});
function sendMailbroo(toWhom, sub, text) {

}
var aa = 0;
// Handling Socket.io Requests

io.on('connection', (socket) => {
    var b = [socket.id];
    var c = ""+b;
    console.log("A User Connected With ID = "+b);
});

// Listening Server

http.listen(port, () => {
    console.log("Yeh Dude Server Is on At http://127.0.0.1:"+port);
});

// Handling All Requests

app.use(express.urlencoded( {extended:true} ));
app.use(express.static('public'));
app.get("/", (req ,res) => {
    res.sendFile(__dirname+"/index.html");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname+"/public/signup.html");
});
var req1;
var ran1;
app.post("/signup", (req, res) => {
    var Useremail = req.body.email;
    req1 = req.body;
    var a = res;
    register.find( {email : Useremail}, (err, user) =>{
        if(user=="") {
            var aaaa = new Array();
            aaaa = {
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                veri : "no"
            }
            var req1 = aaaa;
            console.log(aaaa);
    var data = new register(aaaa);
    data.save();
    var ran = Math.random()*9000 + 1000;
    ran = ran.toFixed(0);
    // var a = sendMailbroo(req.body.email, "O.T.P Verification For Alts", ran);
    ran1 = ran;
    var mailOp = {
        from : "educationalmirchi@gmail.com",
        to : req.body.email,
        subject : "O.T.P Verification For Alts",
        text:ran
    }
    mailSender.sendMail(mailOp, (err, inf) => {
           if(err) {
            console.log("nah", err);
           }
           else {
               res.redirect("http://127.0.0.1/verifyEmail");
            
           }
    });
        }
        else{
            res.end(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <link rel="stylesheet" href="CSS/signup.css">
                <script src="JS/signup.js"></script>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <img src="IMG/signup.jpg" id="container1">
                    <form action="" id="form-div" method="post">
                        <span id="form-head">Sign-Up Now</span>
                        <input id="input1" name="name" type="text" placeholder="Enter Name">
                        <input id="input2" name="email" type="email" placeholder="Enter Email">
                        <input id="input3" name="password" type="password" placeholder="Enter Password" minlength="6">
                        <button id="btn1" type="submit">Register</button>
                    </form>
                    <script>alert("User Already Exist With That Email!");</script>
            </body>
            </html>`);
        }
    });
});

app.get("/verifyEmail", (req, res) => {
    res.sendFile(__dirname+"/public/verify.html");
});

app.post("/verifyEmail", (req, res) => {
    var otp = req.body.otp;
    if(otp==ran1) {
        var que = {
            email : req1.email
        }
        var val = {
            $set : {
                name : req1.name,
                email : req1.email,
                password : req1.password,
                veri : "yes"
            }
        }
        register.updateOne(que, val, function(err, es){
            if(err) {
            }
            else {
                res.redirect("http://127.0.0.1/login");
            }
        })
        console.log("user matched!");
    }
    else {
        res.end(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <script src="JS/verify.js"></script>
                    <link rel="stylesheet" href="CSS/signup.css">
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title></title>
                </head>
                <body>
                    <img src="IMG/signup.jpg" id="container1">
                        <form action="" id="form-div" style="height:300px;" method="post">
                            <span id="form-head">Verify Email</span>
                            <input id="input1" name="otp" style="top:120px;height:50px;" type="number" placeholder="Enter OTP">
                            <button id="btn1" type="submit"style="top:210px;">Register</button>
                        </form>
                <script>alert("Wrong OTP!");</script>
                </body>
                </html>`);
    }
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname+"/public/login.html");
});
var name;
app.post("/login", (req, res) => {
    var a = req.body;
    register.find({ email : req.body.email, password : req.body.password, veri : "yes" }, (err, user) => {
        console.log(user.length);
        if(user.length==0) {
            res.end(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=<!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="/socket.io/socket.io.js"></script>
        <link rel="stylesheet" href="CSS/signup.css">
        <script src="JS/signup.js"></script>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <img src="IMG/signup.jpg" id="container1">
            <form action="" id="form-div" method="post" style="height:350px;">
                <span id="form-head">Login</span>
                <input id="input1" name="email" style="top:120px;" type="email" placeholder="Enter Email" required>
                <input id="input2" name="password" type="password" style="top:190px;" placeholder="Enter Password" required>
                <button id="btn1" type="submit" style="top:270px;">Login</button>
            </form>
        <img src="IMG/signup2.jpg" id="container2">
        <img src="IMG/signup3.jpg" id="container3">
        <img src="IMG/signupmobile.jpg" id="container4">
        <img src="IMG/signupmobile2.jpg" id="container5">
    <script>alert("Either Email Not Found Or Not Verified");</script>

</body>
</html>`);
        }
        else {
            var aa = user;
            console.log(aa);
            var b = aa[0];
            console.log("Name = "+c);
            var c = ""+b.name;
            var d = ""+req.body.email;
            fs.writeFileSync("name.txt", c);
            fs.writeFileSync("email.txt", d);
            res.redirect("http://127.0.0.1/dashboard/"+c);
        }
        
    })
    console.log("names = "+name);
});

app.get("/dashboard/"+fs.readFileSync("name.txt", "utf-8"), (req, res) =>{
    if(fs.readFileSync("name.txt", "utf-8")=="") {
        res.redirect("http://127.0.0.1/login");
    }
    else {

    res.sendFile(__dirname+"/public/dashboard.html");
    }
});

app.get("/name.txt", (req, res) => {
    res.sendFile(__dirname+"/name.txt");
});

app.get("/today.txt", (req, res) => {
    res.sendFile(__dirname+"/today.txt");
});

app.get("/total.txt", (req, res) => {
    var a = fs.readFileSync("alts.json", "utf-8");
    a = JSON.parse(a);
    var len = a.length;
    fs.writeFileSync("total.txt", ""+len);
    res.sendFile(__dirname+"/total.txt");
});

app.get("/premium.txt", (req, res) => {
    var a = fs.readFileSync("pre.json", "utf-8");
    a = JSON.parse(a);
    var len = a.length;
    fs.writeFileSync("premium.txt", ""+len);
    res.sendFile(__dirname+"/premium.txt");
});

app.get("/generator/"+fs.readFileSync("name.txt", "utf-8"), (req, res) => {
     res.sendFile(__dirname+"/public/generator.html");
});

app.post("/generator/"+fs.readFileSync("name.txt", "utf-8"), (req, res) => {
    var len = altsArray.length;
    var ran = Math.random() * (len-1);
    ran = ran.toFixed(0);
    var acc = new Array();
    acc = b[ran];
    res.end(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&amp;display=swap" rel="stylesheet">
    <script src="/socket.io/socket.io.js"></script>
    <script src="/../JS/generator.js"></script>
    <link rel="stylesheet" href="/../CSS/dashboard.css">
    <link rel="stylesheet" href="/../CSS/generator.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title"></title>
</head>
<body onload="loadBody()">
    <div id="head">
        <img src="" alt="logo" class="head-img">
    </div>
    <div id="menu">
        <ul id="ul2">
            <li id="li1">Dashboard</li>
            <li id="li2">Generator</li>
            <li id="li3">Hack Clients</li>
            <li id="li4">Youtube</li>
            <li id="li5">Premium Alts</li>
        </ul>
    </div>
    <div id="header">
        <img src="" class="head-img2">
        <button id="btn1" onclick="openMenu()"></button>
        <button id="btn2" onclick="openMenu()"></button>
        <button id="btn3" onclick="openMenu()"></button>
        
        <ul id="ul1">
            <li id="li1"><a href="">Dashboard</a></li>
            <li id="li2"><a href="/generator">Generator</a></li>
            <li id="li3"><a href="/clients">Hack Clients</a></li>
            <li id="li4"><a href="/youtube">Youtube</a></li>
            <li id="li5"><a href="/premium">Premium Alts</a></li>
        </ul>
    </div>
    <form id="form1" action="" method="get">
        <span id="head-form">Generate Your Minecraft<br>Account</span>
        <input id="input1" type="email" value = "${acc.alt}" disabled placeholder="Email">
        <input id="input2" type="text" value = "${acc.password}" disabled placeholder="Password">
        <button id="submit" type="submit">Reload Page</button>
    </form>
</body>
</html>`);
});

app.get("/bug/"+fs.readFileSync("name.txt", "utf-8"), (req, res) => {
    res.sendFile(__dirname+"/public/bugs.html");
})
app.get("/dashboard", (req, res) => {
    res.redirect("http://127.0.0.1/dashboard/"+fs.readFileSync("name.txt", "utf-8"));
});

app.get("/generator", (req, res) => {
    res.redirect("http://127.0.0.1/generator/"+fs.readFileSync("name.txt", "utf-8"));
});

app.get("/bug", (req, res) => {
    res.redirect("http://127.0.0.1/bug/"+fs.readFileSync("name.txt", "utf-8"));
});

app.get("/youtube", (req, res) => {
    res.redirect("https://www.youtube.com/");
});

app.get("/premium", (req, res) => {
    res.end(`
    <!DOCTYPE html>
<html>
<style>
body, html {
  height: 100%;
  margin: 0;
}

.bgimg {
  background-image: url('IMG/home2.jpg');
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 25px;
}

.topleft {
  position: absolute;
  top: 0;
  left: 16px;
}
#demo{
    font-size:23px;
    font-weight:bold;
}
.bottomleft {
  position: absolute;
  bottom: 0;
  left: 16px;
}

.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

hr {
  margin: auto;
  width: 40%;
}
</style>
<body>

<div class="bgimg">
  <div class="topleft">
    <p>Logo</p>
  </div>
  <div class="middle">
    <h1>COMING SOON</h1>
    <hr>
    <p id="demo"><big>35 days left</big></p>
  </div>
  <div class="bottomleft">
    <p>Some text</p>
  </div>
</div>
<script>
// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
</script>
</body>
</html>

    `);});

    app.get("/logout", (req, res) => {
        fs.writeFileSync("name.txt", "");
        res.redirect("http://127.0.0.1/login");
    });


    app.post("/bug/"+fs.readFileSync("name.txt", "utf-8"), (req, res) => {
        var a = new bug(req.body);
        a.save();
        
        res.end(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&amp;display=swap" rel="stylesheet">
    <script src="/socket.io/socket.io.js"></script>
    <script src="/../JS/bugs.js"></script>
    <link rel="stylesheet" href="/../CSS/generator.css">
    <link rel="stylesheet" href="/../CSS/dashboard.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title"></title>
    <style>
        input::placeholder {
            color:grey;
        }
    </style>
</head>
<body onload="loadBody()">
    <div id="head">
        <a href="/logout"><button id="logout">Logout</button></a>
        <img src="" alt="logo" class="head-img">
    </div>
    <div id="menu">
        <ul id="ul2">
            <a href="/dashboard"><li id="li1">Dashboard</li></a>
            <a href="/generator"><li id="li2">Generator</li></a>
            <a href="/bug"><li id="li3">Report Bugs</li></a>
            <a href="/youtube"><li id="li4">Youtube</li></a>
            <a href="/premium"><li id="li5">Premium Alts</li></a>
        </ul>
    </div>
    <div id="header">
        <img src="" class="head-img2">
        <button id="btn1" onclick="openMenu()"></button>
        <button id="btn2" onclick="openMenu()"></button>
        <button id="btn3" onclick="openMenu()"></button>
        
        <ul id="ul1">
            <a href="/dashboard"><li id="li1">Dashboard</li></a>
            <a href="/generator"><li id="li2">Generator</li></a>
            <a href="/bug"><li id="li3">Report Bugs</li></a>
            <a href="/youtube"><li id="li4">Youtube</li></a>
            <a href="/premium"><li id="li5">Premium Alts</li></a>
            
        </ul>
    </div>
    <form id="form1" action="" method="post">
        <span id="head-form">Report Your Problem</span>
        <input id="input1" type="text" name="problem" placeholder="Problem" style="top:100px;">
        <textarea id="input2" type="text" name="desc" style="color:black;top:190px;height:160px;padding:5px;" placeholder="Description..."></textarea>
        <button id="submit" type="submit">Generate</button>
    </form>
    <script>alert("Your Problem Has Been Submitted!");</script>
</body>
</html>`)
    })