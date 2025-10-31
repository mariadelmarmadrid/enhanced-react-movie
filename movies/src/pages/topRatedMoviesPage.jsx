import React, { useContext } from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import { MoviesContext } from '../contexts/moviesContextValue';


const TopRatedMoviesPage = () => {

    const { region, language } = useContext(MoviesContext);
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['topRatedMovies', { region, language }],
        queryFn: getTopRatedMovies,
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
            title= "Top Rated Movies"
            movies = { movies }
            action = {(movie) => {
                return <AddToPlaylistIcon movie={ movie } />
            }}
        />
    );

};
export default TopRatedMoviesPage;
