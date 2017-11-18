// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/whoami",function(req,res) {
  //get the IP's from the header
  var ip = req.headers["x-forwarded-for"]
  //split it into an array and send the first IP
  ip = ip.split(",");
  ip = ip[0]
  var language = req.headers["accept-language"]
  language = language.split(",")[0]
  var OS = req.headers["user-agent"]
  OS = OS.split("\(");
  OS = OS[1].split("\)");
  OS = OS[0]
  var response_object = {
    "ip" : ip,
    "language": language,
    "OS" : OS
  }
  res.send(response_object)
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
