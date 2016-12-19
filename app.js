const http = require('http');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs')

const entries = [
	{
		title: "Another blog post",
		body: "hey yo!",
		published: new Date()
	},
	{
		title: "Yet another blog post",
		body: "hey yo again!",
		published: new Date()
	}
];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/new-entry', function(req, res) {
	res.render('new-entry');
});

app.post('/new-entry', function(req, res) {
	if (!req.body.title || !req.body.body) {
		res.status(400).send("Entries must have a title and a body");
		return;
	}
	entries.push({
		title: req.body.title,
		body: req.body.body,
		published: new Date()
	});
	res.redirect('/');
});

app.use((req, res) => {
	res.status(404).render('404');
});



http.createServer(app).listen(3000);
