require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);


var createLine = "-------------------------------------------------------------"

function askLiri(action, value) {
switch (action) {
    case "concert-this":
        findBands(value);
        break;

    case "spotify-this-song":
        findSpotify(value);
        break;

    case "movie-this":
        findOmdb(value);
        break;

    case "do-what-it-says":
        findTextFile(value);
        break;

    default:
    console.log("USAGE: node liri.js <command> <input>\n")
    console.log("Commands are:\n concert-this --Seach for concerts by bandname\n spotify-this-song --Display information about song title\n movie-this -- return information regarding specified movie title\n do-what-it-says -- run commands from the specified text file\n Example: node liri.js spotify-this-song Africa\n\n Remember! Put quotes around input if its more than one word!")
        break;
}
fs.writeFile("log.txt", action + "," + value, function(err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  
    // Otherwise, it will print: "logs.txt was updated!"
    console.log("log.txt is updated!");
  
  });
}

askLiri(process.argv[2], process.argv[3])

function findBands(band) {
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            var objectBody = JSON.parse(body);
            for (i = 0; i < objectBody.length; i++) {
                console.log(createLine);
                console.log("Venue: " + objectBody[i].venue.name);
                console.log("City: " + objectBody[i].venue.city + ", " + objectBody[i].venue.country);
                console.log(moment(objectBody[i].datetime).format("MM/DD/YY"));
            }
        } else {
            console.log(error);
        }
    });
}

function findSpotify(song) {
    if (song == undefined) {
        song = "All the small things"
        findSpotify(song);
    } else {
    spotify.search({ type: 'track', query: song })
  .then(function(response) {
    var songInfo = ""
    songInfo += createLine + "\n"; 
    songInfo += "Song: " + response.tracks.items[0].name + "\n";
    songInfo += "Artist: " + response.tracks.items[0].artists.map(artist => artist.name).join(", ") + "\n";
    songInfo += "URL: " + response.tracks.items[0].album.external_urls.spotify + "\n";
    songInfo += "Album: " + response.tracks.items[0].album.name;
    console.log(songInfo)
  })
  .catch(function(err) {
    console.log(err);
    
  });
}
}

function findOmdb(movie) {
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200 && movie != undefined) {
    
    console.log(createLine);

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year Released: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot Summary: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  } else {
      movie = "Footloose"
    findOmdb(movie);
}
});
}

function findTextFile(fileName) {
    fs.readFile(fileName, "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // It will then re-display the content as an array for later use.
        console.log(dataArr);

        askLiri(dataArr[0], dataArr[1]);        

      });
}