import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContextValue";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const WatchlistMoviesPage = () => {
    const { watchlist: movieIds } = useContext(MoviesContext);

    // If watchlist is empty, render template with no movies
    if (!movieIds || movieIds.length === 0) {
        return (
            <PageTemplate
                title="Watchlist Movies"
                movies={[]}
                action={(movie) => <AddToFavoritesIcon movie={movie} />}
            />
        );
    }

    // Create an array of queries and run in parallel.
    const movieQueries = useQueries({
        queries: movieIds.map((movieId) => ({
            queryKey: ["movie", { id: movieId }],
            queryFn: getMovie,
        })),
    });

    // Loading state if any of the parallel queries is still pending
    const isPending = movieQueries.some((q) => q.isPending);
    if (isPending) return <Spinner />;

    // Collect successful results; map genres -> genre_ids for the filter
    const movies = movieQueries
        .filter((q) => q.data)
        .map((q) => {
            const m = { ...q.data };
            m.genre_ids = (m.genres || []).map((g) => g.id);
            return m;
        });

    return (
        <PageTemplate
            title="Watchlist Movies"
            movies={movies}
            action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />
    );
};

export default WatchlistMoviesPage;
