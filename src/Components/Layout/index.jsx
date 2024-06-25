
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    return(
        <div className='flex flex-col items-center justify-center md:mt-26 mt-32 mx-2'>
            {children}
        </div>
    );
}

export {Layout}