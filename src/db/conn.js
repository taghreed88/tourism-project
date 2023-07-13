const mongoose = require("mongoose");

// 
// mongoose.connect(
    // "mongodb://localhost:27017",
    // {
    //   dbName: "yourDB-name",
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // },
    // (err) =>
    //   err ? console.log(err) : console.log(
        // "Connected to yourDB-name database")
//   );
// 
//   console.log("App listen at port 5000");
// 

mongoose.connect("mongodb://localhost:27017/myCollection", {
    // The problem of connection happend because in mongoose version 6 and above don't require those :
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => {
    console.log('connection successful');
}).catch((e)=>{
    console.log(e);
})



// 
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// 
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("27017");
//   dbo.createCollection("customers", function(err, res) {
    // if (err) throw err;
    // console.log("Collection created!");
    // db.close();
//   });
// });