import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";

const MovieHeader = (props) => {
    const movie = props.movie;
    const navigate = useNavigate();

    return (
        <Paper
            component="div"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
                mb: 2,
                px: 2,
                py: 1.25,
                borderRadius: 2,
                boxShadow: "none",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                background: "transparent",
            }}
        >
            {/* back / forward buttons stay the same */}

            <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
                {title}
            </Typography>

            {/* forward button … */}
        </Paper>

    );
};

export default MovieHeader;
