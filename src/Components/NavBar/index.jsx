import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {ChevronLeftIcon} from '@heroicons/react/24/solid'
import { TextInput } from '@tremor/react';
import { RiSearchLine } from '@remixicon/react';


const NavBar = () =>{
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        // Redirige a la ruta deseada, incluyendo el valor de búsqueda como parámetro de consulta
        navigate(`/search?q=${encodeURIComponent(busqueda)}`);
    };

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
                    title = 'Movie Info';
                } else if (path.match(/^\/tv\/\d+$/)) {
                    title = 'Tv Info';
                } else if (path.match(/^\/movies\/(\d+)$/)) {
                    title = 'Movies';
                } else if (path.match(/^\/tvShows\/(\d+)$/)) {
                    title = 'TV Shows';
                } else if (path.match(/^\/topRated\/(\d+)$/)) {
                    title = 'Mejores Valoradas';
                } else if (path.match(/^\/trending\/(\d+)$/)) {
                    title = 'Tendencias';
                } else {
                    title = 'Movies';
                }
                break;
    }

    return(
        <nav className='fixed top-0 left-0 w-full md:h-20 h-28 flex items-center justify-around bg-[#09112c] box-content'>
            <div className='relative flex flex-row w-full h-full items-center justify-around'>
                <ChevronLeftIcon 
                    className={`${title == 'Home' ? 'hidden' : 'flex flex-row' } absolute top-1/4 left-14 md:left-52  size-10 text-white cursor-pointer`} 
                    onClick={() => {
                        if(title == 'Movie Info' || title == 'Tv Info'){
                            navigate(-1)
                        }else if (title === 'Movies' || title === 'TV Shows' || title === 'Mejores Valoradas' || title === 'Tendencias'){
                            navigate('/')
                        }
                    }}
                />
                <p 
                    className='absolute md:top-1/4 top-[2rem] left-[38vw] text-4xl font-semibold'
                > {title}
                </p>
                <div className='md:flex hidden flex-row'>
                    <form onSubmit={manejarEnvio}>
                        <TextInput
                            className='absolute md:top-1/4 top-[4rem] md:left-[68vw] left-[10rem] w-52 z-20' 
                            icon={RiSearchLine}  
                            placeholder='Find movies or tvs...'  
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)} // Actualiza el estado con el valor ingresado
                        />
                    </form>
                </div>
            </div>
        </nav>
    )
}

export {NavBar}