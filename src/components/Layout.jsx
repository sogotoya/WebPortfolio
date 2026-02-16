import React from 'react';
import { Twitter, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Layout = ({ children }) => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="min-h-screen bg-dark-bg text-gray-200 font-rajdhani relative overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-cyber-grid opacity-20 pointer-events-none z-0"></div>
            <div className="fixed inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent pointer-events-none z-0"></div>

            {/* Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://transparenttextures.com/patterns/black-scales.png')] opacity-5 mix-blend-overlay"></div>

            {/* Navigation */}
            <nav className="relative z-20 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
                {/* Left: SNS Icons */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://x.com/hiragi_ty"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-neon-blue transition-colors"
                        title="X (Twitter)"
                    >
                        <Twitter size={22} />
                    </a>
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

                {/* Right: Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 text-sm font-orbitron font-bold tracking-wider transition-colors"
                >
                    <span className={language === 'ja' ? 'text-neon-blue' : 'text-gray-500'}>JP</span>
                    <span className="text-gray-600">/</span>
                    <span className={language === 'en' ? 'text-neon-blue' : 'text-gray-500'}>EN</span>
                </button>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 px-4 pb-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
