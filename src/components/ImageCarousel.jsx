import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, autoPlayInterval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Function to move to next image
    const nextImage = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    // Function to move to previous image
    const prevImage = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, [images.length]);

    // Reset auto-play timer on manual interaction
    const handleManualNavigation = (direction) => {
        // Stop temporary auto-play logic if we wanted, but requirement says "reset count"
        // So we just perform the action and let the interval reset naturally by dependency change or manual reset.
        // Actually, to "reset the timer", we need to clear the existing interval and start a new one.
        // We can achieve this by toggling a state or simply relying on useEffect cleanup.

        setIsAutoPlaying(false); // Pause momentarily or reset
        if (direction === 'next') nextImage();
        else prevImage();

        // Restart auto-play immediately (effectively resetting the timer)
        setTimeout(() => setIsAutoPlaying(true), 10);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                handleManualNavigation('next');
            } else if (e.key === 'ArrowLeft') {
                handleManualNavigation('prev');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextImage, prevImage]);

    // Auto-play timer
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                nextImage();
            }, autoPlayInterval);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextImage, autoPlayInterval]); // Re-running this effect resets the timer

    return (
        <div className="relative w-full h-full overflow-hidden group">
            <AnimatePresence mode='wait'>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={(e) => { e.stopPropagation(); handleManualNavigation('prev'); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-neon-blue hover:bg-neon-blue hover:text-black transition-colors opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); handleManualNavigation('next'); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-neon-blue hover:bg-neon-blue hover:text-black transition-colors opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-neon-pink' : 'bg-gray-600'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
