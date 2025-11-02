import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Header = ({ title }) => {
  return (
    <Paper
      component="div"
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
        mb: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h3"
        sx={{ fontWeight: 700, textAlign: "center" }}
      >
        {title}
      </Typography>
    </Paper>
  );
};

export default Header;
