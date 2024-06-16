import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useMovies } from '../../data';
import { ProgressCircle } from '@tremor/react';
import Rating from '@mui/material/Rating';

const CardSummary = () => {
    const { setIdFilm, setTypeFilm, isLoading, error, searchId } = useMovies();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const index = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        const ruteString = currentPath.split('/');
        const rute = ruteString[1];

        setIdFilm(index);
        setTypeFilm(rute);
    }, [setIdFilm, setTypeFilm]); // Remover isLoading y error de las dependencias si no se usan dentro de useEffect

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log('searchId: ' + searchId)

    return (
        <div key={searchId?.id}>
            {searchId ? (
                <>
                <div className='flex flex-row items-center justify-center'>
                    <figure className='mr-10'>
                        <img
                            className='w-full h-[26rem] object-cover rounded-lg text-xs font-extralight'
                            src={`https://image.tmdb.org/t/p/w500${searchId.poster_path}`} alt={searchId.title || searchId.name}
                        />
                    </figure>
                    <div className='flex flex-col w-6/12 items-center'>
                        <p 
                            className='font-semibold text-5xl mb-8'>{searchId.title || searchId.name}
                            <span className='font-extralight text-4xl ml-2'>
                                ({(searchId?.release_date?.split('-')[0]) || (searchId?.first_air_date?.split('-')[0])})
                            </span>
                        </p>
                        <div className='flex flex-col items-start gap-3'>
                            <p className='line-clamp-3'>{searchId.overview}</p>
                            <p className='text-gray-400'><span className='text-white font-medium'>Genres:</span> {searchId.genres?.map(genre => genre.name).join(', ') || 'Not available'}</p>
                            <p className='text-gray-400'><span className='text-white font-medium'>Production:</span> {searchId.production_companies?.map(production => production.name).join(', ') || 'Not available'}</p>
                            <div className='flex flex-row items-end justify-around w-full mt-8'>    
                                <div className='flex flex-col items-center gap-1'>
                                    <ProgressCircle value={((searchId.vote_average)*10)} size="md" color="fuchsia">
                                        <p className='text-white font-medium'>{(Math.round(searchId.vote_average * 10))}%</p>
                                    </ProgressCircle>
                                    <p className='text-gray-400'>Rating</p>
                                </div>
                                <div className='flex flex-col items-center gap-1'>
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
    );
};

export { CardSummary };