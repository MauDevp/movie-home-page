import { useLocation, useNavigate } from 'react-router-dom'
import {ChevronLeftIcon, MagnifyingGlassIcon} from '@heroicons/react/24/solid'

const NavBar = () =>{
    const navigate = useNavigate();

    // Funciones para navegar hacia atrás y hacia adelante
    const goBack = () => navigate(-1);

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
                } else {
                    title = 'Películas';
                }
                break;
    }

    return(
        <nav className='fixed top-0 left-0 w-full h-20 flex items-center justify-around bg-[#09112c]'>
                <ChevronLeftIcon className="size-8 text-white cursor-pointer" onClick={() => navigate('/')}/>
                <p 
                    className='text-4xl font-semibold'
                >{title}
                </p>
                <div className='flex flex-row'>
                    <div className='h-8 w-8 bg-white rounded-l-lg'>
                    <MagnifyingGlassIcon className="size-8 text-black cursor-pointer"/>
                    </div>
                    <input type="text" className='bg-white text-black text-center focus:outline-none focus:ring-0 rounded-r-lg'/>
                </div>
        </nav>
    )
}

export {NavBar}