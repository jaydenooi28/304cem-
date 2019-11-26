import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import Popup from 'react-popup';
import './Popup.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAllMovies = () => {
    axios
      .get('/getallmovies')
      .then(result => {
        this.setState({ movies: result.data });
        console.log(this.state.movies);
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getAllMovies();
  }

  handleSubmit(e) {
    const query = `/getmovie?title=${this.input.value}`;

    console.log(query);
    e.preventDefault();
    axios
      .get(query)
      .then(result => {
        console.log(result);
        if (result.data === 'Not found') {
          Popup.alert('Movie Not Found');
        }
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  deleteRecord = value => {
    console.log('to delete: ', value);
    const query = `/deletemovie?id=${value}`;
    axios
      .get(query)
      .then(result => {
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  render() {
    var data = this.state.movies;
    data = data.reverse();

    return (
      <div className="App">
        <div className="jumbotron text-center header">
          
          
          
        </div>
        <div className="container search">
          <div className="col-sm-12">
            <p />
            <form onSubmit={this.handleSubmit}>
              <label>Enter movie title:</label>
              <input
                type="text"
                class="form-control"
                ref={input => (this.input = input)}
              />
              <p />
              <input type="submit" value="Submit" />
            </form>
            <p />
          </div>
          <div>
            <Popup />
          </div>
        </div>

        <div className="container">
          <div className="col-sm-12">
          

            <p />
            <ReactTable
              data={data}
              columns={[
                {
                  Header: 'Delete',
                  accessor: 'title',
                  Cell: row => (
                    <a
                      onClick={() => {
                        this.deleteRecord(row.original._id);
                      }}
                    >
                      Delete
                    </a>
                  )
                },
                {
                  Header: 'Title',
                  accessor: 'title'
                },
                {
                  Header: 'Year',
                  accessor: 'year'
                },
                {
                  Header: 'Plot',
                  accessor: 'plot',
                  style: { 'white-space': 'unset' }
                },
                {
                  Header: 'Poster',
                  Cell: row => {
                    return (
                      <div>
                        <img height={250} src={'http://image.tmdb.org/t/p/w185/'+row.original.poster} />
                      </div>
                    );
                  }
                }
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;