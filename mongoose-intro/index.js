const mongoose = require('mongoose');




// a more complex schema
// const bookSchema = mongoose.Schema({
// 	title: {
// 		type: String,
// 		required: true,
// 		unique: true
// 	},
// 	author: {
// 		type: String,
// 		maxLength: 50
// 	},
// 	pages: {
// 		type: Number,
// 		max: 5000
// 	},
// 	inStock: {
// 		type: Boolean,
// 		default: true
// 	},
// 	genre: {
// 		type: String,
// 		enum: ['Fiction', 'History', 'Classic']
// 	}
// })

// create the schema for the books collection
const bookSchema = mongoose.Schema({
	title: String,
	author: String,
	pages: Number,
	released: Date,
	inStock: {
		type: Boolean,
		default: true
	},
	genre: String
});
// create the model
const Book = mongoose.model('Book', bookSchema);

// make the connection to the database - we connect directly or create the database first
mongoose.connect('mongodb://localhost/mongoose-introduction', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('successfully connected')
	})
	.catch(err => console.log(err))

// CRUD -> Create Read Update Delete

// All the queries can be found here: https://mongoosejs.com/docs/queries.html

// create a book with the passed properties
// Book.create({
// 	title: 'Snow Crash',
// 	author: 'Neal Stephenson',
// 	pages: 300
// })
// 	.then(function (bookFromDB) {
// 		console.log(bookFromDB);
// 	})
// 	.catch(err => {
// 		console.log(err)
// 	})

// you can also use : insertMany() and pass an array

// READ - find a book by it's id 

// Book.findById('60d49b485d6a1d37d3a79eec').then(book => console.log(book));

// find a book with a query -> find(<query object>)
// Book.find({ title: 'IQ84' }).then(book => console.log(book));

// getting all the books from the database -> find() without parameters
// this returns an array
// Book.find().then(books => console.log(books));

// UPDATE
// find a book and update it -> {query to find the book}, {fields that should be updated} 
// this returns the book like before the update if you want the updated version
// pass {new: true} as a third parameter
// Book.findOneAndUpdate({ title: 'some other title' }, { genre: 'some genre' }, { new: true })
// 	.then(updatedBook => console.log(updatedBook))

// DELETE
// delete a book that matches the query -> {query to find the book} 
// Book.findOneAndDelete({ pages: 250 }).then(deletedBook => console.log(deletedBook));

const userSchema = mongoose.Schema({
	name: {
		type: String,
		set: value => {
			return value
				.split(' ')
				.map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
				.join(' ')
		}
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	email: {
		type: String,
		validate: {
			message: 'Email must be lowercase and contain an @',
			validator: value => {
				if (value.toLowerCase() === value && value.includes('@')) return true
				return false
			}
		}
	}
})

const User = mongoose.model('User', userSchema);

// create a new user
User.create({ name: 'bob alice', email: 'bob@gmail.com' })
	.then(user => {
		console.log(user);
		// this closes the connection
		mongoose.connection.close();
	})
	.catch(err => console.log(err))