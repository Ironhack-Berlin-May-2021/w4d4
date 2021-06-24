const express = require('express');
const app = express();


app.use(express.static('public'));

// this is needed to be able to use partials
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// importing the movies from the json file
const movies = require('./movies.json');
// console.log(movies);

app.get('/', (req, res) => {
	res.render('movies', { moviesList: movies, doctitle: 'all the movies' });
});

app.get('/godfather', (req, res) => {
	// pass layout: false to the object to not use the base layout
	// find the movie godfather in the array
	const godfather = movies.find(movie => movie.title === 'The Godfather');
	console.log(godfather);
	res.render('moviedetail', { clickedMovie: godfather, doctitle: 'movie details' });
})

app.listen(3000, () => {
	console.log('Server listening');
})