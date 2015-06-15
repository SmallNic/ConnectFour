// Insantiate Express
var express = require("express")
var app = express()
var server = require('http').createServer(app);

// Instantiate Handlebars
var hbs = require('hbs');
app.set("view engine", "hbs");

// Set up path for assets
app.use(express.static(__dirname + "/public"))

//Connect to database
var db = require("./config/db")
var Game = require("./models/game")( db )

Game.create({num:0, redScore:0, blueScore:0, lastWinner:null}, function (err, results) {
  if (err) return handleError(err);
})

//Open server
server.listen(process.env.PORT || 3000, function(){
  console.log("Connect Four server listening at http://localhost:3000/")
})

app.get("/", function(req, res){

  Game.findOne({}, function (err, game) {
    if (err) console.log(err);
    res.render("index", {game:game})
  })
})

app.get("/save", function(req, res){
  var gameCount = req.query.gameCount;
  var redScore = req.query.redScore;
  var blueScore = req.query.blueScore;
  var lastWinner = req.query.lastWinner;

  Game.update({ num:gameCount, redScore:redScore, blueScore:blueScore, lastWinner:lastWinner}, function (err, raw) {
    if (err) return handleError(err);
    // console.log('The raw response from Mongo was ', raw);
  });
  Game.save

  console.log("gameCount", gameCount)
  console.log("redScore", redScore)
  console.log("blueScore", blueScore)
  console.log("lastWinner", lastWinner)

 res.render("saved")
});
