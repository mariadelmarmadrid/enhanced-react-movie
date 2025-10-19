import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import { todayLocalISODate } from "../util";



const UpcomingMoviesPage = (props) => {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['upcomingMovies'],
        queryFn: getUpcomingMovies,
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{ error.message } </h1>
    }

    const movies = data.results;

    // Keep only movies that have not been released yet by local date
    const today = todayLocalISODate();
    const unreleasedMovies = movies.filter((m) => m.release_date && m.release_date > today);

    return (
        <PageTemplate
            title= "Upcoming Movies"
            movies = { unreleasedMovies }
            action = {(movie) => {
                return <AddToPlaylistIcon movie={ movie } />
            }}
        />
    );

};
export default UpcomingMoviesPage;
