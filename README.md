# LIRI-Bot

Requirements:
Make a Node.js app that depends on user input from the command line
Integrate Spotify, and OMDb APIs via the appropriate NPM modules
Use API calls and parse through returned JSON objects, outputting them in a specified format
Read commands and queries from file


Technologies Used:
Node.js
JavaScript
Spotify API 
OMDb API 


Code Explanation:
Authentication keys for Spotify are stored in "keys.js", and we are exporting its contents to the main "liri.js" file
The program also makes a request to the Spotify API, and we get back a JSON object that includes everything we need (artist(s), song, preview link, and album)
The program also makes a HTTP request to the OMDb API using the request NPM module, and we get back a JSON object that includes everything we need (title, year, IMDb rating, language, etc.)
The program also reads from a file called "random.text" and executes the command and query found there using string and array methods
Appropriate comments and error-checking has been added

https://docs.google.com/presentation/d/1XlzEFB_yX-SBQycDTiUkwx_ynVdU1Lh4oMH3nTxAcRs/edit?usp=sharing