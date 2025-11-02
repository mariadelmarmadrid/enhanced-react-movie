import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

export default function FilterMoviesCard(props) {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["genres"],
        queryFn: getGenres,
    });

    if (isPending) return <Spinner />;
    if (isError) return <h1>{error.message}</h1>;

    const genres = [...data.genres];
    if (!genres.length || genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    const handle = (type) => (e) => props.onUserInput(type, e.target.value);

    return (
        <Card
            elevation={2}
            sx={{
                width: "100%",
                borderRadius: 3,
                px: { xs: 2, md: 3 },
                py: { xs: 1.25, md: 1.5 },      // low height
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
                background: "linear-gradient(135deg, #ede7f6 0%, #f3e5f5 100%)",
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1.25, md: 2 }}
                alignItems="center"
                sx={{ width: "100%" }}
            >
                {/* Small label on the left */}
                <Typography
                    variant="subtitle1"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontWeight: 700,
                        minWidth: { md: 150 },
                    }}
                >
                    <SearchIcon color="primary" fontSize="small" />
                    Filter Movies
                </Typography>

                {/* Search expands to fill row */}
                <TextField
                    label="Search"
                    type="search"
                    value={props.titleFilter}
                    onChange={handle("name")}
                    size="small"
                    sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}
                />

                {/* Genre */}
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        label="Genre"
                        value={props.genreFilter}
                        onChange={handle("genre")}
                    >
                        {genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Sort */}
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        label="Sort by"
                        value={props.sortOrder || "default"}
                        onChange={handle("sort")}
                    >
                        <MenuItem value="default">Default (API order)</MenuItem>
                        <MenuItem value="release_date.desc">Newest</MenuItem>
                        <MenuItem value="release_date.asc">Oldest</MenuItem>
                        <MenuItem value="title.asc">Title A–Z</MenuItem>
                    </Select>
                </FormControl>

                {/* Right tip (wraps under on mobile) */}
                <Box sx={{ flex: { md: 0 }, whiteSpace: "nowrap", color: "text.secondary", fontSize: 12 }}>
                    tip: search + genre + sort
                </Box>
            </Stack>
        </Card>
    );
}
