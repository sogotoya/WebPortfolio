import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ===== スワイプ検知フック =====
const useSwipe = (onSwipeLeft, onSwipeRight, threshold = 50) => {
    const startX = useRef(0);
    const isDragging = useRef(false);
    const containerRef = useRef(null);

    const handleStart = useCallback((clientX) => {
        startX.current = clientX;
        isDragging.current = true;
    }, []);

    const handleEnd = useCallback((clientX) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const diff = clientX - startX.current;
        if (diff < -threshold) onSwipeLeft();
        else if (diff > threshold) onSwipeRight();
    }, [onSwipeLeft, onSwipeRight, threshold]);

    const onMouseDown = useCallback((e) => { e.preventDefault(); handleStart(e.clientX); }, [handleStart]);
    const onMouseUp = useCallback((e) => handleEnd(e.clientX), [handleEnd]);
    const onMouseLeave = useCallback(() => { isDragging.current = false; }, []);
    const onTouchStart = useCallback((e) => handleStart(e.touches[0].clientX), [handleStart]);
    const onTouchEnd = useCallback((e) => handleEnd(e.changedTouches[0].clientX), [handleEnd]);

    return { containerRef, onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd };
};

// ===== スマホ判定フック =====
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
};

// ===== 画像カルーセル（スワイプ対応） =====
const ImageCarouselSwipeable = ({ imageUrls, title }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(1); // 1: next(右から), -1: prev(左から)

    // スライドアニメーションの方向（ImageCarousel.jsxと同じパターン）
    const variants = {
        enter: (direction) => ({ opacity: 0, x: direction * 100 }),
        center: { opacity: 1, x: 0 },
        exit: (direction) => ({ opacity: 0, x: direction * -100 }),
    };

    const handleNext = useCallback(() => {
        setSlideDirection(1);
        setImageIndex((prev) => (prev + 1) % imageUrls.length);
    }, [imageUrls.length]);

    const handlePrev = useCallback(() => {
        setSlideDirection(-1);
        setImageIndex((prev) => prev === 0 ? imageUrls.length - 1 : prev - 1);
    }, [imageUrls.length]);

    const swipeHandlers = useSwipe(handleNext, handlePrev);

    if (!imageUrls || imageUrls.length === 0) return null;

    return (
        <div
            className="relative aspect-video bg-black/60 select-none cursor-grab active:cursor-grabbing"
            {...swipeHandlers}
        >
            <AnimatePresence initial={false} mode="wait" custom={slideDirection}>
                <motion.img
                    key={imageIndex}
                    src={imageUrls[imageIndex]}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={slideDirection}
                    transition={{ duration: 0.4 }}
                    draggable={false}
                />
            </AnimatePresence>

            {/* カウンター */}
            <div className="absolute top-2 right-2 text-[10px] font-orbitron text-gray-400 bg-black/60 px-2 py-1 border border-gray-700 z-10">
                {String(imageIndex + 1).padStart(2, '0')} / {String(imageUrls.length).padStart(2, '0')}
            </div>

            {/* 矢印ボタン（PC表示のみ） */}
            {imageUrls.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                                   w-8 h-8 hidden md:flex items-center justify-center
                                   bg-black/60 hover:bg-black/80 border border-gray-700
                                   hover:border-neon-blue text-gray-400 hover:text-neon-blue
                                   transition-all duration-200 backdrop-blur-sm cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                                   w-8 h-8 hidden md:flex items-center justify-center
                                   bg-black/60 hover:bg-black/80 border border-gray-700
                                   hover:border-neon-blue text-gray-400 hover:text-neon-blue
                                   transition-all duration-200 backdrop-blur-sm cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </>
            )}

            {/* スワイプヒント（モバイルのみ） */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 md:hidden">
                {imageUrls.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === imageIndex ? 'bg-neon-blue w-3' : 'bg-gray-600'
                            }`}
                    />
                ))}
            </div>

            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>
    );
};

// ===== スマホ版：アコーディオン付きリストアイテム =====
const MobileListItem = ({ item, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasImages = item.imageUrls && item.imageUrls.length > 0;

    return (
        <div className="border border-gray-700/50 bg-black/40 overflow-hidden">
            {/* ヘッダー：タップで展開/閉じ */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center gap-3 px-3 py-3 cursor-pointer
                           transition-all duration-200 active:bg-neon-blue/10"
            >
                {/* サムネイル */}
                {hasImages ? (
                    <div className="w-12 h-12 flex-shrink-0 border border-gray-700 overflow-hidden rounded-sm">
                        <img src={item.imageUrls[0]} alt={item.title}
                            className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="w-12 h-12 flex-shrink-0 border border-gray-700 bg-black/30
                                    flex items-center justify-center rounded-sm">
                        <span className="text-[10px] font-orbitron text-gray-600">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>
                )}

                {/* タイトル + タグ */}
                <div className="flex-1 min-w-0 text-left">
                    <div className="text-sm font-orbitron text-gray-200 truncate tracking-wide">
                        {item.title}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {item.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 border border-gray-600 text-gray-500 rounded-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 展開矢印 */}
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-neon-blue flex-shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </motion.div>
            </button>

            {/* アコーディオン展開部分：画像カルーセル */}
            <AnimatePresence initial={false}>
                {isExpanded && hasImages && (
                    <motion.div
                        key="mobile-images"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden border-t border-gray-700/50"
                    >
                        <ImageCarouselSwipeable imageUrls={item.imageUrls} title={item.title} />
                        {/* 説明テキスト */}
                        <div className="px-3 py-2 bg-black/40">
                            <p className="text-xs text-gray-500 font-rajdhani">{item.description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ===== メインコンポーネント =====
const GameJamMonitor = ({ items }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const isMobile = useIsMobile();

    const selectedItem = items[selectedIndex] || null;
    const hasImages = selectedItem && selectedItem.imageUrls && selectedItem.imageUrls.length > 0;

    // 背景ジャック
    const activeBackgroundItem = hoveredIndex !== null ? items[hoveredIndex] : selectedItem;
    const backgroundImageUrl = activeBackgroundItem
        ? (activeBackgroundItem.backgroundUrl || (activeBackgroundItem.imageUrls && activeBackgroundItem.imageUrls[0]) || null)
        : null;

    const handleSelectItem = (index) => {
        setSelectedIndex(index);
    };

    if (!items || items.length === 0) {
        return (
            <div className="text-center py-12 border border-gray-800 bg-cyber-gray/50">
                <p className="text-gray-500 font-rajdhani tracking-widest text-sm">COMING SOON...</p>
            </div>
        );
    }

    // ===== スマホ版 =====
    if (isMobile) {
        return (
            <div className="flex flex-col gap-2">
                <div className="text-[10px] font-orbitron text-gray-500 tracking-[0.3em] px-1 mb-1">
                    GAME JAM ENTRIES
                </div>
                {items.map((item, index) => (
                    <MobileListItem key={item.id} item={item} index={index} />
                ))}
            </div>
        );
    }

    // ===== PC版 =====
    return (
        <div className="relative overflow-hidden rounded-sm border border-gray-800">
            {/* 背景ジャック */}
            <AnimatePresence mode="wait">
                {backgroundImageUrl && (
                    <motion.div
                        key={backgroundImageUrl}
                        className="absolute inset-0 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src={backgroundImageUrl} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute inset-0 z-[1] bg-black/70 backdrop-blur-[2px]" />

            <AnimatePresence>
                {hoveredIndex !== null && (
                    <motion.div
                        className="absolute inset-0 z-[2] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ background: 'radial-gradient(ellipse at center, rgba(0,243,255,0.05) 0%, transparent 70%)' }}
                    />
                )}
            </AnimatePresence>

            {/* メインコンテンツ */}
            <div className="relative z-10 flex flex-row gap-4 p-4">
                {/* 左側：ゲームリスト */}
                <div className="w-[30%] flex flex-col gap-1">
                    <div className="text-[10px] font-orbitron text-gray-500 tracking-[0.3em] mb-2 px-1">
                        SELECT ENTRY
                    </div>
                    {items.map((item, index) => {
                        const isActive = index === selectedIndex;
                        const isHovered = index === hoveredIndex;
                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => handleSelectItem(index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.15 }}
                                className={`
                                    w-full text-left px-4 py-3 border transition-all duration-200 cursor-pointer
                                    relative overflow-hidden group
                                    ${isActive
                                        ? 'border-neon-blue/70 bg-neon-blue/15 text-neon-blue'
                                        : isHovered
                                            ? 'border-neon-blue/40 bg-neon-blue/5 text-gray-200'
                                            : 'border-gray-700/50 bg-black/40 text-gray-400 hover:text-gray-200'
                                    }
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="gamejam-indicator"
                                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-neon-blue"
                                        style={{ boxShadow: '0 0 8px rgba(0, 243, 255, 0.6)' }}
                                    />
                                )}
                                <div className="flex items-center gap-3">
                                    {item.imageUrls && item.imageUrls.length > 0 ? (
                                        <div className="w-10 h-10 flex-shrink-0 border border-gray-700 overflow-hidden">
                                            <img src={item.imageUrls[0]} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <span className={`text-[10px] font-orbitron w-10 h-10 flex items-center justify-center
                                            border border-gray-700 bg-black/30 ${isActive ? 'text-neon-blue' : 'text-gray-600'}`}>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-sm font-orbitron truncate tracking-wide
                                            ${isActive ? 'text-neon-blue' : 'text-gray-300 group-hover:text-white'}`}>
                                            {item.title}
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {item.technologies.slice(0, 3).map((tech, i) => (
                                                <span key={i} className={`text-[9px] px-1.5 py-0.5 border rounded-sm
                                                    ${isActive ? 'border-neon-blue/40 text-neon-blue/80' : 'border-gray-600 text-gray-500'}`}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* 右側：プレビューモニター */}
                <div className="w-[70%]">
                    <div className="relative border border-gray-700/60 bg-black/50 overflow-hidden">
                        {/* モニター上部バー */}
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700/50 bg-black/50">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse-slow"
                                    style={{ boxShadow: '0 0 6px rgba(0, 243, 255, 0.5)' }} />
                                <span className="text-[10px] font-orbitron text-gray-500 tracking-[0.2em]">
                                    PREVIEW MONITOR
                                </span>
                            </div>
                        </div>

                        {/* サイバー装飾 */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-blue z-10" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-blue z-10" />

                        {/* メイン表示エリア（スワイプ対応カルーセル） */}
                        {hasImages ? (
                            <ImageCarouselSwipeable imageUrls={selectedItem.imageUrls} title={selectedItem.title} />
                        ) : (
                            <div className="relative aspect-video bg-black/60 flex flex-col items-center justify-center">
                                <div className="absolute inset-0 pointer-events-none"
                                    style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,243,255,0.03) 2px, rgba(0,243,255,0.03) 4px)' }} />
                                <div className="text-neon-blue/30 font-orbitron text-2xl md:text-3xl tracking-[0.5em] mb-2">NO DATA</div>
                                <div className="text-gray-600 font-rajdhani text-xs tracking-widest">AWAITING IMAGE INPUT</div>
                            </div>
                        )}

                        {/* モニター下部 */}
                        {activeBackgroundItem && (
                            <div className="px-4 py-3 border-t border-gray-700/50 bg-black/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-orbitron font-bold text-white tracking-wide">
                                            {activeBackgroundItem.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5 font-rajdhani">
                                            {activeBackgroundItem.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {activeBackgroundItem.technologies.map((tech, i) => (
                                            <span key={i} className="text-[10px] text-neon-blue bg-black/60 px-2 py-1 border border-neon-blue/30 rounded-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameJamMonitor;
