import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from "../../Components/Layout"
import { useMovies } from "../../data"
import { motion } from 'framer-motion';
import { CardMovie } from "../../Components/CardMovie";



const Searches = () => {
    const { searches, setSearchQuery, isLoading } = useMovies();

    const location = useLocation();
    const path = location.search;


    // Actualiza el estado `searches` en base a la ruta actual
    useEffect(() => {
        const searchParams = new URLSearchParams(path);
        const searchQuery = searchParams.get('q');
        setSearchQuery(searchQuery);
    }, [path, setSearchQuery, location]);

    console.log(searches);

    if (isLoading) {
        return <div>Cargando películas...</div>
    }


    return (
        <Layout>
            <div className="w-full max-w-screen-lg mt-14 mb-12">
                {searches?.results && searches.results.length > 0
                    ? <div className="grid gap-4 grid-cols-2 md:grid-cols-5 w-full">
                        {searches.results
                            .filter(search =>
                                search.poster_path !== null && search.poster_path !== '' && // Asegura que poster_path no sea null ni cadena vacía
                                search.known_for === undefined // Excluye ítems que contienen la propiedad known_for
                            )
                            .map((search, index) => (
                                <motion.div
                                    key={search.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }} // Configura la transición para cada CardMovie
                                >
                                    <div key={index}>
                                        <CardMovie data={search} />
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                    : <div className='w-full flex justify-center'>
                        <p className='font-semibold text-4xl'>No se encontraron resultados</p>
                    </div>
                }
            </div>
        </Layout>
    )
}

export { Searches }

/**
{
    "id": 2462012,
    "original_name": "Maykel El Padrino",
    "media_type": "person",
    "adult": false,
    "name": "Maykel El Padrino",
    "popularity": 0.001,
    "gender": 0,
    "known_for_department": "Acting",
    "profile_path": null,
    "known_for": [
    {
        "backdrop_path": null,
        "id": 614947,
        "original_title": "Bakosó: AfroBeats de Cuba",
        "overview": "Bakosó follows Havana-based DJ Jigüe as he goes on a journey to connect with his African roots in his hometown of Santiago, Cuba, where he discovers Bakosó and finds a connection with its diasporic origins.",
        "poster_path": "/mIIPIkh0VWFiraTvkHLVQuh4glw.jpg",
        "media_type": "movie",
        "adult": false,
        "title": "Bakosó: AfroBeats of Cuba",
        "original_language": "en",
        "genre_ids": [
            99
        ],
        "popularity": 0.034,
        "release_date": "2019-11-15",
        "video": false,
        "vote_average": 0.0,
        "vote_count": 0
        }
    ]
}
*/