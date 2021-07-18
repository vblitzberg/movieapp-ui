import { withStyles } from "@material-ui/core"
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox'
import { TextField } from "@material-ui/core";

const styles = (theme) => ({
    cardElement: {
        margin: theme.spacing.unit,
        minWidth: '240px',
        maxWidth: '240px',
    },
    headerText: {
        margin: theme.spacing.unit,
        minWidth: '240px',
        maxWidth: '240px',
        color: theme.palette.primary.light
    }
});
const MovieFilter = ({ genres, artists, allMovies, setFilteredMovies, classes }) => {

    const [movieNameFilter, setMovieNameFilter] = useState('');
    const [movieGenreFilter, setMovieGenreFilter] = useState([]);
    const [movieArtistFilter, setMovieArtistFilter] = useState([]);
    const [movieReleaseStartFilter, setMovieReleaseStartFilter] = useState('');
    const [movieReleaseEndFilter, setMovieReleaseEndFilter] = useState('');

    const handleMovieGenreFilterChange = (value) => {
        setMovieGenreFilter(value);
    }

    const handleMovieArtistFilterChange = (value) => {
        setMovieArtistFilter(value);
    }

    const handleMovieReleaseStartFilterChange = (event) => {
        setMovieReleaseStartFilter(event.target.value);
    }

    const handleMovieReleaseEndFilterChange = (event) => {
        setMovieReleaseEndFilter(event.target.value);
    }

    const applyFilterButtonHandler = () => {
        const queryStringOptions = ['status=RELEASED'];
        console.log('movieNameFilter', movieNameFilter);
        if (movieNameFilter.length > 0)
            queryStringOptions.push("title=" + movieNameFilter);

        console.log('movieGenreFilter', movieGenreFilter);
        if (movieGenreFilter.length > 0)
            queryStringOptions.push("genre=" + movieGenreFilter.join(', '));

        console.log('movieArtistFilter', movieArtistFilter);
        if (movieArtistFilter.length > 0)
            queryStringOptions.push("artists=" + movieArtistFilter.join(', '));

        console.log('movieReleaseStartFilter', movieReleaseStartFilter);
        if (movieReleaseStartFilter.length > 0)
            queryStringOptions.push("start_date=" + movieReleaseStartFilter);

        console.log('movieReleaseEndFilter', movieReleaseEndFilter);
        if (movieReleaseEndFilter.length > 0)
            queryStringOptions.push("end_date=" + movieReleaseEndFilter);
        const queryStr = `http://localhost:8085/api/v1/movies?${encodeURI(queryStringOptions.join('&'))}`
        fetch(queryStr, {
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
            .then(movies => setFilteredMovies(movies))
    }

    return (<Card>
        <CardContent>
            <label className={classes.headerText}>FIND MOVIES BY:</label>
            { /* Movie Name */}
            <FormControl className={classes.cardElement}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input value={movieNameFilter} id="movieName" onChange={(e) => setMovieNameFilter(e.target.value)}>
                </Input>
            </FormControl>
            <br />
            { /* Movie Genres */}
            <FormControl className={classes.cardElement}>
                <InputLabel htmlFor="movieGenre">Genres</InputLabel>
                <Select
                    id="movieGenre"
                    multiple
                    value={movieGenreFilter}
                    onChange={(e) => { handleMovieGenreFilterChange(e.target.value) }}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    style={{ width: '100%' }}>

                    {genres.map((genre) => (
                        <MenuItem key={genre.id} value={genre.name}>
                            <Checkbox checked={movieGenreFilter.includes(genre.name)} />
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            { /* Movie Artists */}
            <FormControl className={classes.cardElement}>
                <InputLabel htmlFor="movieArtist">Artists</InputLabel>
                <Select
                    id="movieArtist"
                    multiple
                    value={movieArtistFilter}
                    onChange={(e) => { handleMovieArtistFilterChange(e.target.value) }}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    style={{ width: '100%' }}>

                    {artists.map((artist) => (
                        <MenuItem key={artist.id} value={artist.name}>
                            <Checkbox checked={movieArtistFilter.includes(artist.name)} />
                            {artist.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            { /* Release Start */}
            <FormControl className={classes.cardElement}>
                <TextField
                    id="movieReleaseStart"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    value={movieReleaseStartFilter}
                    onChange={handleMovieReleaseStartFilterChange}
                    label="Release Date Start"
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>
            <br />
            { /* Release End */}
            <FormControl className={classes.cardElement}>
                <TextField
                    id="movieReleaseEnd"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    value={movieReleaseEndFilter}
                    onChange={handleMovieReleaseEndFilterChange}
                    label="Release Date End"
                    InputLabelProps={{ shrink: true }}
                />
            </FormControl>
            <br />
            { /* Apply Button */}
            <Button
                variant="contained"
                onClick={applyFilterButtonHandler}
                color="primary"
                className={classes.cardElement} >
                APPLY
            </Button>
        </CardContent>
    </Card>)
}
export default withStyles(styles)(MovieFilter);