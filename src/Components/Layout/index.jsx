
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    return(
        <div className='flex flex-col items-center justify-center mt-24'>
            {children}
        </div>
    );
}

export {Layout}