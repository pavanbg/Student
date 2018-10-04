var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var mongo = require('mongodb').MongoClient;

var url="mongodb://localhost:27017/";
 
http.createServer(function(req, res){
  
  if(req.url === "/student") 
  {
    res.writeHead(200,{ "Content-Type" : "text/html" });
    fs.createReadStream("./public/student.html","UTF-8").pipe(res);
  }
   
  if( req.method== "POST" )
  {
    var data="";
    req.on("data",function(chunk){
       
         data+=chunk;
    });
    
    req.on("end",function(chunk){
        var q=querystring.parse(data);
        
        mongo.connect(url, function(err, db){
           if(err) throw err
           var dbo = db.db("std");
           dbo.collection("std-data").insertOne(q, function(err, res){
              console.log("1 data is inserted");
              db.close();
           });
        }); 
    });
  }
}).listen(3000);
