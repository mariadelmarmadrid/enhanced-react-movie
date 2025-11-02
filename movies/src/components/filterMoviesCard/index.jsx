import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

const controlSx = { mt: 1.5, width: "100%" };

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
            variant="outlined"
            sx={{
                position: "sticky",
                top: 88, // stays under the top app bar
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "background.paper",
            }}
        >
            <Box
                sx={{
                    height: 140,
                    backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <CardContent sx={{ p: 2.25 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    <SearchIcon sx={{ mr: 1, verticalAlign: "text-bottom" }} />
                    Filter the movies
                </Typography>

                <TextField
                    fullWidth
                    size="small"
                    label="Search"
                    variant="outlined"
                    value={props.titleFilter}
                    onChange={handle("name")}
                    sx={controlSx}
                />

                <FormControl fullWidth size="small" sx={controlSx}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        label="Genre"
                        value={props.genreFilter}
                        onChange={handle("genre")}
                    >
                        {genres.map((g) => (
                            <MenuItem key={g.id} value={g.id}>
                                {g.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={controlSx}>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        label="Sort by"
                        value={props.sortOrder || "default"}
                        onChange={handle("sort")}
                    >
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="release_date.desc">Newest</MenuItem>
                        <MenuItem value="release_date.asc">Oldest</MenuItem>
                        <MenuItem value="title.asc">Title A–Z</MenuItem>
                    </Select>
                </FormControl>

                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" color="text.secondary">
                    Tip: You can combine search + genre + sort.
                </Typography>
            </CardContent>
        </Card>
    );
}
