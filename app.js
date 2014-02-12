
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var app = express();
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');
mongoose.connect('mongodb://localhost/preferences');
// all environments
app.configure(function(){
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); 
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.json());
});

var PreferenceSchema = new Schema({
	type: String,
	url: String,
	description: String,
	date: Date
});

var PreferenceModel=mongoose.model('Preference', PreferenceSchema);
module.exports=mongoose.model('Preference', PreferenceSchema);


//api
app.get('/gallery', function(req,res){
	PreferenceModel.find(function(err, preferences){
		if(err)
			res.send(err);
		else
			res.json(preferences);
	});
});

app.post('/second',function(req,res){
	PreferenceModel.create({
		type:req.body.type,
		url:req.body.url,
		description: req.body.description,
		date: new Date(),
		done:false
	}, function(err, preference){
		if(err)
			res.send(err);
		res.send(preference);
	});
});

app.delete('/gallery/:preference_id', function(req,res){
	PreferenceModel.remove({
		_id: req.params.preference_id
	}, function(err, preference){
		if(err)
			res.send(err);
		PreferenceModel.find(function(err,data){
			if(err)
				res.send(err);
			else
				res.json(data);
		});
	});
});

app.get('/', function(req,res){
	res.sendfile('./public/index.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
