//Load necessary keys from keys.js file and all npm packagess
var env = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

//Gets keys and stores from the keys.js file
//var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Create 2 variables to take in two arguments:
// First will be the input of action (i.e. "tweet", "spotify", movie)
// Second will be the paramater (twitterhandle, song name, movie name)
var input = process.argv[2];
//var parameter = process.argv[3];
var nodeArgs = process.argv;

// Create an empty variable for holding the song or movie name
var songTitle = "";
var movieName = "";

// Loop through all the words in the node argument
// And perform for-loop to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
    songTitle = songTitle + "+" + nodeArgs[i];
  }
  else {
    songTitle += nodeArgs[i];
    movieName += nodeArgs[i];
  }
}

//switch-case statement to see which function should run.
switch (input){
	case "my-tweets":
		tweet();
		break;

	case "spotify-this-song":
		spotifySong();
		break;

	case "movie-this":
		movie();
		break;

	case "do-what-it-says":
		runCommand();
		break;

	default:
		text = "please provide input";
}

//if the tweet function is called from the switch statement
function tweet() {
	//What screen name do you want it to search through
	var tweetparam = {screen_name: 'sdmcelfresh27', count: 20};
	client.get('statuses/user_timeline', tweetparam, function(error, tweets, response) {
	  	if (!error) {
	  	//for loop to run through and print only the tweet and time created at
	  		for (var i = 0; i < tweets.length; i++) {
	  			console.log('');
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                console.log(' Tweet: ' + tweets[i].text);
                console.log(" Tweet Number: " + (i + 1));
                console.log(' Created: ' + tweets[i].created_at);
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
	  		}
	  	}  
	});
}

//if the spotify function is called from the switch statement
function spotifySong() {
		//Assign song "The Sigh" if nothing is entered
		if (songTitle === "") {
		 	songTitle = "The Sign";
	    }
	spotify.search({ type: 'track', query: songTitle }, function(err, data) {
	    if (err) {
	        return ('Error occurred: ' + err);
	 	if (!err) {
	 		//console.log(data);
	 		var songInfo = JSON.parse(body);
		 	console.log(data.tracks.artists[0].name);
		 	console.log(data.tracks.items[0].name);
		 	console.log(data.tracks.items[0].preview_url);
		 	console.log(data.tracks.items[0].album.name); 
	 	}
	};

//if the movie function is called in the switch statement
//var movie = (parameter);
function movie() {
	if (movieNamee === "") {
	 	movieNamee = "Mr+Nobody";
	} else {
	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieNamee + "&y=&plot=full&tomatoes=true&r=json&apikey=trilogy";
	//Assign "Mr.Nobody" movie if nothing is entered
		console.log("movie entered");
	}
	request(queryUrl, function(error, response, body) {
		// If the request is successful
		if (!error && response.statusCode === 200) {
			// Parse the body of the site and recover just the imdbRating
			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoUserRating);
			console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
			}
		});
}

//if the function runCommand is called
function runCommand() {

	// This block of code will read from the "random.txt" file.
	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {
		//split it by commas (to make it more readable)
		var dataArr = data.split(",");
		//console.log(dataArr);

		var randomCommand = dataArr[0];
		parameter = dataArr[1];
		
		switch (randomCommand){
			case "my-tweets":
				tweet();
				break;

			case "spotify-this-song":
				spotifySong();
				break;

			case "movie-this":
				movie();
				break;

			case "do-what-it-says":
				runCommand();
				break;
		}
	});
}

function logged() {
    input = "Log Input: " + input + "\n";
    // appends data to the log file after each run
    fs.appendFile("log.txt", input, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(" updated log file! ");
        }
    });
}
	});
}