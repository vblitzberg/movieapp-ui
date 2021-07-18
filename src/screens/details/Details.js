import { GridList, GridListTile, GridListTileBar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import Header from '../../common/header/Header'
import "./Details.css";
import StarBorder from '@material-ui/icons/StarBorder'

const Details = (props) => {
    const id = props.match.params.id;
    const [movieDetails, setMovieDetails] = useState(undefined);
    const [rating, setRating] = useState(0);

    useEffect(() => {

        fetch(`${props.baseUrl}/movies/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then(movie => setMovieDetails(movie))
    }, []);



    return movieDetails === undefined ? null : (
        <React.Fragment>
            <Header onReleasedMoviePage={true} movieID={id} {...props} />
            <Typography>
                <Link to={"/"} className="back">
                    &#60; Back to Home
                </Link>
            </Typography>

            <main className="container">
                <section className="left-section">
                    <img className="poster" src={movieDetails.poster_url} alt={movieDetails.title} />
                </section>
                <section className="middle-section">
                    <Typography variant="headline" component="h2">{movieDetails.title}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "bold" }}>Genres: </span>
                        {movieDetails.genres.join(', ')}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "bold" }}>Duration: </span>
                        {movieDetails.duration}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "bold" }}>Release Date: </span>
                        {movieDetails.release_date}
                    </Typography>
                    <Typography>
                        <span style={{ fontWeight: "bold" }}>Rating: </span>
                        {movieDetails.rating}
                    </Typography>
                    <Typography className="margin-top-16px">
                        <span style={{ fontWeight: "bold" }}>Plot: </span>
                        {"("}<a href={movieDetails.wiki_url}>Wiki Link</a>{")"}
                        {" " + movieDetails.storyline}
                    </Typography>
                    <Typography className="margin-top-16px">
                        <span style={{ fontWeight: "bold" }}>Trailer: </span>
                    </Typography>
                    <br />
                    <YouTube videoId={movieDetails.trailer_url.substring(movieDetails.trailer_url.indexOf('v=') + 2)}></YouTube>


                </section>
                <section className="right-section">
                    <Typography>
                        <span style={{ fontWeight: "bold" }}>Rate this movie: </span><br />
                        <StarBorder style={{ color: rating > 0 ? "yellow" : "black" }} onClick={() => { rating === 1 ? setRating(0) : setRating(1) }}></StarBorder>
                        <StarBorder style={{ color: rating > 1 ? "yellow" : "black" }} onClick={() => { rating === 2 ? setRating(0) : setRating(2) }}></StarBorder>
                        <StarBorder style={{ color: rating > 2 ? "yellow" : "black" }} onClick={() => { rating === 3 ? setRating(0) : setRating(3) }}></StarBorder>
                        <StarBorder style={{ color: rating > 3 ? "yellow" : "black" }} onClick={() => { rating === 4 ? setRating(0) : setRating(4) }}></StarBorder>
                        <StarBorder style={{ color: rating > 4 ? "yellow" : "black" }} onClick={() => { rating === 5 ? setRating(0) : setRating(5) }}></StarBorder>
                    </Typography>
                    <br />
                    <GridList cols={2} className="margin-top-16px artist-list">
                        {movieDetails.artists.map(artist => {
                            return (
                                <GridListTile className="movie-artist"
                                    key={artist.id}>
                                    <img src={artist.profile_url} alt={`${artist.first_name} ${artist.last_name}`} />
                                    <GridListTileBar title={`${artist.first_name} ${artist.last_name}`} />
                                </GridListTile>
                            )
                        })}
                    </GridList>
                </section>
            </main>)
        </React.Fragment>
    );
};
export default Details;