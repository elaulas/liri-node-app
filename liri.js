require("dotenv").config();

//store dependencies as variables.
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


// Twitter Function
var myTweets = function() {

var client = new Twitter(keys.twitter);
var params = {screen_name: 'JoeCodeProject'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
	// console.log(tweets);
	for(i = 0; i < tweets.length; i++) {
		console.log(tweets[i].created_at);
		console.log(tweets[i].text);
		console.log('______________________________________________');
	}
  }
});
}

// Spotify function
 
var artistName = function(artist) {
	return artist.name;
}
 
var mySpotify = function(song) {
 
	if(song === undefined){
		song = 'The Sign';
	}else {
		song = "'" + song + "'";
	}
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
 
spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
  var songs = data.tracks.items;
  for(var i = 0; i < songs.length; i++) {
	  console.log('artist: ' + songs[i].artists.map(artistName));
	  console.log('song name: ' + songs[i].name);
	  console.log('preview song: ' + songs[i].preview_url);
	  console.log('album ' + songs[i].album.name);
	  console.log('---------------------------------------------');
  }
});

}

// OMDb function

var myMovie = function(movieName) {

	if(movieName === undefined){
		movieName = 'Mr. Nobody';
	}else {
		movieName = movieName;
	}


request("http://www.omdbapi.com/?t=" + "'" + movieName + "'" + "&apikey=" + keys.omdb.api_key, function (error, response, body) {

	var movieData = JSON.parse(body);

	console.log('Title: ' + movieData.Title);
	console.log('Year: ' + movieData.Year);
	console.log('IMDB Rating: ' + movieData.imdbRating);
	console.log('Rotten Tomatoes Rating: ' + movieData.Ratings[1].Value);
	console.log('Country: ' + movieData.Country);
	console.log('Language: ' + movieData.Language);
	console.log('Plot: ' + movieData.Plot);
	console.log('Actors: ' + movieData.Actors);
	console.log('-----------------------------------------------')
});
}


// Do What it says Function

var doWhatItSays = function() {

fs.readFile('random.txt', 'utf8', function (err, data) {
	if (err) throw err;

	var doArray = data.split(',');

	if (doArray.length == 2) {
		select(doArray[0], doArray[1]);
	}else if (doArray.length == 1) {
		select(doArray[0]);
	}
});
}


// switch statement


var select = function(caseData, functiondata) {
	switch(caseData) {
		case 'my-tweets' :
		myTweets();
		break;
		case 'spotify-this-song' :
		mySpotify(functiondata);
		break;
		case 'movie-this' :
		myMovie(functiondata);
		break;
		case 'do-what-it-says' :
		doWhatItSays();
		break;
		default:
		console.log('LIRI does not know that');
	}
}

var runApp = function(argOne, argTwo) {
	select(argOne, argTwo);
};

runApp(process.argv[2], process.argv[3]);
