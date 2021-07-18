import React, { useEffect, useState } from "react";
import Header from '../../common/header/Header'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import "./Home.css";
import MovieFilter from './MovieFilter/MovieFilter'
/**
 * This file contains code for generating the homepage of the application
 *
 * @param {*} props expects baseUrl to be sent as props
 * @returns home page of the book movie application
 */
const Home = (props) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);

  //Get All Upcoming Movies
  useEffect(() => {
    fetch(`${props.baseUrl}/movies?page=1&status=PUBLISHED&limit=6`, {
      method: "GET",
      headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((response) => response.movies)
      .then(movies => movies.map(movie => {
        return {
          id: movie.id,
          title: movie.title,
          posterURL: movie.poster_url
        }
      }))
      .then(movies => setUpcomingMovies(movies))
  }, []);

  //Get All Released Movies
  useEffect(() => {
    fetch(`${props.baseUrl}/movies?limit=100&status=RELEASED`, {
      method: "GET",
      headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((response) => response.movies)
      .then(movies => movies.map(movie => {
        return {
          id: movie.id,
          title: movie.title,
          posterURL: movie.poster_url,
          releaseDate: movie.release_date,
          artists: movie.artists,
          genres: movie.genres
        }
      }))
      .then(movies => {
        setReleasedMovies(movies)
      })
  }, []);

  //Get All Movie Genres
  useEffect(() => {
    fetch(`${props.baseUrl}/genres?limit=100`, {
      method: "GET",
      headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((response) => response.genres)
      .then(genres => genres.map(genre => {
        return { id: genre.id, name: genre.genre }
      }))
      .then(genres => setGenres(genres))
  }, []);

  //Get All Artists
  useEffect(() => {
    fetch(`${props.baseUrl}/artists?limit=100`, {
      method: "GET",
      headers: {
        "Accept": "application/json;charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((response) => response.artists)
      .then(artists => artists.map(artist => {
        return { id: artist.id, name: `${artist.first_name} ${artist.last_name}` }
      }))
      .then(artists => setArtists(artists))
  }, []);

  //Redirect to details view of the given movie on click of tile.
  const movieTileClickHandler = (id) => {
    props.history.push(`/movie/${id}`);
  }

  return (

    <React.Fragment>
      {/* Header */}
      <Header onReleasedMoviePage={false} {...props} />
      
      {/* Upcoming Movies */}
      <div className="heading">
        <div className="heading-label">Upcoming Movies</div>
      </div>
      <GridList cols={5} cellHeight={250} className="upcoming-movies">
        {/* Transform movie object array to grid tiles */}
        {upcomingMovies.map(movie => {
          return (
            <GridListTile key={`movie${movie.id}`}>
              <img src={movie.posterURL} alt={movie.title} />
              <GridListTileBar title={movie.title} />
            </GridListTile>

          )
        })}
      </GridList>
      
      <main className="main-movies-section">
        
        {/* Released Movies */}
        <section className="movies-released-section">
          <GridList cols={4} cellHeight={350} className="released-movies">
            
            {/* Transform movie object array to grid tiles */}
            {releasedMovies.map(movie => {
              return (
                <GridListTile className="released-movie-tile" onClick={() => {
                  movieTileClickHandler(movie.id);
                }}
                  key={`movie${movie.id}`}>
                  <img src={movie.posterURL} alt={movie.title} />
                  <GridListTileBar title={movie.title} subtitle={`Release Date: ${movie.releaseDate}`} />
                </GridListTile>
              )
            })}
          </GridList></section>
        
        {/* Filter Criteria */}
        <section className="filter-movies-section">
          <MovieFilter allMovies={releasedMovies} setFilteredMovies={setReleasedMovies} genres={genres} artists={artists} />
        </section>
      </main>
    </React.Fragment>
  );
};
export default Home;