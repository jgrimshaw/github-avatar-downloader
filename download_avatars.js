

var owner = process.argv [2];
var repo = process.argv [3];

var request = require("request");
var token = require("./secrets.js");
var fs = require("fs")

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath){
 request.get(url)
  .on("error", function (err) {
         throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, repo, function(err, result) {
  if (!owner || !repo){
    console.log('Please enter valid arguments')
    // console.log("Errors:", err);
  } else {
var parseResults = JSON.parse(result);

parseResults.forEach(function(elm){
  var login = elm.login;
  var avatar_url = elm.avatar_url;

  downloadImageByURL(avatar_url, `avatars/${login}.jpg`);
  })
  }
});

