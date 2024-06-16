import { SwitchTransition, CSSTransition } from "react-transition-group";
import './style.css';

const CardInitial = (data) => {
    return (
        <div 
            className="w-full cursor-pointer transition-opacity duration-500 ease-out hover:opacity-80"
            onClick={() => { window.location.href = `/movie/${data.data?.id}` }}
        >
            <div className="relative overflow-hidden rounded-lg">
            <SwitchTransition mode={"out-in"}>
                <CSSTransition
                    key={data.data?.backdrop_path}
                    classNames='slide'
                    addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                >
                <img
                    src={`https://image.tmdb.org/t/p/w500${data.data?.backdrop_path}`} alt={data.data?.title}
                    className="w-full h-[30rem] object-cover transition-all duration-500 ease-in-out [mask-image:linear-gradient(to_right,transparent,white_50%,white)] dark:[mask-image:linear-gradient(to_right,transparent,#1f2937_50%,#1f2937)]"
                />
                </CSSTransition>
            </SwitchTransition>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-white mb-2 md:text-3xl">{data.data?.title}</h2>
                    <p className="text-gray-300 text-sm md:text-base">{data.data?.overview}</p>
                </div>
            </div>
        </div>
    )
}

export { CardInitial }