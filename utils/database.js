var admin = require("firebase-admin");

var serviceAccount = require("../config/credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hanging-4391a.firebaseio.com"
});

var db = admin.database();
var ref = db.ref();

function write(data, path){
  if (!data || !path){
    console.log("Missing data or path")
    return false
  }
  var pathRef = ref.child(path);
  pathRef.set(data, function(err){
    if (err){
      console.log(err)
    } else{
      console.log("write data successful")
    }
  })
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

write("testing-3", "users/test")
read("users", "test")
testWrite()
//write({alvin: "alvin wong"}, "users")

module.exports = {
  write
}