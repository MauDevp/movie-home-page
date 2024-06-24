import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { CardMovie } from '../../Components/CardMovie';
import PropTypes from 'prop-types';
import {SectionContext} from '../../Contexts';
import { useMovies } from '../../data';

const SectionCards = ({id, contents, nameSection}) => {
    const cantidadAMostrar = window.innerWidth >= 768 ? 5 : 4;
    const {page} = useMovies();
    const navigate = useNavigate();
    const { showMore, setShowMore } = useContext(SectionContext);
    const [isExpanded, setIsExpanded] = useState(false);

    const [cantidadMostrada, setCantidadMostrada] = useState(cantidadAMostrar); // Estado para almacenar la cantidad de películas mostradas.
    const [esPrimeraCarga, setEsPrimeraCarga] = useState(true); // Estado para identificar la primera carga
    const sectionRef = useRef(null); // Crea la referencia para el componente
    const cardMovieRef = useRef(null); // Crea la referencia para el componente

    // Cantidad de tarjetas a mostrar en dispositivos grandes y pequeños

    useEffect(() => {
        const isCurrentlyExpanded = showMore === id;
        setIsExpanded(isCurrentlyExpanded);
    
        // Restablecer cantidadMostrada a cantidadAMostrar si la sección se contrae
        if (!isCurrentlyExpanded && cantidadMostrada !== cantidadAMostrar) {
            setCantidadMostrada(cantidadAMostrar);
        }
    }, [showMore, id, cantidadMostrada, cantidadAMostrar]);

    const handleShowMore = () => {
        // Actualiza el estado global para expandir esta sección y cerrar las demás
        setShowMore(id);
    };

    useEffect(() => {
        // Verifica si es necesario desplazar a la vista después de una actualización del DOM
        if (showMore === id && !esPrimeraCarga) {
            // Utiliza requestAnimationFrame para asegurar que el scrollIntoView se llame después de que el DOM se haya actualizado
            requestAnimationFrame(() => {
                if (cantidadMostrada === cantidadAMostrar) {
                    // Desplaza la sección a la vista
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else if (cantidadMostrada > cantidadAMostrar) {
                    // Desplaza la última tarjeta agregada a la vista
                    cardMovieRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }, [cantidadMostrada, showMore, id, esPrimeraCarga, cantidadAMostrar]);

    // Asegúrate de actualizar esPrimeraCarga a false después de la primera renderización
    useEffect(() => {
        if (esPrimeraCarga && contents.length > 0) {
            setEsPrimeraCarga(false);
        }
    }, [contents, esPrimeraCarga]);

    const mostrarMas = () => {
        handleShowMore();
        setCantidadMostrada(cantidadPrev => cantidadPrev + cantidadAMostrar); // Aumenta en cantidadAMostrar la cantidad de películas mostradas
    };
    const mostrarMenos = () => {
        setCantidadMostrada(cantidadAMostrar); // Aumenta en cantidadAMostrar la cantidad de películas mostradas
    };

    // Ajustar la lógica para mostrar el botón "Mostrar más" y "Mostrar menos"
    const botones = () => {
        if (isExpanded) {
            if (cantidadMostrada === (2 * cantidadAMostrar)) {
                return (
                    <>
                        <button onClick={() => navigate(`${id}/${page}`)} className="mt-4 px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Ver más</button>
                        <p onClick={mostrarMenos} className="mt-0 py-2 font-light text-sm text-white rounded hover:text-gray-400 cursor-pointer">Mostrar menos</p>
                    </>
                );
            } else if (cantidadMostrada < contents.length && cantidadMostrada < (2 * cantidadAMostrar)) {
                return <button onClick={mostrarMas} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Mostrar más</button>;
            }
        } else {
            if (contents.length > cantidadAMostrar) {
                return <button onClick={mostrarMas} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Mostrar más</button>;
            }
        }
    };

    return(
        <section ref={sectionRef} tabIndex="-1"  className='flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg my-6 md:my-3'>
            <p className='md:text-3xl text-4xl md:mb-6 mb-10 border-b-4 md:border-b-2 border-yellow-300'>{nameSection}</p>
            <div ref={cardMovieRef} tabIndex="-1" className={`grid gap-4 grid-cols-2 md:grid-cols-${cantidadAMostrar} w-full max-w-screen-lg`}>
                {contents?.slice(0, cantidadMostrada).map(content => (
                    <div key={content.id}>
                        <CardMovie data={content} />
                    </div>
                ))}
            </div>
            {botones()}
        </section>
    )
}

SectionCards.propTypes = {
    id: PropTypes.string,
    contents: PropTypes.array,
    cantidadAMostrar: PropTypes.number,
    nameSection: PropTypes.string
};

export { SectionCards }