import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VRChatWorldMonitor = ({ items, onItemSelect }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (index) => {
        setActiveIndex(index);
        if (onItemSelect) onItemSelect(index);
    };

    return (
        <div className="flex flex-col h-[500px] border border-gray-800 bg-black/60 relative overflow-hidden">
            {/* Edge Decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-blue z-20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-blue z-20"></div>

            <div className="flex h-full">
                {/* Left Side: List */}
                <div className="w-1/3 border-r border-gray-800 flex flex-col items-stretch overflow-y-auto custom-scrollbar bg-black/40">
                    {items.map((item, index) => (
                        <button
                            key={item.id}
                            className={`p-4 text-left border-b border-gray-800 transition-all duration-300 relative group
                                ${index === activeIndex
                                    ? 'bg-neon-blue/10 border-l-2 border-l-neon-blue'
                                    : 'hover:bg-gray-900 border-l-2 border-l-transparent text-gray-500 hover:text-gray-300'
                                }`}
                            onClick={() => handleSelect(index)}
                        >
                            {/* Hover effect background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                            <span className={`text-sm font-Rajdhani tracking-wider block relative z-10 transition-colors duration-300
                                ${index === activeIndex ? 'text-neon-blue font-bold' : ''}`}>
                                {item.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Right Side: Preview */}
                <div className="w-2/3 h-full relative bg-dark-bg p-4 flex flex-col">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col h-full"
                        >
                            {/* Image Container */}
                            <div className="relative flex-1 mb-4 border border-gray-800 overflow-hidden bg-black/80 rounded-sm">
                                {/* CRT Scanline Effect Overlay */}
                                <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-30"></div>

                                <img
                                    src={items[activeIndex].imageUrls[0]}
                                    alt={items[activeIndex].title}
                                    className="w-full h-full object-cover opacity-90"
                                />

                                {/* Subtle glow on image edges */}
                                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-10"></div>
                            </div>

                            {/* Description Container */}
                            <div className="h-1/3 bg-black/40 border border-gray-800 p-4 border-l-2 border-l-neon-pink overflow-y-auto custom-scrollbar relative">
                                <h3 className="text-lg font-orbitron font-bold text-gray-200 mb-2 tracking-wider">
                                    {items[activeIndex].title}
                                </h3>
                                <p className="text-sm text-gray-400 font-rajdhani whitespace-pre-wrap leading-relaxed">
                                    {items[activeIndex].description}
                                </p>

                                {/* Links (if available) */}
                                {(items[activeIndex].githubUrl || items[activeIndex].downloadUrl) && (
                                    <div className="mt-4 pt-4 border-t border-gray-800 flex gap-4">
                                        {items[activeIndex].downloadUrl && (
                                            <a href={items[activeIndex].downloadUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-orbitron text-neon-blue hover:text-neon-pink transition-colors tracking-widest uppercase items-center gap-1 flex">
                                                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue inline-block"></span>
                                                Visit World
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default VRChatWorldMonitor;
