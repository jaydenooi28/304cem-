const express = require('express');
const app = express();
const axios = require('axios');
const Movie = require('./Movie').Movie;
//var path = require ('path');

const apikey = '3bcf17cf401d9972d6cc9783da13f025';


// if (process.env.NODE_ENV ==='production'){
//   app.use (express.static('client/build'));
// }
//   app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'client/public','index.html'));
//   });


//localhost:5000/getmovie?title=MovieTitle
app.get('/getmovie', (req, res) => {
  const title = req.query.title;
  const querystr = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}`;

  axios
    .get(querystr)
    .then(response => {
      const movie = new Movie({
        title: response.data.results[0].title,
        year: response.data.results[0].release_date,
        plot :response.data.results[0].overview,
        poster: response.data.results[0].poster_path,
        vote_average: response.data.results[0].vote_average
      });
      // res.send(movie)
      movie.save()
      res.send(response.data.results)

      // if (!movie.title) {
      //   res.status(200).json('Not found');
      //   return;
      // }
      // movie
      //   .save()
      //   .then(response => {
      //     res.status(200).json(response);
      //   })
      //   .catch(error => {
      //     res.status(400).json(error);
      //   });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/getallmovies
app.get('/getallmovies', (req, res) => {
  Movie.find({})  
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/deletemovie?title=MovieTitle
app.get('/deletemovie', (req, res) => {
  Movie.findByIdAndDelete( req.query.id)
    .then(response => {
      res.status(200).json(response);
    })  
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
