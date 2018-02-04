var express = require('express')
var app = express();
var database = require('./utils/database')

PORT = 3000

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

app.listen(3000, function(){
	console.log("listening")
})