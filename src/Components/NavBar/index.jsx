import { useLocation, useNavigate } from 'react-router-dom'
import {ChevronLeftIcon} from '@heroicons/react/24/solid'
import { TextInput } from '@tremor/react';
import { RiSearchLine } from '@remixicon/react';


const NavBar = () =>{
    const navigate = useNavigate();

    const location = useLocation()
    let title;
    const path = location.pathname;

    switch(path){
        case '/':
            title = 'Home'
            break
            default:
                // Si no es una ruta estática, verifica las rutas dinámicas
                if (path.match(/^\/movie\/\d+$/)) {
                    title = 'Movie Summary';
                } else if (path.match(/^\/tv\/\d+$/)) {
                    title = 'Tv Summary';
                } else if (path.match(/^\/movies\/(\d+)$/)) {
                    title = 'Movies';
                } else if (path.match(/^\/tvShows\/(\d+)$/)) {
                    title = 'TV Shows';
                } else if (path.match(/^\/topRated\/(\d+)$/)) {
                    title = 'Mejores Valoradas';
                } else if (path.match(/^\/trending\/(\d+)$/)) {
                    title = 'Trending';
                } else {
                    title = 'Movies';
                }
                break;
    }

    return(
        <nav className='fixed top-0 left-0 w-full h-20 flex items-center justify-around bg-[#09112c]'>
                <ChevronLeftIcon 
                    className={`${title == 'Home' ? 'hidden' : 'flex flex-row' } size-10 text-white cursor-pointer`} 
                    onClick={() => {
                        if(title == 'Movie Summary' || title == 'Tv Summary'){
                            navigate(-1)
                        }else if (title === 'Movies' || title === 'TV Shows' || title === 'Mejores Valoradas' || title === 'Trending'){
                            navigate('/')
                        }
                    }}
                />
                <p 
                    className='text-4xl font-semibold'
                >{title}
                </p>
                <div className='md:flex hidden flex-row'>
                    <TextInput icon={RiSearchLine} placeholder='Find movies or tvs...'  />
                </div>
        </nav>
    )
}

export {NavBar}