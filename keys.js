js
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

js
  var keys = require("./keys.js");

  js
  var spotify = new Spotify(keys.spotify);