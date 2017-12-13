const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
	//return 'test'
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase()
});

app.set('view engine', 'hbs');


app.use((req, res, next)=> {
	var now = new Date().toString();
	var log = `${now} : ${req.method} : ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append file.');
		}
	})
	next();
});

app.use((req, res, next)=> {
	// res.render('maintanance.hbs');
	next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	//res.send(`<h4>Hello ExpressJS World</h4>`);
	/**res.send({
		name: 'Sanjoy Ganguly',
		hobies: ['Painting', 'Cooking', 'Learning', 'Laugh'],
		age: 32,
		height: 163,
		weight: 80
	});**/
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		heading: 'Welcome To HBS',
		message: 'Welcome to my Web Site',
	});
});

app.get('/about', (req, res) => {
	//res.send('<h3>About Us page !@</h3>')
	res.render('about.hbs', {
		pageTitle: 'About Page Title',
		heading: 'Welcome To HBS',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to process this request'
	});
});

app.listen(3000, () => {
	console.log('node-web-server app listening on port 3000 !');
});
