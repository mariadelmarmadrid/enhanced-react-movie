import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const [myReviews, setMyReviews] = useState({})
    const [mustWatch, setMustWatch] = useState([])

    useEffect(() => {
        console.log(mustWatch); 
    }, []);
    

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

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                addReview,
                addToMustWatch,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );

};

export default MoviesContextProvider;
