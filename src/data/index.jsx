import { useState, useEffect } from 'react';

const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [trending, setTrending] = useState([]);
    const [searchId, setSearchId] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [idFilm, setIdFilm] = useState(1022789);
    const [typeFilm, setTypeFilm] = useState('movie');

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmI4OGMwZWFiNDdmOGFmZTVmNjBlMjg0NWIxYmZkNSIsInN1YiI6IjY2NmM5Zjg1NzQyYTE1NTI2MGY4MWY5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H3qaYFvJ85F-HRpCeWRbmWrkshvwHczOHtIevSqQalA'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const responses = await Promise.all([
                    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options),
                    fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options),
                    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options),
                    fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US', options)
                ]);
                const data = await Promise.all(responses.map(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }));
                setMovies(data[0].results);
                setTvShows(data[1].results);
                setTopRated(data[2].results);
                setTrending(data[3].results);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchSearchId = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/${typeFilm}/${idFilm}?language=en-US`, options);
                if (!response.ok) {
                    throw new Error('Your search did not return any results, please try another');
                }
                const data = await response.json();
                setSearchId(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSearchId();
    }, [typeFilm, idFilm]);

    const [contador, setContador] = useState(0);
    useEffect(() => {
        const intervalo = setInterval(() => {
            setContador(contadorPrevio => contadorPrevio === 16 ? 0 : contadorPrevio + 1);
        }, 5000);
        return () => clearInterval(intervalo);
    }, []);

    return { movies, tvShows, topRated, trending, searchId, setIdFilm, setTypeFilm, isLoading, error, contador };
};

export { useMovies }