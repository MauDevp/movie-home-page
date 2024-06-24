import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../../Components/Layout';
import { useMovies } from '../../data';
import { CardMovie } from '../../Components/CardMovie';
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MoviesPages = () => {
    const { movies, tvShows, topRated, trending, page, setPage, isLoading } = useMovies();
    const [contents, setContents] = useState([]);
    const [section, setSection] = useState('movies');
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const [allDataLoaded, setAllDataLoaded] = useState(false);

    // Actualiza el estado `contents` y `section` en base a la ruta actual
    useEffect(() => {
        let match;
        let newContents = [];
        let newSection = 'movies';

        if (path === '/') {
            newContents = movies;
        } else {
            if ((match = path.match(/^\/movies\/(\d+)$/))) {
                const newPage = parseInt(match[1]);
                newContents = movies;
                newSection = 'movies';
                setPage(newPage);
            } else if ((match = path.match(/^\/tvShows\/(\d+)$/))) {
                const newPage = parseInt(match[1]);
                newContents = tvShows;
                newSection = 'tvShows';
                setPage(newPage);
            } else if ((match = path.match(/^\/topRated\/(\d+)$/))) {
                const newPage = parseInt(match[1]);
                newContents = topRated;
                newSection = 'topRated';
                setPage(newPage);
            } else if ((match = path.match(/^\/trending\/(\d+)$/))) {
                const newPage = parseInt(match[1]);
                newContents = trending;
                newSection = 'trending';
                setPage(newPage);
            }
        }

        setContents(newContents);
        setSection(newSection);
        setAllDataLoaded(true); // Marca todos los datos como cargados

    }, [path, movies, tvShows, topRated, trending, setPage]);

    // Manejo del cambio de página
    const handlePageChange = (newPage) => {
        if (newPage !== page) {
            setPage(newPage);
            navigate(`/${section}/${newPage}`);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} // Ajusta la duración de la transición según sea necesario
        >
            <Layout>
                {isLoading ? (
                    <p>Cargando...</p> // Aquí puedes mostrar un spinner o mensaje de carga
                ) : allDataLoaded ? (
                    <div className='mx-6 md:mx-0'>
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-5 w-full max-w-screen-lg mt-14 mb-12">
                            {contents?.map((content) => (
                                <motion.div
                                    key={content.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }} // Configura la transición para cada CardMovie
                                >
                                    <CardMovie data={content} />
                                </motion.div>
                            ))}
                        </div>
                        {
                            section !== 'trending' ? (        
                                <div className="flex flex-row items-center justify-center gap-4 mt-14 mb-16">
                                    <div
                                        className="rounded-full bg-blue-600 size-12 flex items-center justify-center cursor-pointer"
                                        onClick={() => {
                                            if (page > 1) {
                                                handlePageChange(page - 1);
                                            }
                                        }}
                                    >
                                        <RiArrowLeftLine size={28} />
                                    </div>
                                    <div className="rounded-full bg-blue-800 h-14 w-32 flex items-center justify-center gap-2">
                                        <p className="text-white font-semibold flex items-center justify-center size-10 bg-blue-500 rounded-full">{page}</p>
                                        <p className="text-white font-semibold">de</p>
                                        <p className="text-white font-semibold">500</p>
                                    </div>
                                    <div
                                        className="rounded-full bg-blue-600 size-12 flex items-center justify-center cursor-pointer"
                                        onClick={() => {
                                            if (page < 500) {
                                                handlePageChange(page + 1);
                                            }
                                        }}
                                    >
                                        <RiArrowRightLine size={28} />
                                    </div>
                                </div>
                            ) : ('')
                        }
                    </div>
                ) : null}
            </Layout>
        </motion.div>
    );
};

export { MoviesPages };