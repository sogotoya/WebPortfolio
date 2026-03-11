import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    // Check localStorage for previous decision, default to false (not asked)
    const [hasAnsweredModal, setHasAnsweredModal] = useState(() => {
        return localStorage.getItem('hasAnsweredAudioModal') === 'true';
    });

    // Default to false (muted) until explicitly allowed
    const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
        return localStorage.getItem('isAudioEnabled') === 'true';
    });

    const setAudioPermission = (allowed) => {
        setIsAudioEnabled(allowed);
        setHasAnsweredModal(true);
        localStorage.setItem('isAudioEnabled', allowed);
        localStorage.setItem('hasAnsweredAudioModal', 'true');
    };

    const toggleAudio = () => {
        setIsAudioEnabled(prev => {
            const newState = !prev;
            localStorage.setItem('isAudioEnabled', newState);
            return newState;
        });
    };

    return (
        <AudioContext.Provider value={{ isAudioEnabled, hasAnsweredModal, setAudioPermission, toggleAudio }}>
            {children}
        </AudioContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAudio = () => useContext(AudioContext);
