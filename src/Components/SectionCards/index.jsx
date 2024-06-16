import { useState } from 'react';
import { CardMovie } from '../../Components/CardMovie';
import PropTypes from 'prop-types';

const SectionCards = ({contents, cantCards, nameSection}) => {
    const [cantidadMostrada, setCantidadMostrada] = useState(cantCards); // Estado para almacenar la cantidad de películas mostradas.
    const mostrarMas = () => {
        setCantidadMostrada(cantidadPrev => cantidadPrev + cantCards); // Aumenta en cantCards la cantidad de películas mostradas
    };

    return(
        <section className='flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg my-3'>
            <p className='text-3xl mb-6'>{nameSection}</p>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-6 w-full max-w-screen-lg'>
                {contents?.slice(0, cantidadMostrada).map(content => (
                    <div key={content.id}>
                        <CardMovie data={content} />
                    </div>
                ))}
            </div>
            {cantidadMostrada < contents?.length && ( // Solo muestra el botón si hay más películas para mostrar
                <button onClick={mostrarMas} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Mostrar más</button>
            )}
        </section>
    )
}

SectionCards.propTypes = {
    contents: PropTypes.array,
    cantCards: PropTypes.number,
    nameSection: PropTypes.string
};

export { SectionCards }