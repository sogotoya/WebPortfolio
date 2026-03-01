import React from 'react';
import { motion } from 'framer-motion';

const AxisSaveDiagram = ({ language = 'ja' }) => {
    const t = {
        ja: {
            title: '責務分離アーキテクチャ',
            cinematic: 'CinematicManager',
            cinematicDesc: '演出処理（カメラ、UI、タイミング）',
            player: 'PlayerController',
            playerDesc: '入力処理・物理演算',
            playerDesc2: '（演出ロジックを持たない）',
            lock: '状態制御API呼び出し\n( SetEventLock / SetInvincible )',
            physicsWait: '物理干渉の停止処理\n・FixedUpdateの早期return\n・Physics.IgnoreLayerCollision',
            asyncControl: 'UniTaskによる\nフレーム同期・時間制御',
            conclusion: '演出は外部制御とし、ゲームロジックと直接結合させない構造を採用'
        },
        en: {
            title: 'Separation of Responsibilities',
            cinematic: 'CinematicManager',
            cinematicDesc: 'Presentation (Camera, UI, Timing)',
            player: 'PlayerController',
            playerDesc: 'Input Processing & Physics',
            playerDesc2: '(No presentation logic)',
            lock: 'State Control API Call\n( SetEventLock / SetInvincible )',
            physicsWait: 'Physics Suspension\n・Early return in FixedUpdate\n・Physics.IgnoreLayerCollision',
            asyncControl: 'Frame & Time Sync\nvia UniTask',
            conclusion: 'Adopts a structure where presentation is externally controlled and not directly coupled with game logic.'
        }
    };
    const content = t[language] || t.ja;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full bg-black/40 border border-gray-800 p-6 md:p-8 rounded-lg my-10 overflow-hidden relative font-rajdhani"
        >
            {/* Background glowing elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-neon-pink/5 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon-blue/5 blur-[60px] rounded-full pointer-events-none"></div>

            <h3 className="text-neon-blue text-2xl mb-10 font-orbitron font-bold text-center tracking-widest uppercase relative z-10">
                {content.title}
                <div className="h-0.5 w-24 bg-neon-blue/50 mx-auto mt-3"></div>
            </h3>

            <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-4xl mx-auto gap-4 md:gap-6 relative z-10">
                {/* CinematicManager */}
                <div className="flex-1 flex flex-col border border-neon-pink/40 hover:border-neon-pink bg-gradient-to-br from-neon-pink/5 to-transparent p-6 rounded-md relative group transition-all duration-300">
                    <div className="absolute -top-3 left-4 bg-dark-bg px-3 text-neon-pink text-xs font-bold font-orbitron tracking-wider">Presentation</div>
                    <h4 className="text-white text-xl font-bold mb-3 font-orbitron text-center">{content.cinematic}</h4>
                    <p className="text-gray-300 text-sm text-center mb-6 flex-grow leading-relaxed">
                        {content.cinematicDesc}
                    </p>
                    <div className="bg-gray-900/80 border border-gray-700/50 rounded py-3 px-4 text-center text-xs text-gray-300 mt-auto shadow-inner">
                        <span className="text-neon-pink block mb-2 font-bold tracking-wider">■ {language === 'en' ? 'Sequence Control' : 'シーケンス制御'}</span>
                        <span className="whitespace-pre-line leading-relaxed">{content.asyncControl}</span>
                    </div>
                </div>

                {/* Arrow & State Control */}
                <div className="flex flex-col items-center justify-center py-4 md:py-0 shrink-0 md:min-w-[140px] z-20">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="text-neon-pink text-[12px] font-bold mb-2 text-center whitespace-pre-line bg-gray-900/90 px-3 py-2 rounded border border-gray-700 shadow-[0_0_15px_rgba(255,42,109,0.2)]"
                    >
                        {content.lock}
                    </motion.div>
                    <div className="flex flex-col md:flex-row items-center w-full justify-center">
                        {/* Horizontal Arrow Setup for Desktop */}
                        <div className="hidden md:flex items-center w-full">
                            <div className="h-[2px] w-full bg-gradient-to-r from-neon-pink to-neon-blue"></div>
                            <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-neon-blue ml-[-2px]"></div>
                        </div>
                        {/* Vertical Arrow Setup for Mobile */}
                        <div className="flex md:hidden flex-col items-center h-full">
                            <div className="w-[2px] h-10 bg-gradient-to-b from-neon-pink to-neon-blue"></div>
                            <div className="w-0 h-0 border-x-[6px] border-x-transparent border-t-[10px] border-t-neon-blue mt-[-2px]"></div>
                        </div>
                    </div>
                </div>

                {/* PlayerController */}
                <div className="flex-1 flex flex-col border border-neon-blue/40 hover:border-neon-blue bg-gradient-to-bl from-neon-blue/5 to-transparent p-6 rounded-md relative group transition-all duration-300">
                    <div className="absolute -top-3 left-4 bg-dark-bg px-3 text-neon-blue text-xs font-bold font-orbitron tracking-wider">Game Logic</div>
                    <h4 className="text-white text-xl font-bold mb-3 font-orbitron text-center">{content.player}</h4>
                    <p className="text-gray-300 text-sm text-center mb-1 flex-grow leading-relaxed">
                        {content.playerDesc}
                    </p>
                    <p className="text-neon-pink/80 text-xs text-center mb-6 font-bold tracking-wide">
                        {content.playerDesc2}
                    </p>
                    <div className="bg-gray-900/80 border border-red-500/20 rounded py-3 px-4 text-center text-xs text-gray-300 mt-auto shadow-inner">
                        <span className="text-red-400 block mb-2 font-bold tracking-wider">■ {language === 'en' ? 'Interference Prevention' : '干渉防止処理'}</span>
                        <span className="whitespace-pre-line leading-relaxed">{content.physicsWait}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center relative z-10 w-full">
                <p className="inline-block text-gray-300 text-sm md:text-base border-l-[3px] border-neon-blue pl-4 py-1 italic">
                    {content.conclusion}
                </p>
            </div>

        </motion.div>
    );
};

export default AxisSaveDiagram;
