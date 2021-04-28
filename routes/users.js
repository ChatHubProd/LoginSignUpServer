var express = require('express');
var router = express.Router();


var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ChatHub:TripNavigation@cluster0.msosy.mongodb.net/ChatHub?retryWrites=true&w=majority";

router.get('/:nick/:pass', function (req, res){
    nick = req.params.nick;
    pass = req.params.pass;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ChatHub");
        dbo.collection('Users').find({$and:[{"nickname":nick},{"password":pass}]}).toArray(function(err, results) {
        if (err) throw err;
        this.result = results;
        if(results.length == 1)
        {
            var log = {"logedin" : true, "nickname":results[0].nickname}
            result = log;
            res.send(result);
        }else
        {
            var log = {"logedin" : false}
            result = log;
            res.send(result);
        }
        db.close();
        });
    });
});

module.exports = router;
