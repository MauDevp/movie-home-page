import { createContext, useState } from 'react';
export const SectionContext = createContext();



// eslint-disable-next-line react/prop-types
export const SectionProvide = ({children}) => {
    const [showMore, setShowMore] = useState(null)

    return (
        <SectionContext.Provider value={{
            setShowMore,
            showMore
        }}>
            {children}
        </SectionContext.Provider>
    )
}