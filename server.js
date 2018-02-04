var express = require('express')
var app = express();
var database = require('./utils/database')
var bodyParser = require('body-parser');

PORT = 8000 || process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
	data = { "id": "RandomId",
  "username": "MyUserName",
  "location": { "latitude": 37.785834, "longitude": -122.406417 },
  "status" : "Hey there! I am hanging"
}
	database.write(data, "users", res)
})

app.get('/nearby', function(req,res){
	data = { "id": "RandomId",
  "username": "MyUserName",
  "location": { "latitude": 37.785834, "longitude": -122.406417 },
  "status" : "Hey there! I am hanging" 
	}
	database.findNearBy([data.location.latitude, data.location.longitude], 10000, res)
})

app.post("/rest/submit", function (req, res) {
    var user = req.body;
    data = { "id": user.id,
        "username": user.id,
        "location": { "latitude": user.id.location.latitude, "longitude": user.id.location.longitude },
        "status" : user.id.status
    }
    console.log(user)
    database.write(data, "users", res)
    // res.send("Hello from service")
});

app.listen(PORT, function(){
	console.log("listening")
})

