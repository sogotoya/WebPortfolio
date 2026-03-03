import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';

const AudioPermissionModal = ({ language }) => {
    const { hasAnsweredModal, setAudioPermission } = useAudio();

    if (hasAnsweredModal) return null;

    const content = {
        ja: {
            title: 'システム音声の許可',
            desc: 'より没入感のある体験のため、\n音声の再生を許可しますか？',
            yes: '許可する',
            no: 'ミュートで進む',
            allowDesc: '(動画再生時に音声が流れます)',
            muteDesc: '(動画は常に無音で再生されます)'
        },
        en: {
            title: 'Enable System Audio',
            desc: 'Would you like to enable audio\nfor a more immersive experience?',
            yes: 'Allow',
            no: 'Mute',
            allowDesc: '(Audio will play during videos)',
            muteDesc: '(Videos will remain muted)'
        }
    };

    const text = content[language] || content.ja;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none"></div>

                <motion.div
                    className="relative bg-cyber-gray border border-neon-blue p-8 rounded-sm max-w-sm w-full shadow-[0_0_20px_rgba(0,243,255,0.2)]"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-pink z-10"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-pink z-10"></div>

                    <div className="flex flex-col items-center text-center relative z-20">
                        <div className="w-16 h-16 rounded-full bg-dark-bg border border-gray-600 flex items-center justify-center mb-6 shadow-inner">
                            <Volume2 className="text-neon-blue w-8 h-8" />
                        </div>

                        <h2 className="text-xl font-orbitron font-bold text-white mb-3">{text.title}</h2>

                        <p className="text-gray-300 text-sm mb-8 whitespace-pre-line font-rajdhani leading-relaxed">
                            {text.desc}
                        </p>

                        <div className="flex flex-col gap-3 w-full">
                            <button
                                onClick={() => setAudioPermission(true)}
                                className="group relative w-full flex flex-col items-center justify-center p-3 bg-neon-blue text-black font-bold font-rajdhani hover:bg-white transition-colors duration-200"
                            >
                                <div className="flex items-center gap-2">
                                    <Volume2 size={18} />
                                    <span className="tracking-wider">{text.yes}</span>
                                </div>
                                <span className="text-[10px] opacity-70 mt-1">{text.allowDesc}</span>
                            </button>

                            <button
                                onClick={() => setAudioPermission(false)}
                                className="group relative w-full flex flex-col items-center justify-center p-3 border border-gray-600 bg-dark-bg text-gray-300 font-bold font-rajdhani hover:border-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <div className="flex items-center gap-2">
                                    <VolumeX size={18} />
                                    <span className="tracking-wider">{text.no}</span>
                                </div>
                                <span className="text-[10px] text-gray-500 group-hover:text-gray-400 mt-1 transition-colors">{text.muteDesc}</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AudioPermissionModal;
