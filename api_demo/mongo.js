const express = require('express'); 
const app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(express.json());

app.get("/api/courses", function(req,res){
  
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("std");
  dbo.collection("std-data").find().toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
    db.close();
  });
});
});

app.post("/api/courses", function(req,res){

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("std");
  const course={
     regno : req.body.regno,
     sname : req.body.sname,
     course : req.body.course,
     dob : req.body.dob
    };
    res.send(course);
  dbo.collection("std-data").insertOne(course, function(err, res) {
    if (err) throw err;
    
    db.close();
  }); 
});
});

app.listen(3000, () => console.log("listening at 3000...."));
