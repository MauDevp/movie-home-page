import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMovies } from '../../data';
import { ProgressCircle } from '@tremor/react';
import Rating from '@mui/material/Rating';
import { motion } from "framer-motion";

const CardSummary = () => {
    const { setIdFilm, setTypeFilm, isLoading, error, searchId } = useMovies();
    const location = useLocation();
    const [isReady, setIsReady] = useState(false); // Nuevo estado para controlar la renderización

    useEffect(() => {
        const currentPath = location.pathname;
        const index = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        const ruteString = currentPath.split('/');
        const rute = ruteString[1];

        setIdFilm(index);
        setTypeFilm(rute);

        setIsReady(true); // Establece isReady a true después de cargar los datos
    }, [location]);

    if (!isReady) return <div>Cargando...</div>;
    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if(isReady) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div key={searchId?.id}>
                {searchId ? (
                    <>
                    <div className='flex md:flex-row flex-col items-center justify-center mt-24 md:mt-0'>
                        <figure className='md:mr-10'>
                            <img
                                className='w-full h-[32rem] object-cover rounded-lg text-xs font-extralight'
                                src={`https://image.tmdb.org/t/p/w500${searchId.poster_path}`} alt={searchId.title || searchId.name}
                            />
                        </figure>
                        <div className='flex flex-col w-10/12 md:w-6/12 items-center'>
                            <p 
                                className='flex flex-col md:flex-row items-center justify-center font-semibold text-5xl md:mb-8 mb-10 md:mt-0 mt-4'>{searchId.title || searchId.name}
                                <span className='font-extralight text-4xl ml-2'>
                                    ({(searchId?.release_date?.split('-')[0]) || (searchId?.first_air_date?.split('-')[0])})
                                </span>
                            </p>
                            <div className='flex flex-col items-start md:gap-3 gap-4'>
                                <p className='line-clamp-4'>{searchId.overview}</p>
                                <p className='text-gray-400'><span className='text-white font-medium'>Genres:</span> {searchId.genres?.map(genre => genre.name).join(', ') || 'Not available'}</p>
                                <p className='text-gray-400'><span className='text-white font-medium'>Production:</span> {searchId.production_companies?.map(production => production.name).join(', ') || 'Not available'}</p>
                                <div className='flex flex-row items-end justify-around w-full mt-8 mb-16 md:mb-0'>    
                                    <div className='flex flex-col items-center gap-1'>
                                        <ProgressCircle value={((searchId.vote_average)*10)} size="md" color="fuchsia">
                                            <p className='text-white font-medium'>{(Math.round(searchId.vote_average * 10))}%</p>
                                        </ProgressCircle>
                                        <p className='text-gray-400'>Rating</p>
                                    </div>
                                    <div className='flex flex-col items-center gap-5'>
                                        <Rating name="read-only" value={Math.round(((searchId.popularity / 4000) * 4) +1)} readOnly />
                                        <p className='text-gray-400'>Popularity</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                ) : (
                    <p>No hay datos disponibles</p>
                )}
            </div>
        </motion.div>
    );
};

export { CardSummary };