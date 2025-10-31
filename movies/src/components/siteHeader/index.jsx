import React, { useState, useContext } from "react";
import { MoviesContext } from '../../contexts/moviesContextValue';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { region, setRegion, language, setLanguage } = useContext(MoviesContext);
    // Removed unused variable 'open'

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    const menuOptions = [
        { label: "Home", path: "/" },
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Popular", path: "/movies/popular" },
        { label: "Now Playing", path: "/movies/now-playing" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Top Rated", path: "/movies/top-rated" },
    ];

    const handleMenuSelect = (pageURL) => {
        setAnchorEl(null);
        navigate(pageURL);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
                        <Box>
                            <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                                TMDB Client
                            </Typography>
                            <Typography variant="caption" component="div" sx={{ opacity: 0.85 }}>
                                All you ever wanted to know about Movies!
                            </Typography>
                        </Box>
                    </Box>

                    {/* center menu */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        {!isMobile ? (
                            <Stack direction="row" spacing={1} alignItems="center">
                                {menuOptions.map((opt) => (
                                    <Button
                                        key={opt.label}
                                        color="inherit"
                                        onClick={() => handleMenuSelect(opt.path)}
                                        sx={{ textTransform: 'none', fontWeight: 600 }}
                                    >
                                        {opt.label}
                                    </Button>
                                ))}
                            </Stack>
                        ) : null}
                    </Box>

                    {/* right controls: language + region */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!isMobile && (
                            <Stack direction="row" spacing={1} alignItems="center">
                                <FormControl size="small" sx={{ minWidth: 140 }}>
                                    <InputLabel id="lang-select-label">Language</InputLabel>
                                    <Select
                                        labelId="lang-select-label"
                                        id="lang-select"
                                        value={language}
                                        label="Language"
                                        onChange={(e) => setLanguage(e.target.value)}
                                        sx={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                                    >
                                        <MenuItem value={'en-US'}>English (en-US)</MenuItem>
                                        <MenuItem value={'es-ES'}>Español (es-ES)</MenuItem>
                                        <MenuItem value={'fr-FR'}>Français (fr-FR)</MenuItem>
                                    </Select>
                                </FormControl>
                                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel id="region-select-label">Region</InputLabel>
                                    <Select
                                        labelId="region-select-label"
                                        id="region-select"
                                        value={region}
                                        label="Region"
                                        onChange={(e) => setRegion(e.target.value)}
                                        sx={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                                    >
                                        <MenuItem value={'IE'}>Ireland (IE)</MenuItem>
                                        <MenuItem value={'US'}>United States (US)</MenuItem>
                                        <MenuItem value={'GB'}>United Kingdom (GB)</MenuItem>
                                        <MenuItem value={'ES'}>Spain (ES)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        )}
                        {isMobile ? (
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : null}
                        {/* Mobile menu popup - uses anchorEl so ESLint knows it's used */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            {menuOptions.map((opt) => (
                                <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
