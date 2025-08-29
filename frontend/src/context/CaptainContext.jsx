import { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Optional helper function to update captain
    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    return (
        <CaptainDataContext.Provider
            value={{
                captain,
                setCaptain,
                isLoading,
                setIsLoading,
                error,
                setError,
                updateCaptain
            }}
        >
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
