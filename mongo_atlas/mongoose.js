const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

var url = "mongodb://localhost:27017/";

mongoose.connect('mongodb://std-data:std-data@cluster0-shard-00-00-nsdra.mongodb.net:27017,cluster0-shard-00-01-nsdra.mongodb.net:27017,cluster0-shard-00-02-nsdra.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
);

app.use(express.json());
const courses=mongoose.Schema({
   regno : Number,
   sname : String,
   course : String,
   dob : Date
 });

const std=mongoose.model('std-data',courses);

app.get("/api/courses", function(req,res){

std.find()
.exec()
.then(result => {
  console.log(result);
  res.status(200).json({
  results: result
  });
})
.catch(err => {console.log(err)
 res.status(500).json({
    error : err
 })
});
});


app.get("/api/courses/:id", function(req,res){
const id=req.params.id;
std.findById(id)
.exec()
.then(result => {
  console.log(result);
  res.status(200).json({
  results: result
  });
})
.catch(err => {console.log(err)
 res.status(500).json({
    error : err
 })
});
});


app.post("/api/courses", function(req,res){

  const course=new std({
     regno : req.body.regno,
     sname : req.body.sname,
     course : req.body.course,
     dob : req.body.dob
   });
    course.save().then(result => {
      console.log(result);
      res.status(200).json({
      results: result
      });
    })
    .catch(err => {console.log(err)
     res.status(500).json({
        error : err
     })
   });
});

app.listen(3000, () => console.log("listening at 3000...."));
