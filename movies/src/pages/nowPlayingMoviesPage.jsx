import React, { useContext } from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import { MoviesContext } from '../contexts/moviesContextValue';


const NowPlayingMoviesPage = () => {

    const { region, language } = useContext(MoviesContext);
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['nowPlayingMovies', { region, language }],
        queryFn: getNowPlayingMovies,
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{ error.message } </h1>
    }

    const movies = data.results;

    return (
        <PageTemplate
            title= "Now Playing Movies"
            movies = { movies }
            action = {(movie) => {
                return <AddToPlaylistIcon movie={ movie } />
            }}
        />
    );

};
export default NowPlayingMoviesPage;
