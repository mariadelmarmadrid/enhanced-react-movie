export const getMovies = (args) => {
    const region = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].region) || import.meta.env.VITE_TMDB_REGION || 'IE';
    const language = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&include_adult=false&include_video=false&page=1&region=${region}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getMovie = (args) => {
    // args.queryKey = ['movie', { id, language?, region? }]
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    const language = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getGenres = (args) => {
    const language = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        `&language=${language}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const language = (queryKey && queryKey[1] && queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getUpcomingMovies = (args) => {
    const region = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].region) || import.meta.env.VITE_TMDB_REGION || 'IE';
    const language = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&include_adult=false&include_video=false&page=1&region=${region}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};


export const getTopRatedMovies = (args) => {
    const region = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].region) || import.meta.env.VITE_TMDB_REGION || 'IE';
    const language = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&page=1&region=${region}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getNowPlayingMovies = (args) => {
    const region = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].region) || import.meta.env.VITE_TMDB_REGION || 'IE';
    const language = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&page=1&region=${region}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getPopularMoviesPage = (args) => {
    const region = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].region) || import.meta.env.VITE_TMDB_REGION || 'IE';
    const language = (args && args.queryKey && args.queryKey[1] && args.queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&page=1&region=${region}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieRecommendations = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const language = (queryKey && queryKey[1] && queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}&page=1`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const language = (queryKey && queryKey[1] && queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getPerson = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const language = (queryKey && queryKey[1] && queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getPersonMovieCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const language = (queryKey && queryKey[1] && queryKey[1].language) || import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=${language}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};