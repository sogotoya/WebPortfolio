import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Minimize, Volume2, VolumeX } from 'lucide-react';

const ImageCarousel = ({ images = [], videoUrl, autoPlayInterval = 3000, initialImageIndex = 0 }) => {
    // 動画がある場合、スライド配列の先頭に動画を挿入
    const hasVideo = videoUrl && videoUrl.length > 0 && !videoUrl.startsWith('http');
    const totalSlides = hasVideo ? images.length + 1 : images.length;

    // 初期インデックスの設定（動画がある場合は+1する、ただし動画を優先する場合はそのまま0など調整が必要）
    // ユーザーの要望「クリックしたら1を表示」に合わせるため、画像インデックスを考慮
    const [currentIndex, setCurrentIndex] = useState(() => {
        return hasVideo ? initialImageIndex + 1 : initialImageIndex;
    });
    // 現在のスライドが動画かどうか
    const isVideoSlide = hasVideo && currentIndex === 0;

    // 動画がある場合は自動再生OFF、動画が終わってからON
    const [isAutoPlaying, setIsAutoPlaying] = useState(!hasVideo);
    const [slideDirection, setSlideDirection] = useState(1); // 1: next, -1: prev
    const [videoEnded, setVideoEnded] = useState(false);
    const [isVideoPaused, setIsVideoPaused] = useState(false); // 自動再生: 最初から再生状態にする
    const [isFullscreen, setIsFullscreen] = useState(false); // フルスクリーン状態

    // 音量コントロール用
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    // シークバー用
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = useCallback((e) => {
        e.stopPropagation();
        const time = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, []);

    // 時間フォーマット (00:00)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // ボリューム変更処理
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.muted = isMuted;
        }
    }, [volume, isMuted, isVideoSlide]);

    const handleVolumeChange = useCallback((e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }, []);

    const toggleMute = useCallback((e) => {
        e.stopPropagation();
        if (isMuted) {
            setIsMuted(false);
            if (volume === 0) setVolume(1);
        } else {
            setIsMuted(true);
        }
    }, [isMuted, volume]);

    // マウスドラッグ用ローカル変数
    const dragStartX = useRef(0);
    const isDragging = useRef(false);
    const containerRef = useRef(null);
    const videoRef = useRef(null);

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

    // フルスクリーン切り替え
    const toggleFullscreen = useCallback(() => {
        if (!videoRef.current) return;

        if (!document.fullscreenElement) {
            videoRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }, []);

    // フルスクリーン状態の監視
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // 動画の自動再生 (マウント時)
    useEffect(() => {
        if (hasVideo && videoRef.current) {
            videoRef.current.play().catch(() => {
                // ブラウザポリシーで自動再生が拒否された場合はボタンを表示
                setIsVideoPaused(true);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasVideo]);

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
                            className="w-full h-full object-cover cursor-pointer"
                            playsInline
                            onEnded={handleVideoEnded}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                        />
                        {/* 再生/一時停止ボタンオーバーレイ */}
                        <div className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${isVideoPaused ? 'bg-black/40' : 'bg-transparent'}`}>

                            {/* 中央：再生/一時停止ボタン（再生中は完全にフェードアウト） */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isVideoPaused ? 'opacity-100' : 'opacity-0'}`}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleVideo(); }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onMouseUp={(e) => e.stopPropagation()}
                                    className={`bg-black/60 text-neon-pink p-4 rounded-full border border-neon-blue backdrop-blur-sm transform hover:scale-110 transition-transform ${isVideoPaused ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                >
                                    {isVideoPaused ? (
                                        <Play size={48} className="translate-x-1" fill="currentColor" />
                                    ) : (
                                        <Pause size={48} fill="currentColor" />
                                    )}
                                </button>
                            </div>

                            {/* YouTube風コントロールバー (下部) */}
                            <div className={`pointer-events-auto absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${isVideoPaused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                
                                {/* シークバー (上段) */}
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] md:text-xs font-mono min-w-[35px] text-gray-300">{formatTime(currentTime)}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 0}
                                        step="0.1"
                                        value={currentTime}
                                        onChange={handleSeek}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onMouseUp={(e) => e.stopPropagation()}
                                        className="flex-1 custom-range cursor-pointer transition-all"
                                        style={{
                                            background: `linear-gradient(to right, #ff00ff ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%)`
                                        }}
                                    />
                                    <span className="text-[10px] md:text-xs font-mono min-w-[35px] text-gray-300">{formatTime(duration)}</span>
                                </div>

                                {/* ボタン類 (下段) */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* 音声コントロール */}
                                        <div className="flex items-center gap-2 group/volume">
                                            <button 
                                                onClick={toggleMute} 
                                                onMouseDown={(e) => e.stopPropagation()}
                                                onMouseUp={(e) => e.stopPropagation()}
                                                className="text-neon-blue hover:text-white transition-colors outline-none cursor-pointer"
                                            >
                                                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                            </button>
                                            <input
                                                type="range"
                                                min="0" max="1" step="0.05"
                                                value={isMuted ? 0 : volume}
                                                onChange={handleVolumeChange}
                                                onMouseDown={(e) => e.stopPropagation()}
                                                onMouseUp={(e) => e.stopPropagation()}
                                                className="w-0 group-hover/volume:w-20 md:group-hover/volume:w-24 transition-all duration-300 custom-range cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* 右側：フルスクリーン */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onMouseUp={(e) => e.stopPropagation()}
                                        className="text-white hover:text-neon-blue transition-colors outline-none cursor-pointer"
                                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                                    >
                                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.img
                        key={currentIndex}
                        src={typeof images[getImageIndex(currentIndex)] === 'string' ? images[getImageIndex(currentIndex)] : images[getImageIndex(currentIndex)].url}
                        alt={`Slide ${currentIndex + 1}`}
                        className={`absolute inset-0 w-full h-full pointer-events-none ${typeof images[getImageIndex(currentIndex)] === 'object' && images[getImageIndex(currentIndex)].fit === 'contain' ? 'object-contain' : 'object-cover'}`}
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
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-neon-blue hover:bg-neon-blue hover:text-black transition-colors opacity-0 group-hover:opacity-100 z-10"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); handleManualNavigation('next'); }}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
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
