import React from 'react';
import { motion } from 'framer-motion';
import AudioPermissionModal from './AudioPermissionModal';
import { Twitter, Github, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudio } from '../contexts/AudioContext';
import AudioPermissionModal from './AudioPermissionModal';

const Layout = ({ children, backgroundImage }) => {
    const { language, toggleLanguage } = useLanguage();
    const { isAudioEnabled, toggleAudio } = useAudio();

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
                    <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
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

                {/* Right: Language & Audio Toggle */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1 text-sm font-orbitron font-bold tracking-wider transition-colors"
                    >
                        <span className={language === 'ja' ? 'text-neon-blue' : 'text-gray-500'}>JP</span>
                        <span className="text-gray-600">/</span>
                        <span className={language === 'en' ? 'text-neon-blue' : 'text-gray-500'}>EN</span>
                    </button>

                    <button
                        onClick={toggleAudio}
                        className={`transition-colors duration-200 ${isAudioEnabled ? 'text-neon-blue hover:text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        title={isAudioEnabled ? (language === 'ja' ? '音声をオフにする' : 'Mute Audio') : (language === 'ja' ? '音声をオンにする' : 'Enable Audio')}
                    >
                        {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>
                </div>
            </nav>

            <AudioPermissionModal language={language} />

            {/* Main Content */}
            <main className="relative z-10 px-4 pb-8 max-w-7xl mx-auto">
                <AudioPermissionModal language={language} />
                {children}
            </main>
        </div>
    );
};

export default Layout;
