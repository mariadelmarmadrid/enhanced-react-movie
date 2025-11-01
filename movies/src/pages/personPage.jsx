import React, { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getPerson, getPersonMovieCredits } from '../api/tmdb-api';
import Spinner from '../components/spinner';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MoviesContext } from '../contexts/moviesContextValue';
import { Link } from 'react-router';
import PersonProfile from '../components/personProfile';
import PersonDetails from '../components/personDetails';
import FilmographyList from '../components/filmographyList';
import KnownForCarousel from '../components/knownForCarousel';

const PersonPage = () => {
    const { id } = useParams();
    const { language } = useContext(MoviesContext);

    const { data: person, error: personError, isPending: personLoading, isError: personIsError } = useQuery({
        queryKey: ['person', { id, language }],
        queryFn: getPerson,
    });

    const { data: credits, error: creditsError, isPending: creditsLoading, isError: creditsIsError } = useQuery({
        queryKey: ['personCredits', { id, language }],
        queryFn: getPersonMovieCredits,
    });

    // keep hooks at top-level (before any early returns) so rules-of-hooks are satisfied
    const filmography = useMemo(() => {
        if (!credits || !credits.cast) return [];
        return [...credits.cast].sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''));
    }, [credits]);

    const [deptFilter, setDeptFilter] = useState('All');

    const departments = useMemo(() => {
        const set = new Set();
        if (credits && credits.cast && credits.cast.length) set.add('Acting');
        if (credits && credits.crew) credits.crew.forEach(c => set.add(c.department || 'Crew'));
        return ['All', ...Array.from(set)];
    }, [credits]);

    const filteredFilmography = useMemo(() => {
        if (deptFilter === 'All') return filmography;
        if (deptFilter === 'Acting') return filmography;
        return filmography.filter(m => (m.department || '').toLowerCase() === deptFilter.toLowerCase());
    }, [filmography, deptFilter]);

    const knownFor = useMemo(() => {
        // pick top 8 by popularity or vote_count
        if (!credits) return [];
        const items = [...(credits.cast || [])];
        items.sort((a, b) => (b.popularity || b.vote_count || 0) - (a.popularity || a.vote_count || 0));
        return items.slice(0, 8);
    }, [credits]);

    if (personLoading || creditsLoading) return <Spinner />;

    if (personIsError) return <h1>{personError.message}</h1>;
    if (creditsIsError) return <h1>{creditsError.message}</h1>;

    return (
        <>
            {/* Top row: Profile + Details as a non-wrapping horizontal section (will scroll if viewport too narrow) */}
            <Grid container spacing={3} sx={{ flexWrap: 'nowrap', overflowX: 'auto', alignItems: 'flex-start' }}>
                <Grid item sx={{ flex: '0 0 320px' }}>
                    <PersonProfile person={person} />
                </Grid>

                <Grid item sx={{ flex: '1 1 auto', minWidth: 480 }}>
                    <Box sx={{ position: 'sticky', top: 96 }}>
                        <PersonDetails person={person} knownFor={knownFor} />
                    </Box>
                </Grid>
            </Grid>

            
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6">Acting</Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="body2">Department</Typography>
                            <Select size="small" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
                                {departments.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                            </Select>
                        </Box>
                    </Box>

                    <FilmographyList items={filteredFilmography} />
                </Grid>
            </Grid>
        </>
    );
};

export default PersonPage;
