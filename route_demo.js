var express = require('express'); 
const app = express();
var adminRouter = require('./routes/admin');

app.use(express.json());

app.use("/admin",adminRouter);

app.get("/", function(req,res){
  res.send("Hello World");
});


app.listen('3000');
