import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, isHero = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverImageIndex, setHoverImageIndex] = useState(0);
    const videoRef = useRef(null);
    const imageTimerRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log('Video play failed', e));
        }
        // 動画がない場合、画像の自動切り替えを開始
        if (!project.videoUrl && project.imageUrls.length > 1) {
            setHoverImageIndex(0);
            imageTimerRef.current = setInterval(() => {
                setHoverImageIndex((prevIndex) => (prevIndex + 1) % project.imageUrls.length);
            }, 1500);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        // 画像切り替えタイマーをクリア
        if (imageTimerRef.current) {
            clearInterval(imageTimerRef.current);
            imageTimerRef.current = null;
        }
        setHoverImageIndex(0);
    };

    // 特殊なサムネイル切り替え：訪問回数ベース（確実に交互になる）
    const getVisitCount = () => {
        if (!project.alternatingThumbnail) return 0;
        return parseInt(sessionStorage.getItem(`visitCount_${project.id}`) || "0", 10);
    };
    const altIndex = project.alternatingThumbnail ? getVisitCount() % project.imageUrls.length : 0;

    const handleCardClick = () => {
        // スクロール位置をクリック時に確実に保存
        sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());

        // 訪問回数をインクリメント（次回Home表示時にサムネが切り替わる）
        if (project.alternatingThumbnail) {
            const count = getVisitCount();
            sessionStorage.setItem(`visitCount_${project.id}`, (count + 1).toString());
        }
    };

    // コンポーネントアンマウント時にタイマーをクリア
    useEffect(() => {
        return () => {
            if (imageTimerRef.current) {
                clearInterval(imageTimerRef.current);
            }
        };
    }, []);

    return (
        <Link to={`/project/${project.id}`} onClick={handleCardClick}>
            <motion.div
                className="relative bg-cyber-gray border border-gray-800 overflow-hidden group cursor-pointer"
                whileHover={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, mass: 2 }} // Heavy feel
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Cyber Border Decorations */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-blue z-20"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-blue z-20"></div>

                {/* Content Container */}
                <div className="relative aspect-video">
                    {/* Badges */}
                    <div className="absolute top-2 left-2 z-30 flex flex-col items-start gap-1.5 pointer-events-none">
                        {project.isFeatured && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-orbitron font-bold tracking-widest bg-purple-900/80 text-purple-200 border border-purple-500/50 backdrop-blur-sm shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                                <span className="text-purple-400 text-xs">★</span> 注目作品</span>
                        )}
                        {project.isNew && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-widest bg-pink-900/80 text-pink-100 border border-pink-500/60 backdrop-blur-sm shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                                <span className="text-pink-400 text-xs">▶</span> 最新作</span>
                        )}
                        {project.status?.awards && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider bg-yellow-900/80 text-yellow-100 border border-yellow-500/60 backdrop-blur-sm shadow-[0_0_8px_rgba(234,179,8,0.4)] whitespace-nowrap">
                                <span className="text-yellow-400 text-xs">🏆</span> {project.status.awards}
                            </span>
                        )}
                    </div>
                    {/* Image / Video */}
                    {project.videoUrl && (
                        <video
                            ref={videoRef}
                            src={project.videoUrl}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                            loop
                            muted={true}
                            playsInline
                        />
                    )}
                    <img loading="lazy" decoding="async"
                        src={(() => {
                            if (!project.imageUrls || project.imageUrls.length === 0) return '';
                            let index = isHovered && !project.videoUrl ? hoverImageIndex : (project.thumbnailIndex ?? project.imageUrls.length - 1);
                            // 特殊切り替え対象かつ非ホバー時は sessionStorage のインデックスを優先
                            if (project.alternatingThumbnail && !isHovered) {
                                index = altIndex;
                            }
                            // インデックスの境界チェック
                            const safeIndex = Math.max(0, Math.min(index, project.imageUrls.length - 1));
                            const img = project.imageUrls[safeIndex];
                            return typeof img === 'string' ? img : img.url;
                        })()}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isHovered && project.videoUrl ? 'opacity-0' : 'opacity-100'} ${(() => {
                            if (!project.imageUrls || project.imageUrls.length === 0) return 'object-cover';
                            let index = isHovered && !project.videoUrl ? hoverImageIndex : (project.thumbnailIndex ?? project.imageUrls.length - 1);
                            if (project.alternatingThumbnail && !isHovered) {
                                index = altIndex;
                            }
                            const safeIndex = Math.max(0, Math.min(index, project.imageUrls.length - 1));
                            const img = project.imageUrls[safeIndex];
                            return typeof img === 'object' && img.fit === 'contain' ? 'object-contain' : 'object-cover';
                        })()}`}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60"></div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                        <h3 className={`${isHero ? 'text-3xl md:text-4xl' : 'text-xl'} font-orbitron font-bold text-white mb-1 group-hover:text-neon-pink transition-colors`}>
                            {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, isHero ? 5 : 3).map((tech, index) => (
                                <span key={index} className="text-xs text-neon-blue bg-dark-bg/80 px-2 py-1 border border-neon-blue/30 rounded-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Glitch Effect on Hover (Optional Overlay) */}
                {isHovered && (
                    <div className="absolute inset-0 bg-neon-blue/5 mix-blend-overlay pointer-events-none"></div>
                )}
            </motion.div>
        </Link>
    );
};

export default ProjectCard;
