import React, { useState, useMemo } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [sortOrder, setSortOrder] = useState("default");
    const genreId = Number(genreFilter);

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else if (type === "genre") setGenreFilter(value);
        else if (type === "sort") setSortOrder(value);
    };

    const displayedMovies = useMemo(() => {
        let list = movies
            .filter((m) => (m.title || "").toLowerCase().includes(nameFilter.toLowerCase()))
            .filter((m) => (genreId > 0 ? (m.genre_ids || []).includes(genreId) : true));

        const copy = [...list];
        switch (sortOrder) {
            case "release_date.desc":
                return copy.sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""));
            case "release_date.asc":
                return copy.sort((a, b) => (a.release_date || "").localeCompare(b.release_date || ""));
            case "title.asc":
                return copy.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
            default:
                return copy;
        }
    }, [movies, nameFilter, genreId, sortOrder]);

    return (
        <Grid container spacing={2}>
            {/* Title */}
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>

            {/* Full-width horizontal filter bar */}
            <Grid item xs={12}>
                <FilterCard
                    onUserInput={handleChange}
                    titleFilter={nameFilter}
                    genreFilter={genreFilter}
                    sortOrder={sortOrder}
                />
            </Grid>

            {/* Movies grid */}
            <Grid item xs={12}>
                <MovieList action={action} movies={displayedMovies} />
            </Grid>
        </Grid>
    );
}

export default MovieListPageTemplate;
