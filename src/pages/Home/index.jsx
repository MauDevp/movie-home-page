import { Layout } from '../../Components/Layout';
import { CardInitial } from '../../Components/CardInitial';
import { SectionCards } from '../../Components/SectionCards';
import { useMovies } from '../../data'; // 


const Home = () => {
    const { movies, tvShows, topRated, trending, isLoading, error, contador } = useMovies();

    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    

    //!SECTION Return
    return (
        <Layout>
            <CardInitial data={movies[contador]} />
            <SectionCards contents={movies} cantCards={6} nameSection='Películas populares' />
            <SectionCards contents={tvShows} cantCards={6} nameSection='Series populares' />
            <SectionCards contents={topRated} cantCards={6} nameSection='Mejores valoradas' />
            <SectionCards contents={trending} cantCards={6} nameSection='Tendencias' />
        </Layout>
    );
};

export { Home };