import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log('Video play failed', e));
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

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
                            muted
                            playsInline
                        />
                    )}
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60"></div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                        <h3 className="text-xl font-orbitron font-bold text-white mb-1 group-hover:text-neon-pink transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech, index) => (
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
