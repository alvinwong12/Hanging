var admin = require("firebase-admin");
var GeoFire = require("geofire")

var serviceAccount = require("../config/credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hanging-4391a.firebaseio.com"
});

var db = admin.database();
var ref = db.ref();

var geoFire = new GeoFire(ref.child("users"))
var nearBy = []

function writeLocation(data, path){
  geoFire.set(data.id, [data.location.latitude, data.location.longitude]).then(function() {
  console.log("Provided key has been added to GeoFire");
}, function(error) {
  console.log("Error: " + error);
});

}




function write(data, path, res=null){
  writeLocation(data, "users")
  if (!data || !path){
    console.log("Missing data or path")
    return false
  }
  var pathRef = ref.child(path + "/" + data.id + "/info");
  pathRef.set(data, function(err){
    if (err){
      console.log(err)
    } else{
      console.log("write data successful")
      if (res) res.status(200).send("good");
    }
  })
  //writeLocation(data, "users")
};

function read(path, key){
  if (!path || !key) return;
  var pathRef = ref.child(path)
  pathRef.once("value", function(snap) {
    console.log(snap.child(key).val());
  });
}



function testWrite(data, path="test"){
  testData = {
    testAgent: "testing-1"
  }
  data = data || (data=testData)
  write(data, path)
}

function findNearBy(location=null, radius=null, res=null){
  if ((!location || !radius) && res) res.send("BAD");
  if ((!location || !radius) && !res) return;
  var geoQuery = geoFire.query({
  center: location,
  radius: radius
});
geoQuery.on("key_entered", function(id, location, distance) {
  console.log(id + " entered query at " + location + " (" + distance + " km from center)");
  nearBy.push({
    id: id,
    location: location,
    distance: distance
  })
});
geoQuery.on("ready", function(){
  if (res) res.send(nearBy)
})
}

function getNearBy(){
  return nearBy
}

// write("testing-3", "users/test")
// read("users", "test")
// testWrite()


//write({alvin: "alvin wong"}, "users")




data = { "id": "RandomId",
  "username": "MyUserName",
  "location": { "latitude": 37.785834, "longitude": -122.406417 },
  "status" : "Hey there! I am hanging" 
}


//write(data, "users")
//writeLocation(data, "users")

testData = { "id": "testAgent-1",
  "username": "testAgent-1",
  "location": { "latitude": 38, "longitude": -125 },
  "status" : "Hey there! I am hanging" 
}

//write(testData, "users")
//writeLocation(testData, "users")

//writeLocation(data, "")
//writeLocation(testData, "")
//write(data, "users")
//write(testData, "users")


//findNearBy()

module.exports = {
  write, 
  findNearBy 

}