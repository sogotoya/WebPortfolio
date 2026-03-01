import React from 'react';
import { motion } from 'framer-motion';

const OrimichikunDiagram = ({ language = 'ja' }) => {
    const t = {
        ja: {
            title: 'State Machine 戦闘AIアーキテクチャ',
            manager: 'Boss AI Context (Base Class)',
            managerDesc: 'ステート管理と共通データの保持',
            managerDetail: '・現在ステートの保持\n・ステート間遷移の制御',
            stateInterface: 'IState (Interface)',
            stateInterfaceDesc: '全ステート共通の振る舞いを定義',
            stateInterfaceDetail: '・OnEnter() / OnUpdate()\n・OnExit()',
            stateMove: 'State_Move',
            stateMoveDesc: 'Time.deltaTime ベースの\nフレーム非依存移動',
            stateRoll: 'State_Roll',
            stateRollDesc: '特定の攻撃パターンの\nロジック分離',
            stateHari: 'State_Hari',
            stateHariDesc: 'コリジョン判定や\n専用の挙動',
            conclusion: '「巨大な単一クラス」を避け、攻撃ロジックごとの『責務分離』と『状態遷移の明確化』を実現'
        },
        en: {
            title: 'State Machine Combat AI Architecture',
            manager: 'Boss AI Context (Base Class)',
            managerDesc: 'State management and shared data retention',
            managerDetail: '・Holds current state\n・Controls transitions between states',
            stateInterface: 'IState (Interface)',
            stateInterfaceDesc: 'Defines common behavior for all states',
            stateInterfaceDetail: '・OnEnter() / OnUpdate()\n・OnExit()',
            stateMove: 'State_Move',
            stateMoveDesc: 'Framerate-independent move\nusing Time.deltaTime',
            stateRoll: 'State_Roll',
            stateRollDesc: 'Logic separation for a\nspecific attack pattern',
            stateHari: 'State_Hari',
            stateHariDesc: 'Collision detection &\ndedicated behavior',
            conclusion: 'Avoids a "massive single class" by realizing "separation of responsibilities" per attack logic and "clarification of state transitions".'
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
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/5 blur-[60px] rounded-full pointer-events-none"></div>

            <h3 className="text-orange-400 text-2xl mb-10 font-orbitron font-bold text-center tracking-widest uppercase relative z-10">
                {content.title}
                <div className="h-0.5 w-24 bg-orange-400/50 mx-auto mt-3"></div>
            </h3>

            <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto gap-6 relative z-10">

                {/* Boss AI Context */}
                <div className="w-full md:w-2/3 border border-orange-500/40 hover:border-orange-500 bg-gradient-to-br from-orange-500/5 to-transparent p-5 rounded-md relative group transition-all duration-300">
                    <div className="absolute -top-3 left-4 bg-dark-bg px-3 text-orange-400 text-xs font-bold font-orbitron tracking-wider">Context Manager</div>
                    <h4 className="text-white text-lg font-bold mb-2 font-orbitron text-center">{content.manager}</h4>
                    <p className="text-gray-300 text-sm text-center mb-4 leading-relaxed">
                        {content.managerDesc}
                    </p>
                    <div className="bg-gray-900/80 border border-gray-700/50 rounded py-2 px-3 text-center text-xs text-gray-300 shadow-inner">
                        <span className="whitespace-pre-line leading-relaxed">{content.managerDetail}</span>
                    </div>
                </div>

                {/* Arrow from Context to Interface */}
                <div className="flex flex-col items-center justify-center py-1">
                    <div className="w-[2px] h-6 bg-gradient-to-b from-orange-500 to-yellow-400"></div>
                    <div className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-yellow-400 mt-[-2px]"></div>
                    <div className="text-yellow-400 text-[10px] font-bold mt-2 text-center bg-gray-900/90 px-2 py-1 rounded border border-gray-800">
                        Delegate execution to Interface
                    </div>
                </div>

                {/* IState Interface */}
                <div className="w-full md:w-3/4 border border-yellow-500/40 hover:border-yellow-500 bg-gradient-to-b from-yellow-400/5 to-transparent p-5 rounded-md relative group transition-all duration-300">
                    <div className="absolute -top-3 left-4 bg-dark-bg px-3 text-yellow-400 text-xs font-bold font-orbitron tracking-wider">Interface Definition</div>
                    <h4 className="text-white text-lg font-bold mb-2 font-orbitron text-center">{content.stateInterface}</h4>
                    <p className="text-gray-300 text-sm text-center mb-4 leading-relaxed">
                        {content.stateInterfaceDesc}
                    </p>
                    <div className="bg-gray-900/80 border border-gray-700/50 rounded py-2 px-3 text-center text-xs text-gray-300 shadow-inner">
                        <span className="whitespace-pre-line leading-relaxed">{content.stateInterfaceDetail}</span>
                    </div>
                </div>

                {/* Branching Arrows Container */}
                <div className="flex w-full md:w-full justify-around relative h-10 mt-2">
                    {/* Left path */}
                    <div className="absolute left-[16.6%] top-0 w-[2px] h-full bg-yellow-500/50"></div>
                    <div className="absolute left-[16.6%] bottom-0 transform -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-yellow-500 shadow-sm"></div>

                    {/* Center path */}
                    <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-[2px] h-full bg-yellow-500/50"></div>
                    <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-yellow-500 shadow-sm"></div>

                    {/* Right path */}
                    <div className="absolute right-[16.6%] top-0 w-[2px] h-full bg-yellow-500/50"></div>
                    <div className="absolute right-[16.6%] bottom-0 transform -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-yellow-500 shadow-sm"></div>

                    {/* Horizontal connector line */}
                    <div className="absolute top-0 left-[16.6%] right-[16.6%] h-[2px] bg-yellow-500/50"></div>
                </div>

                {/* Concrete States */}
                <div className="flex flex-col md:flex-row w-full justify-between gap-4 mt-1">
                    {/* State: Move */}
                    <div className="flex-1 border border-gray-600/50 bg-gradient-to-b from-gray-800/30 to-transparent p-4 rounded-md relative text-center">
                        <h5 className="text-white font-bold font-orbitron mb-2">{content.stateMove}</h5>
                        <p className="text-gray-400 text-xs whitespace-pre-line leading-relaxed">{content.stateMoveDesc}</p>
                    </div>

                    {/* State: Roll */}
                    <div className="flex-1 border border-gray-600/50 bg-gradient-to-b from-gray-800/30 to-transparent p-4 rounded-md relative text-center">
                        <h5 className="text-white font-bold font-orbitron mb-2">{content.stateRoll}</h5>
                        <p className="text-gray-400 text-xs whitespace-pre-line leading-relaxed">{content.stateRollDesc}</p>
                    </div>

                    {/* State: Hari (Example Attack) */}
                    <div className="flex-1 border border-gray-600/50 bg-gradient-to-b from-gray-800/30 to-transparent p-4 rounded-md relative text-center">
                        <h5 className="text-white font-bold font-orbitron mb-2">{content.stateHari}</h5>
                        <p className="text-gray-400 text-xs whitespace-pre-line leading-relaxed">{content.stateHariDesc}</p>
                    </div>
                </div>

            </div>

            <div className="mt-12 text-center relative z-10 w-full">
                <p className="inline-block text-gray-300 text-sm md:text-base border-l-[3px] border-orange-400 pl-4 py-1 italic">
                    {content.conclusion}
                </p>
            </div>

        </motion.div>
    );
};

export default OrimichikunDiagram;
