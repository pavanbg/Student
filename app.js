var http = require('http');
var fs = require('fs');
var express=require('express');
var app=express();
var querystring = require('querystring');
var mongo = require('mongodb').MongoClient;

var url="mongodb://localhost:27017";

app.get('/',function(req,res){
   res.sendFile(__dirname+"/student.html");
});
   
app.post('/',(req, res)=> {
    var data="";
    req.on("data",function(chunk){
       
         data+=chunk;
    });
    
    req.on("end",function(chunk){
        var q=querystring.parse(data);
        
        mongo.connect(url, function(err, db){
           if(err) throw err
           var dbo = db.db("std"); // select database
           dbo.collection("std-data").insertOne(q, function(err, res){
              console.log("1 data is inserted");
              //res.redirect('back');
              db.close();
           });
        }); 
    });
});

app.get('/insert',(req,res) =>{
  mongo.connect(url, function(err, db) {
  var output="";
  if (err) throw err;
  var dbo = db.db("std");
  dbo.collection("std-data").find().toArray(function(err, result) {
    if (err) throw err;
    for (var key in result) {
       if (result.hasOwnProperty(key)) {
          output+="<b>Reg No: </b>"+ result[key].regno +",   <b>Student Name: </b>"+ result[key].sname + ",   <b>Course: </b>" +result[key].course + ",   <b>Date of Birth: </b>"+ result[key].dob+"<br><br>";
       }
    }
    res.send(output);
    db.close();
  });
});
});

app.listen(3000);
