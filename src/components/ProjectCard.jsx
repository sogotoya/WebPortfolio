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

    // コンポーネントアンマウント時にタイマーをクリア
    useEffect(() => {
        return () => {
            if (imageTimerRef.current) {
                clearInterval(imageTimerRef.current);
            }
        };
    }, []);

    return (
        <Link to={`/project/${project.id}`}>
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
                    <img
                        src={(() => {
                            const img = project.imageUrls[isHovered && !project.videoUrl ? hoverImageIndex : (project.thumbnailIndex ?? project.imageUrls.length - 1)];
                            return typeof img === 'string' ? img : img.url;
                        })()}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isHovered && project.videoUrl ? 'opacity-0' : 'opacity-100'} ${(() => {
                            const img = project.imageUrls[isHovered && !project.videoUrl ? hoverImageIndex : (project.thumbnailIndex ?? project.imageUrls.length - 1)];
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
