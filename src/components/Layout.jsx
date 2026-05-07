import React from 'react';
import { motion } from 'framer-motion';

import { Github } from 'lucide-react';

const Layout = ({ children, backgroundImage }) => {

    return (
        <div className="min-h-screen bg-dark-bg text-gray-200 font-rajdhani relative overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-cyber-grid opacity-20 pointer-events-none z-0"></div>
            {backgroundImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-0"
                >
                    <img loading="lazy" decoding="async" src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
                </motion.div>
            )}
            <div className="fixed inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-transparent pointer-events-none z-0"></div>

            {/* Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://transparenttextures.com/patterns/black-scales.png')] opacity-5 mix-blend-overlay"></div>

            {/* Navigation */}
            <nav className="relative z-20 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                {/* Left: SNS Icons */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/sogotoya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-neon-blue transition-colors"
                        title="GitHub"
                    >
                        <Github size={22} />
                    </a>
                </div>

            </nav>

            {/* Main Content */}
            <main className="relative z-10 px-4 pb-8 max-w-7xl mx-auto">

                {children}
            </main>
        </div>
    );
};

export default Layout;
