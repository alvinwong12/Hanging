var app = require('./express');
var bodyParser = require('body-parser');

var multer = require('multer');
// var cookieParser = require('cookie-parser');
// var session      = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(session({ secret: "put some text here" })); // Store secret in environment variable
// app.use(passport.initialize());
// app.use(passport.session());

// configure a public directory to host static content
// app.use(app.express.static(__dirname + '/public'));


// app.get('/env', function(req, res) {
//     var connectionString = 'blah';
//     if(process.env.MLAB_WEBDEV_NEU_UNAME) { // check if running remotely
//         var username = process.env.MLAB_WEBDEV_NEU_UNAME; // get from environment
//         var password = process.env.MLAB_WEBDEV_NEU_PASS;
//         connectionString = 'mongodb://' + username + ':' + password;
//         connectionString += '@ds139761.mlab.com:39761/heroku_v7g71n9h'; // user yours
//     }

//     res.json({connectionString: connectionString});
// });

// require("./assignment/app");


app.post("/rest/register", function (req, res) {
    var user = req.body;
    console.log(user);
    res.json(user);
    // res.send("Hello from service")
});

app.get("/hi", function (req, res) {
    console.log("hi get");
    // res.send("Hello from service")
});

var port = process.env.PORT || 8000;

app.listen(port, function (req, res) {
    console.log("running");
    // res.send("Hello from service")
});