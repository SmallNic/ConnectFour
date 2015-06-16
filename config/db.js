var mongoose = require('mongoose');
// var uriUtil = require('mongodb-uri');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
               replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

 var mongodbUri = "mongodb://heroku_72m50ng8:n8k6pirojqr2adajhl6ij9kgu9@ds045632.mongolab.com:45632/heroku_72m50ng8"
 // var mongooseUri = uriUtil.formatMongoose(mongodbUri);

 // mongoose.connect('mongodb://localhost/connect_four');
 mongoose.connect(mongodbUri, options);


module.exports = mongoose
