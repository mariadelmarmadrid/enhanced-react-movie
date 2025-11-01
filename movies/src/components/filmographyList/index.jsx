import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FilmographyList = ({ items = [] }) => {
    if (!items || items.length === 0) return <Typography>No credits available.</Typography>;

    return (
        <>
            {items.slice(0, 50).map((m) => (
                <Accordion key={m.credit_id} sx={{ mb: 1 }} disableGutters>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ width: 48, height: 72, bgcolor: 'grey.100' }}>
                                {m.poster_path && <img src={`https://image.tmdb.org/t/p/w200/${m.poster_path}`} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </Box>
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>{m.title || m.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{m.release_date || '—'} • {m.character || m.job || ''}</Typography>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">More details not implemented.</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
};

export default FilmographyList;
