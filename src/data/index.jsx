import { useState, useEffect } from 'react';

const useMovies = () => {
    // Estados para almacenar las películas, series, las mejor valoradas y las tendencias
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [trending, setTrending] = useState([]);
    const [searches, setSearches] = useState([]);

    // Estado para almacenar la página
    const [page, setPage] = useState(1);

    // Estados para almacenar la búsqueda por id
    const [searchId, setSearchId] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    // Estados para almacenar el estado de carga y errores
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para almacenar el id y el tipo de búsqueda
    const [idFilm, setIdFilm] = useState(1022789);
    const [typeFilm, setTypeFilm] = useState('movie');


    // Variable para almacenar el idioma
    let language = 'es-MX'


    // Opciones para la petición
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmI4OGMwZWFiNDdmOGFmZTVmNjBlMjg0NWIxYmZkNSIsInN1YiI6IjY2NmM5Zjg1NzQyYTE1NTI2MGY4MWY5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H3qaYFvJ85F-HRpCeWRbmWrkshvwHczOHtIevSqQalA'
        }
    };

    // Petición para obtener las películas, series, las mejor valoradas y las tendencias
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const responses = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=popularity.desc`, options),
                    fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${language}&page=${page}&sort_by=popularity.desc`, options),
                    fetch(`https://api.themoviedb.org/3/movie/top_rated?language=${language}&page=${page}`, options),
                    fetch(`https://api.themoviedb.org/3/trending/all/week?language=${language}`, options),
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
    }, [page]);

    // Petición para obtener la búsqueda por id
    useEffect(() => {
        const fetchSearchId = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/${typeFilm}/${idFilm}?language=${language}`, options);
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

    // Petición para obtener la búsqueda por search
    useEffect(() => {
        const fetchSearches = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=${language}&page=${page}`, options);
                if (!response.ok) {
                    throw new Error('Your search did not return any results, please try another please');
                }
                const data = await response.json();
                setSearches(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSearches();
    }, [searchQuery, page]);

    // Contador para cambiar la película inicial
    const [contador, setContador] = useState(0);
    useEffect(() => {
        const intervalo = setInterval(() => {
            setContador(contadorPrevio => contadorPrevio === 16 ? 0 : contadorPrevio + 1);
        }, 5000);
        return () => clearInterval(intervalo);
    }, []);

    // Retorna las películas, series, las mejor valoradas y las tendencias
    return { movies, tvShows, topRated, trending, searches, setSearchQuery, searchId, setIdFilm, setTypeFilm, isLoading, error, contador, page, setPage};
};

export { useMovies }