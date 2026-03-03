import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="mt-10">
            {/* Header / Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{
                    scale: isHovered ? 1.02 : 1,
                    boxShadow: isHovered
                        ? '0 0 20px rgba(0, 243, 255, 0.3), 0 0 40px rgba(0, 243, 255, 0.1), inset 0 0 20px rgba(0, 243, 255, 0.05)'
                        : '0 0 0px rgba(0, 243, 255, 0)',
                    backgroundColor: isHovered ? 'rgba(0, 243, 255, 0.08)' : 'rgba(26, 26, 26, 1)',
                    borderColor: isHovered ? 'rgba(0, 243, 255, 0.7)' : 'rgba(55, 55, 55, 1)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex items-center justify-between group cursor-pointer
                           border px-6 py-5 relative overflow-hidden"
            >
                {/* Hover glow sweep effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                        background: isHovered
                            ? 'linear-gradient(90deg, transparent 0%, rgba(0, 243, 255, 0.06) 50%, transparent 100%)'
                            : 'transparent',
                    }}
                    transition={{ duration: 0.4 }}
                />

                {/* Left: Decorative line + Title */}
                <div className="flex items-center gap-4 relative z-10">
                    {/* Decorative line — glows on hover */}
                    <motion.div
                        animate={{
                            width: isHovered ? 48 : 32,
                            boxShadow: isHovered
                                ? '0 0 8px rgba(0, 243, 255, 0.8)'
                                : '0 0 0px rgba(0, 243, 255, 0)',
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-[2px] bg-gradient-to-r from-neon-blue to-transparent"
                    />
                    <motion.h2
                        animate={{
                            color: isHovered ? '#00f3ff' : '#d1d5db',
                            textShadow: isHovered
                                ? '0 0 10px rgba(0, 243, 255, 0.5)'
                                : '0 0 0px rgba(0, 243, 255, 0)',
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-lg md:text-xl font-orbitron font-bold tracking-wider"
                    >
                        {title}
                    </motion.h2>
                </div>

                {/* Right: Arrow icon */}
                <motion.div
                    animate={{
                        rotate: isOpen ? 180 : 0,
                        scale: isHovered ? 1.3 : 1,
                        filter: isHovered
                            ? 'drop-shadow(0 0 6px rgba(0, 243, 255, 0.8))'
                            : 'drop-shadow(0 0 0px rgba(0, 243, 255, 0))',
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-neon-blue relative z-10"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </motion.div>
            </motion.button>

            {/* Collapsible Content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 pb-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CollapsibleSection;
