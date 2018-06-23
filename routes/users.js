var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/journal');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  firstName: String,
  lastName: String,
  emailID: String
});

var Users = mongoose.model('Users',usersSchema);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUsers',function(req,res,next){
  Users.find({}, function(err, users) {
    var userMap = [];

    users.forEach(function(user) {
      userMap.push(user);
    });

    res.send(userMap);  
  });
});

router.post("/createUser",(req,res) =>{

  var reqUsers = req.body;
  console.log(req.body);
  reqUsers.forEach(function(user){
    new Users(user).save()
    .then(item => {
      res.send("User info is save !");
    })
    .catch(err => {
      res.status(400).send("Undable to save !");
    });
  });  
});


module.exports = router;
