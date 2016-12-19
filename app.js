const express = require('express');
const path = require('path');
const http = require('http');
const logger = require('morgan');

const app = express();

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use(logger("short"));

app.get("/", function(req, res) {
	res.end("Welcome to my Homepage!");
});


app.get("/about", function(req, res) {
	res.end("Welcome to the about page!");
});

app.get("/weather", function(req, res) {
	res.end("The current weather is NICE!");
});

app.get("/hello/:who", function(req, res) {
  res.end("Hello, " + req.params.who + ".");
  res.redirect("/hello/world");
  res.redirect("http://expressjs.com");
});


app.use(function(req, res) {
	res.statusCode = 404;
	res.end("404!");
});


app.use((req, res) => {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("Looks like you didn't find a static file.");
});

http.createServer(app).listen(3000);

