import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const ImageCarousel = ({ images, videoUrl, autoPlayInterval = 3000 }) => {
    // 動画がある場合、スライド配列の先頭に動画を挿入
    const hasVideo = videoUrl && videoUrl.length > 0 && !videoUrl.startsWith('http');
    const totalSlides = hasVideo ? images.length + 1 : images.length;

    const [currentIndex, setCurrentIndex] = useState(0);
    // 動画がある場合は自動再生OFF、動画が終わってからON
    const [isAutoPlaying, setIsAutoPlaying] = useState(!hasVideo);
    const [slideDirection, setSlideDirection] = useState(1); // 1: next, -1: prev
    const [videoEnded, setVideoEnded] = useState(false);
    const [isVideoPaused, setIsVideoPaused] = useState(false); // 再生/一時停止状態

    // マウスドラッグ用ローカル変数
    const dragStartX = useRef(0);
    const isDragging = useRef(false);
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    // 現在のスライドが動画かどうか
    const isVideoSlide = hasVideo && currentIndex === 0;

    // 動画の再生/一時停止切り替え
    const toggleVideo = useCallback(() => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsVideoPaused(false);
        } else {
            videoRef.current.pause();
            setIsVideoPaused(true);
        }
    }, []);

    // 次の画像へ
    const nextImage = useCallback(() => {
        setSlideDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        // スライド切り替え時に動画状態をリセット
        setIsVideoPaused(false);
        setVideoEnded(false);
    }, [totalSlides]);

    // 前の画像へ
    const prevImage = useCallback(() => {
        setSlideDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
        // スライド切り替え時に動画状態をリセット
        setIsVideoPaused(false);
        setVideoEnded(false);
    }, [totalSlides]);

    // 手動操作時のタイマーリセット
    const handleManualNavigation = useCallback((direction) => {
        setIsAutoPlaying(false);
        if (direction === 'next') nextImage();
        else prevImage();
        // 動画が終了済み or 動画なしの場合のみ自動再生を再開
        if (!hasVideo || videoEnded) {
            setTimeout(() => setIsAutoPlaying(true), 10);
        }
    }, [nextImage, prevImage, hasVideo, videoEnded]);

    // 動画の再生終了時
    const handleVideoEnded = useCallback(() => {
        setVideoEnded(true);
        setIsVideoPaused(false);
        // 次のスライド（最初の画像）に進む
        setSlideDirection(1);
        setCurrentIndex(1);
        // 自動再生を開始
        setIsAutoPlaying(true);
    }, []);

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
        } else if (Math.abs(dragDistance) < 5 && isVideoSlide) {
            // クリック（ドラッグ距離が小さい）かつ動画スライドの場合 → 再生/一時停止
            toggleVideo();
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
        enter: (direction) => ({ opacity: 0, x: direction * 100 }),
        center: { opacity: 1, x: 0 },
        exit: (direction) => ({ opacity: 0, x: direction * -100 }),
    };

    // 現在のスライドに対応する画像のインデックスを取得
    const getImageIndex = (slideIndex) => {
        return hasVideo ? slideIndex - 1 : slideIndex;
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
            <AnimatePresence initial={false} mode='wait' custom={slideDirection}>
                {isVideoSlide ? (
                    <motion.div
                        key="video-slide"
                        className="absolute inset-0 w-full h-full"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={slideDirection}
                        transition={{ duration: 0.4 }}
                    >
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            playsInline
                            onEnded={handleVideoEnded}
                        />
                        {/* 再生/一時停止ボタンオーバーレイ */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isVideoPaused ? 'opacity-100 bg-black/40' : 'opacity-0 hover:opacity-100'}`}>
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleVideo(); }}
                                className="bg-black/60 text-neon-pink p-4 rounded-full border border-neon-blue backdrop-blur-sm transform hover:scale-110 transition-transform"
                            >
                                {isVideoPaused ? (
                                    <Play size={48} fill="currentColor" />
                                ) : (
                                    <Pause size={48} fill="currentColor" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.img
                        key={currentIndex}
                        src={images[getImageIndex(currentIndex)]}
                        alt={`Slide ${currentIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={slideDirection}
                        transition={{ duration: 0.4 }}
                        draggable={false}
                    />
                )}
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
                {Array.from({ length: totalSlides }).map((_, idx) => (
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
