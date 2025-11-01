import React, { useState, useMemo } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");     // "All"
    const [sortOrder, setSortOrder] = useState("default");   // Default (API order)
    const genreId = Number(genreFilter);

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else if (type === "genre") setGenreFilter(value);
        else if (type === "sort") setSortOrder(value);
    };

    const displayedMovies = useMemo(() => {
        // 1) filter by title + genre
        let list = movies
            .filter(m => (m.title || "").toLowerCase().includes(nameFilter.toLowerCase()))
            .filter(m => (genreId > 0 ? (m.genre_ids || []).includes(genreId) : true));

        // 2) sort
        const copy = [...list];
        switch (sortOrder) {
            case "release_date.desc":
                return copy.sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""));
            case "release_date.asc":
                return copy.sort((a, b) => (a.release_date || "").localeCompare(b.release_date || ""));
            case "title.asc":
                return copy.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
            case "default":
            default:
                return copy; // API order (no sorting)
        }
    }, [movies, nameFilter, genreId, sortOrder]);

    return (
        <Grid container>
            {/* Header row */}
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>

            {/* Content row */}
            <Grid container spacing={2} alignItems="flex-start" sx={{ width: "100%", m: 0 }}>
                {/* LEFT: Filter sidebar */}
                <Grid item xs={12} md={3} lg={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                        sortOrder={sortOrder}
                    />
                </Grid>

                {/* RIGHT: Movies grid */}
                <Grid item xs={12} md={9} lg={10} sx={{ minWidth: 0, flexGrow: 1 }}>
                    <MovieList action={action} movies={displayedMovies} />
                </Grid>
            </Grid>

        </Grid>
    );
}

export default MovieListPageTemplate;
