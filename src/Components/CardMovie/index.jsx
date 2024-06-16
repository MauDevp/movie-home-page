const CardMovie = ( data ) => {

    const titleOrName = data.data?.title || data.data?.name;
    let type = data.data?.title ? 'movie' : 'tv'
    const year = (data.data?.release_date?.split('-')[0]) || (data.data?.first_air_date?.split('-')[0])

    return (
        <figure key={data.data?.id} className='relative flex flex-col items-center h-full w-full'>
            <span className='absolute bottom-6 right-0 md:rounded-lg rounded-2xl text-gray-200 text-lg font-medium md:font-bold md:text-xs m-2 px-2 py-0.5 bg-blue-600'>{year}</span>
            <img 
                src={`https://image.tmdb.org/t/p/w500${data.data?.poster_path}`} alt={titleOrName}
                onClick={() => { window.location.href = `/${type}/${data.data?.id}` }}
                className='w-full h-full object-cover rounded-lg text-xs font-extralight'
            />
            <p className='md:text-lg text-xl font-normal line-clamp-1'>{titleOrName}</p>
        </figure>
    );
}

export { CardMovie }