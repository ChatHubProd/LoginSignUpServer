var express = require('express');
var router = express.Router();


var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ChatHub:tripnavigation@cluster0.msosy.mongodb.net/ChatHub?retryWrites=true&w=majority";

/* GET users listing.*/
router.get('/:nick', function (req, res){
    nick = req.params.nick;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ChatHub");
        dbo.collection('Users').find({"nickname":nick}).toArray(function(err, results) {
        if (err) throw err;
        res.send(results[0].contacts);
        db.close();
        });
    });
});

module.exports = router;
