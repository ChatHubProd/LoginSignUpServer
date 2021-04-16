var express = require('express');
var router = express.Router();


var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://TripNav:tripnavigation@Primo.jweu5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

/* GET users listing. */
router.get('/:nick/:pass', function (req, res){
    nick = req.params.nick;
    pass = req.params.pass;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("TripNav");
        dbo.collection("users").find({"nickname":nick}).toArray(function(err, results) {
            if (err) throw err;
            this.result = results;
          if (result.length === 0)
          {
            var myobj = { "nickname": nick , "password":pass };
            dbo.collection("users").insertOne(myobj, function(err, res) {
            if (err) throw err;
            this.result = results;
            result = "user added";
            });
            var reg = {"SingUped" : false}
            result = reg;
            res.send(result);
          }else
          {
            var reg = {"SingUped" : true}
            result = reg;
            res.send(result);
          }
        db.close();
        });
    });
});

module.exports = router;
