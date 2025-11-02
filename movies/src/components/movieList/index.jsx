import Box from "@mui/material/Box";
import MovieCard from "../movieCard";

const MovieList = ({ movies = [], action }) => (
  <Box
    sx={{
      display: "grid",
      gap: 3,                                   // spacing between cards
      gridTemplateColumns: {
        xs: "1fr",                              // 1 per row on phones
        sm: "repeat(2, 1fr)",                   // 2 per row on small screens
        md: "repeat(4, 1fr)",                   // ✅ 4 per row on desktop+
      },
      alignItems: "stretch",
    }}
  >
    {movies.map((m) => (
      <Box key={m.id}>
        <MovieCard movie={m} action={action} />
      </Box>
    ))}
  </Box>
);

export default MovieList;
