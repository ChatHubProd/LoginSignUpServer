var express = require('express');
var router = express.Router();


var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ChatHub:TripNavigation@cluster0.msosy.mongodb.net/ChatHub?retryWrites=true&w=majority";

/* GET users listing.*/
router.get('/:nick/:pass/:quest/:answr', function (req, res){
    nick = req.params.nick;
    pass = req.params.pass;
    quest = req.params.quest;
    answr = req.params.answr;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ChatHub");
        dbo.collection("Users").find({"nickname":nick}).toArray(function(err, results) {
            if (err) throw err;
            this.result = results;
          if (result.length === 0)
          {
            var myobj = { "nickname": nick , "password":pass , "question":quest , "answer":answr};
            dbo.collection("users").insertOne(myobj, function(err, res) {
            if (err) throw err;
            this.result = results;
            result = "user added";
            });
            var reg = {"SingUped" : true, "nickname":nick}
            result = reg;
            res.send(result);
          }else
          {
            var reg = {"SingUped" : false}
            result = reg;
            res.send(result);
          }
        db.close();
        });
    });
});

module.exports = router;
