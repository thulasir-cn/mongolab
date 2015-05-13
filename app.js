var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'public/login'));
app.set('views',__dirname+"/public");

//mongodb............

var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 

var mongodbUri = 'mongodb://thulasi:thulasi@ds045001.mongolab.com:45001/thulasi';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));


app.get('/hello',function(req,res){
  res.send('this is welcome to heroku');
});

app.get('/login',function(req,res){
  res.sendfile('public/views/login.html')
});
app.post('/login',function(req,res){
	console.log(req.files);
});


db.once('open',function(){

			var student_detailsSchema = mongoose.Schema({
		    name : String,
		    city:String,
		    phnumber:String,
		    collage_name:String
		  });

			var Student = mongoose.model('Student', student_detailsSchema);

		// 	var student = new Student({
  //   name : "kumar",
  //   city:"banglore",
  //   phnumber:"",
  //   collage_name:"LPU"
  // });

// student.save(function(err,user){
// 	if (err) throw err;
// 	if (user) { console.log(user);};
// });

app.get('/stdents',function(req,res){

	Student.find({"name":"tharun"},function(err,user){
		if (err) throw err;
		if (user) {
			res.send(user);
		};
	});

		});
});




  
  





module.exports = app;
