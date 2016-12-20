const path = require('path');
const express = require('express');
const zipdb = require('zippity-do-dah');
const ForecastIo = require('forecastio');

const app = express();
const weather = new ForecastIo('f0dcc64bc6c3a603e970f03f4fd28f5c');

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
	let zipcode = req.params[0]; //I accidentally wrote 'param[0]' where it was params[0]
	let location = zipdb.zipcode(zipcode);
	if (!location.zipcode) {
		next();
		return;
	}

	let latitude = location.latitude;
	let longitude = location.longitude;

	weather.forecast(latitude, longitude, function(err, data) {
		if (err) {
			next();
			return;
		}

		res.json({
			zipcode: zipcode,
			temperature: data.currently.temperature
		});

	});
});

app.use((req, res) => {
	res.status(404).render('404');
});


app.listen(3000, () => {
	console.log('App started on port 3000');
});
