const mongoose = require('mongoose');
const db = 'mongodb+srv://jayd:ows1998120@joker-79wrh.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connection error: ', error);
  });

const schema = mongoose.Schema({
  title: { type: String },
  year: { type: String },
  plot: { type: String },
  poster: { type: String },
  vote_average: { type: String }

});

const Movie = mongoose.model('movieCollection', schema, 'movieCollection');

module.exports.Movie = Movie;
