import React, { useState, useMemo } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
        <Grid container>
            {/* Centered title */}
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>

            {/* Sidebar + content (no wrap) */}
            <Grid item xs={12}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        alignItems: "flex-start",
                        flexWrap: { xs: "wrap", md: "nowrap" }, // desktop: keep in one row
                        px: { xs: 1.5, md: 3 },                 // page gutter
                    }}
                >
                    {/* LEFT: fixed-width sidebar */}
                    <Box
                        sx={{
                            flex: "0 0 250px",
                            width: { xs: "100%", md: 320 },
                            position: { md: "sticky" },
                            top: { md: 88 },              // under top app bar
                        }}
                    >
                        <FilterCard
                            onUserInput={handleChange}
                            titleFilter={nameFilter}
                            genreFilter={genreFilter}
                            sortOrder={sortOrder}
                        />
                    </Box>

                    {/* RIGHT: fluid movie grid */}
                    <Box
                        sx={{
                            flex: "1 1 100%",     // allow full remaining width
                            minWidth: 0,
                            pr: { xs: 0, md: 2 }, // small right padding
                        }}
                    >
                        <MovieList action={action} movies={displayedMovies} />
                    </Box>

                </Box>
            </Grid>
        </Grid>
    );
}

export default MovieListPageTemplate;
