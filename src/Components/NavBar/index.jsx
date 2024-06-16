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
                } else {
                    title = 'Películas';
                }
                break;
    }

    return(
        <nav className='fixed top-0 left-0 w-full h-20 flex items-center justify-around bg-[#09112c]'>
                <ChevronLeftIcon className="size-10 text-white cursor-pointer" onClick={() => navigate('/')}/>
                <p 
                    className='text-4xl font-semibold'
                >{title}
                </p>
                <div className='flex flex-row'>
                    <TextInput icon={RiSearchLine} placeholder='Search...'  />
                </div>
        </nav>
    )
}

export {NavBar}