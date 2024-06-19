import { Layout } from '../../Components/Layout'
import { useMovies } from '../../data'
import { CardMovie } from '../../Components/CardMovie'

const TvShowsPages = () => {
    const { tvShows} = useMovies();

    return(
        <Layout>
            <div className={`grid gap-4 grid-cols-1 md:grid-cols-${5} w-full max-w-screen-lg`}>
                {tvShows?.slice(0, tvShows.length).map(tvShow => (
                    <div key={tvShow.id}>
                        <CardMovie data={tvShow} />
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export  {TvShowsPages}