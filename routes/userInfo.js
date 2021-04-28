var express = require('express');
var router = express.Router();


var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ChatHub:TripNavigation@cluster0.msosy.mongodb.net/ChatHub?retryWrites=true&w=majority";

/* GET users listing.*/
router.get('/:nick', function (req, res){
    nick = req.params.nick;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ChatHub");
        dbo.collection('Users').find({"nickname":nick}).toArray(function(err, results) {
        if (err) throw err;
        var myOBJ = {"nickname":results[0].nickname, "lastAccess":results[0].lastAccess, "image":results[0].image, "activeChats":results[0].chats, "contacts":results[0].contacts}
        res.send(myOBJ);
        db.close();
        });
    });
});

module.exports = router;
