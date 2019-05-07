var request = require('request');
var token = require('./secrets.js');
var fs = require("fs");

// console.log('Welcome to the GitHub Avatar Downloader!')


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  }
  request(options, function(err, res, body) {
    cb(err, body)
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {

  var parseResult = JSON.parse(result);

  parseResult.forEach(function(elm){
    console.log(elm.avatar_url)
  })
  // console.log("Errors:", err);
  // console.log("Result:", parseResult);

});

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);

// });