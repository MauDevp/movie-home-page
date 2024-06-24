import { Layout } from '../../Components/Layout';
import { CardInitial } from '../../Components/CardInitial';
import { SectionCards } from '../../Components/SectionCards';
import { useMovies } from '../../data';
import { motion } from "framer-motion";


const Home = () => {
    const { movies, tvShows, topRated, trending, isLoading, error, contador } = useMovies();

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    

    //!SECTION Return
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <Layout>
                <CardInitial data={movies[contador]} />
                <SectionCards id="movies" contents={movies} nameSection='Películas populares' />
                <SectionCards id="tvShows" contents={tvShows} nameSection='Series populares' />
                <SectionCards id="topRated" contents={topRated} nameSection='Mejores valoradas' />
                <SectionCards id="trending" contents={trending} nameSection='Tendencias' />
            </Layout>
        </motion.div>
    );
};

export { Home };