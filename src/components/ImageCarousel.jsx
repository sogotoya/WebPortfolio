import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, autoPlayInterval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [slideDirection, setSlideDirection] = useState(1); // 1: next, -1: prev

    // マウスドラッグ用ローカル変数
    const dragStartX = useRef(0);
    const isDragging = useRef(false);
    const containerRef = useRef(null);

    // 次の画像へ
    const nextImage = useCallback(() => {
        setSlideDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    // 前の画像へ
    const prevImage = useCallback(() => {
        setSlideDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, [images.length]);

    // 手動操作時のタイマーリセット
    const handleManualNavigation = useCallback((direction) => {
        setIsAutoPlaying(false);
        if (direction === 'next') nextImage();
        else prevImage();
        setTimeout(() => setIsAutoPlaying(true), 10);
    }, [nextImage, prevImage]);

    // キーボード操作
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
    }, [handleManualNavigation]);

    // マウスドラッグ操作
    const handleMouseDown = (e) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        e.preventDefault(); // 画像のデフォルトドラッグを防止
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        // ドラッグ中のカーソルを変更（視覚フィードバック）
        e.preventDefault();
    };

    const handleMouseUp = (e) => {
        if (!isDragging.current) return;
        isDragging.current = false;

        const dragEndX = e.clientX;
        const dragDistance = dragEndX - dragStartX.current;
        const threshold = 50; // 50px以上のドラッグで切り替え

        if (dragDistance < -threshold) {
            // 左にドラッグ → 次の画像
            handleManualNavigation('next');
        } else if (dragDistance > threshold) {
            // 右にドラッグ → 前の画像
            handleManualNavigation('prev');
        }
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    // 自動再生タイマー
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setSlideDirection(1);
                nextImage();
            }, autoPlayInterval);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextImage, autoPlayInterval]);

    // スライドアニメーションの方向
    const variants = {
        enter: { opacity: 0, x: slideDirection * 100 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: slideDirection * -100 },
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden group select-none"
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <AnimatePresence mode='wait' custom={slideDirection}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    draggable={false}
                />
            </AnimatePresence>

            {/* ナビゲーションボタン */}
            <button
                onClick={(e) => { e.stopPropagation(); handleManualNavigation('prev'); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-neon-blue hover:bg-neon-blue hover:text-black transition-colors opacity-0 group-hover:opacity-100 z-10"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); handleManualNavigation('next'); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-neon-blue hover:bg-neon-blue hover:text-black transition-colors opacity-0 group-hover:opacity-100 z-10"
            >
                <ChevronRight size={24} />
            </button>

            {/* インジケーター */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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

