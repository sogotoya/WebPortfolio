import React from 'react';
import { motion } from 'framer-motion';

const PlanetariumVRDiagram = ({ language = 'ja' }) => {
    const t = {
        ja: {
            title: '責務分離と終了保証アーキテクチャ',
            input: 'Spatial Recognition',
            inputDesc: 'Vector3.Dot による視線計算',
            inputDetail: '・プレイヤーの視線方向\n・オブジェクトの座標',
            audioManager: 'Audio & Visual Controller',
            audioManagerDesc: '視線連動・空間音響制御',
            audioDetail: '・Mathf.Lerp による音量補間\n・AudioSource (Spatial Blend 1.0)',
            sequenceManager: 'Event Sequence Manager',
            sequenceManagerDesc: '音声終了をトリガーとする進行制御',
            sequenceDetail: '・WaitWhile() で音声終了を明示的に待機\n・終了保証による表示不整合の防止',
            ui: 'VR UI System',
            uiDesc: 'Quaternion.LookRotation / Time.timeフェード制御',
            conclusion: '「状態遷移の明示化」と「終了保証設計」により、進行破綻を防ぎ自然な視線誘導を実現'
        },
        en: {
            title: 'Separation of Responsibilities & Guaranteed Completion',
            input: 'Spatial Recognition',
            inputDesc: 'Gaze calculation via Vector3.Dot',
            inputDetail: '・Player gaze direction\n・Object coordinates',
            audioManager: 'Audio & Visual Controller',
            audioManagerDesc: 'Gaze-linked spatial audio control',
            audioDetail: '・Volume interpolation via Mathf.Lerp\n・AudioSource (Spatial Blend 1.0)',
            sequenceManager: 'Event Sequence Manager',
            sequenceManagerDesc: 'Audio completion triggered progression',
            sequenceDetail: '・Explicit WaitWhile() for audio completion\n・Preventing display inconsistencies via guaranteed completion',
            ui: 'VR UI System',
            uiDesc: 'Quaternion.LookRotation / Time.time fade control',
            conclusion: 'Achieves natural gaze guidance and prevents progression breakdowns via explicit state transitions and guaranteed completion design.'
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
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none"></div>

            <h3 className="text-cyan-400 text-2xl mb-10 font-orbitron font-bold text-center tracking-widest uppercase relative z-10">
                {content.title}
                <div className="h-0.5 w-24 bg-cyan-400/50 mx-auto mt-3"></div>
            </h3>

            <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-5xl mx-auto gap-4 md:gap-6 relative z-10">

                {/* 1. Gaze Recognition (Input layer) */}
                <div className="flex-1 flex flex-col border border-purple-500/40 hover:border-purple-500 bg-gradient-to-br from-purple-500/5 to-transparent p-5 rounded-md relative group transition-all duration-300">
                    <div className="absolute -top-3 left-4 bg-dark-bg px-3 text-purple-400 text-xs font-bold font-orbitron tracking-wider">Spatial Layer</div>
                    <h4 className="text-white text-lg font-bold mb-2 font-orbitron text-center">{content.input}</h4>
                    <p className="text-gray-300 text-sm text-center mb-4 flex-grow leading-relaxed">
                        {content.inputDesc}
                    </p>
                    <div className="bg-gray-900/80 border border-gray-700/50 rounded py-2 px-3 text-center text-xs text-gray-300 mt-auto shadow-inner">
                        <span className="whitespace-pre-line leading-relaxed">{content.inputDetail}</span>
                    </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center justify-center py-2 md:py-0 shrink-0 z-20">
                    <div className="text-purple-400 text-[10px] font-bold mb-1 text-center whitespace-pre-line bg-gray-900/90 px-2 py-1 rounded border border-gray-800">
                        Dot Product State
                    </div>
                    <div className="flex md:hidden flex-col items-center h-full">
                        <div className="w-[2px] h-6 bg-gradient-to-b from-purple-500 to-cyan-400"></div>
                        <div className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-cyan-400 mt-[-2px]"></div>
                    </div>
                    <div className="hidden md:flex items-center w-full">
                        <div className="h-[2px] w-6 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
                        <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-cyan-400 ml-[-2px]"></div>
                    </div>
                </div>

                {/* 2. Audio & Visual Controller (Presentation link) */}
                <div className="flex-1 flex flex-col border border-cyan-400/40 hover:border-cyan-400 bg-gradient-to-b from-cyan-400/5 to-transparent p-5 rounded-md relative group transition-all duration-300">
                    <div className="absolute -top-3 left-4 bg-dark-bg px-3 text-cyan-400 text-xs font-bold font-orbitron tracking-wider">Audio / Visual Layer</div>
                    <h4 className="text-white text-lg font-bold mb-2 font-orbitron text-center">{content.audioManager}</h4>
                    <p className="text-gray-300 text-sm text-center mb-4 flex-grow leading-relaxed">
                        {content.audioManagerDesc}
                    </p>
                    <div className="bg-gray-900/80 border border-gray-700/50 rounded py-2 px-3 text-center text-xs text-gray-300 mt-auto shadow-inner">
                        <span className="whitespace-pre-line leading-relaxed">{content.audioDetail}</span>
                    </div>

                    {/* UI Note attached below Audio node */}
                    <div className="mt-3 bg-gray-900/40 border border-cyan-700/30 rounded py-2 px-2 text-center text-[11px] text-gray-400">
                        <span className="text-cyan-500 font-bold block mb-1">{content.ui}</span>
                        {content.uiDesc}
                    </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center justify-center py-2 md:py-0 shrink-0 z-20">
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                        className="text-emerald-400 text-[10px] font-bold mb-1 text-center whitespace-pre-line bg-gray-900/90 px-2 py-1 rounded border border-emerald-900 shadow-[0_0_10px_rgba(52,211,153,0.15)]"
                    >
                        Audio Event Trigger
                    </motion.div>
                    <div className="flex md:hidden flex-col items-center h-full">
                        <div className="w-[2px] h-6 bg-gradient-to-b from-cyan-400 to-emerald-400"></div>
                        <div className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-emerald-400 mt-[-2px]"></div>
                    </div>
                    <div className="hidden md:flex items-center w-full">
                        <div className="h-[2px] w-6 bg-gradient-to-r from-cyan-400 to-emerald-400"></div>
                        <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-emerald-400 ml-[-2px]"></div>
                    </div>
                </div>

                {/* 3. Event Sequence Manager (Logic Layer) */}
                <div className="flex-1 flex flex-col border border-emerald-500/40 hover:border-emerald-500 bg-gradient-to-bl from-emerald-500/5 to-transparent p-5 rounded-md relative group transition-all duration-300">
                    <div className="absolute -top-3 left-4 bg-dark-bg px-3 text-emerald-400 text-xs font-bold font-orbitron tracking-wider">Logic Layer</div>
                    <h4 className="text-white text-lg font-bold mb-2 font-orbitron text-center">{content.sequenceManager}</h4>
                    <p className="text-gray-300 text-sm text-center mb-4 flex-grow leading-relaxed">
                        {content.sequenceManagerDesc}
                    </p>
                    <div className="bg-gray-900/80 border border-emerald-800/30 rounded py-2 px-3 text-center text-xs text-gray-300 mt-auto shadow-inner">
                        <span className="whitespace-pre-line leading-relaxed">{content.sequenceDetail}</span>
                    </div>
                </div>

            </div>

            <div className="mt-8 text-center relative z-10 w-full">
                <p className="inline-block text-gray-300 text-sm md:text-base border-l-[3px] border-cyan-400 pl-4 py-1 italic">
                    {content.conclusion}
                </p>
            </div>

        </motion.div>
    );
};

export default PlanetariumVRDiagram;
