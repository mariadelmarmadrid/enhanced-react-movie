import React, { useState, useEffect } from "react";
import { MoviesContext } from './moviesContextValue';

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const [myReviews, setMyReviews] = useState({})
    const [mustWatch, setMustWatch] = useState([])

    // region: ISO 3166-1 alpha-2 code, persisted in localStorage
    const [region, setRegion] = useState(() => {
        try {
            return localStorage.getItem('tmdb_region') || import.meta.env.VITE_TMDB_REGION || 'IE'
        } catch {
            return import.meta.env.VITE_TMDB_REGION || 'IE'
        }
    })

    // language: e.g. en-US, es-ES, persisted in localStorage
    const [language, setLanguage] = useState(() => {
        try {
            return localStorage.getItem('tmdb_language') || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US'
        } catch {
            return import.meta.env.VITE_TMDB_LANGUAGE || 'en-US'
        }
    })

    useEffect(() => {
        console.log(mustWatch);
    }, [mustWatch]);
    

    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        }
        else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    // We will use this function in the next step
    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
    };

    const addReview = (movie, review) => {
        setMyReviews({ ...myReviews, [movie.id]: review })
    };
    //console.log(myReviews);

    const addToMustWatch = (movie) => {
        if (!mustWatch.includes(movie.id)) {
            setMustWatch([...mustWatch, movie.id]);
            console.log([...mustWatch, movie.id]); 
        }
    };

    // persist region and language selection
    useEffect(() => {
        try {
            localStorage.setItem('tmdb_region', region);
        } catch {
            // ignore
        }
    }, [region]);

    useEffect(() => {
        try {
            localStorage.setItem('tmdb_language', language);
        } catch {
            // ignore
        }
    }, [language]);

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                addReview,
                addToMustWatch,
                region,
                setRegion,
                language,
                setLanguage,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );

};

export default MoviesContextProvider;
