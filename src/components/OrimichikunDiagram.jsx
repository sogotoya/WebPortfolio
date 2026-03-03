import React from 'react';
// import { motion } from 'framer-motion';

const OrimichikunDiagram = ({ language = 'ja' }) => {
    const t = {
        ja: {
            title: '初期State Machine戦闘AIアーキテクチャ',
            manager: 'Boss AI Context (Orchestrator)',
            managerState: 'State Management',
            managerStateDesc: '・CurrentState\n・ChangeState()\n<span class="text-orange-400/90 text-[11px] block mt-1 font-bold">┗ 遷移の最終実行</span>',
            managerRef: 'Shared References',
            managerRefDesc: '・Transform / Animator\n・Rigidbody2D\n・Player Reference',
            managerData: 'Runtime Data',
            managerDataDesc: '・HP / Phase\n・Cooldown Timer',
            stateInterface: 'IState (Interface)',
            stateInterfaceDesc: '全ステート共通の振る舞いと遷移判定を定義',
            stateInterfaceDetail: '・OnEnter() / OnUpdate() / OnExit()\n・CheckTransition()\n<span class="text-orange-400/90 text-[11px] block mt-1 font-bold">┗ 次状態をContextへ提案</span>',
            stateMove: 'State_Move',
            stateMoveDesc: '・距離維持ロジック\n・フレーム非依存移動',
            stateRoll: 'State_Roll',
            stateRollDesc: '・突進パターン\n・クールタイム管理',
            stateHari: 'State_Hari',
            stateHariDesc: '・弾生成処理\n・コリジョン処理\n<span class="text-xs text-orange-400 font-bold">*InstantiateによるGC課題あり</span>',
            transitionTitle: '状態遷移ロジック',
            transition1: 'Distance < 3f\n↓\nState_Roll',
            transition2: 'Attack End\n↓\nState_Move',
            transition3: 'Phase Change\n↓\nState_Hari',
            principlesTitle: 'Issues & Learnings',
            principles: [
                '巨大単一クラス化の回避には成功',
                'パラメータのコード依存による調整難',
                'Instantiate過多によるGC発生リスク',
                'Coroutine主体で進行管理が分散',
                '→「終了保証・データ駆動設計」の必要性を痛感'
            ]
        },
        en: {
            title: 'Initial State Machine Combat AI Architecture',
            manager: 'Boss AI Context (Orchestrator)',
            managerState: 'State Management',
            managerStateDesc: '・CurrentState\n・ChangeState()\n<span class="text-orange-400/90 text-[11px] block mt-1 font-bold">┗ Final transition execution</span>',
            managerRef: 'Shared References',
            managerRefDesc: '・Transform / Animator\n・Rigidbody2D\n・Player Reference',
            managerData: 'Runtime Data',
            managerDataDesc: '・HP / Phase\n・Cooldown Timer',
            stateInterface: 'IState (Interface)',
            stateInterfaceDesc: 'Defines common behavior and transition logic',
            stateInterfaceDetail: '・OnEnter() / OnUpdate() / OnExit()\n・CheckTransition()\n<span class="text-orange-400/90 text-[11px] block mt-1 font-bold">┗ Proposes next state to Context</span>',
            stateMove: 'State_Move',
            stateMoveDesc: '・Distance maintenance\n・Framerate-independent move',
            stateRoll: 'State_Roll',
            stateRollDesc: '・Dash pattern\n・Cooldown management',
            stateHari: 'State_Hari',
            stateHariDesc: '・Bullet generation\n・Collision logic\n<span class="text-xs text-orange-400 font-bold">*GC issues via Instantiate</span>',
            transitionTitle: 'State Transitions',
            transition1: 'Distance < 3f\n↓\nState_Roll',
            transition2: 'Attack End\n↓\nState_Move',
            transition3: 'Phase Change\n↓\nState_Hari',
            principlesTitle: 'Issues & Learnings',
            principles: [
                'Successfully avoided massive specific classes',
                'Hard-coded parameters led to adjustment difficulty',
                'GC spike risk due to excessive Instantiate calls',
                'Fragmented progression management via Coroutines',
                '→ Realized the critical need for "Guaranteed Completion" & "Data-Driven Design"'
            ]
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

            <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto gap-5 relative z-10">

                {/* 1. Boss AI Context (Orchestrator) */}
                <div className="w-full border border-orange-500/40 border-t-4 border-t-orange-500 bg-gradient-to-br from-orange-500/5 to-transparent p-5 rounded-md relative group transition-all duration-300">
                    <h4 className="text-white text-xl font-bold mb-4 font-orbitron text-center">{content.manager}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* State Management */}
                        <div className="bg-gray-900/80 border border-gray-700/50 rounded flex flex-col items-center p-3 shadow-inner">
                            <span className="text-orange-300 text-xs font-bold mb-2 uppercase tracking-wider">{content.managerState}</span>
                            <span className="text-gray-300 text-sm whitespace-pre-line leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: content.managerStateDesc }}></span>
                        </div>
                        {/* Shared References */}
                        <div className="bg-gray-900/80 border border-gray-700/50 rounded flex flex-col items-center p-3 shadow-inner">
                            <span className="text-orange-300 text-xs font-bold mb-2 uppercase tracking-wider">{content.managerRef}</span>
                            <span className="text-gray-300 text-sm whitespace-pre-line leading-relaxed text-center">{content.managerRefDesc}</span>
                        </div>
                        {/* Runtime Data */}
                        <div className="bg-gray-900/80 border border-gray-700/50 rounded flex flex-col items-center p-3 shadow-inner">
                            <span className="text-orange-300 text-xs font-bold mb-2 uppercase tracking-wider">{content.managerData}</span>
                            <span className="text-gray-300 text-sm whitespace-pre-line leading-relaxed text-center">{content.managerDataDesc}</span>
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center justify-center -my-1">
                    <div className="w-[2px] h-6 bg-gradient-to-b from-orange-500 to-yellow-400"></div>
                    <div className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-yellow-400 mt-[-2px]"></div>
                </div>

                {/* 2. IState Interface */}
                <div className="w-full md:w-3/4 border border-yellow-500/40 hover:border-yellow-500 bg-gradient-to-b from-yellow-400/5 to-transparent p-4 rounded-md relative group transition-all duration-300">
                    <div className="absolute top-0 right-0 bg-yellow-500/20 text-yellow-300 text-[10px] px-2 py-0.5 rounded-bl-md font-bold uppercase">Interface</div>
                    <h4 className="text-white text-lg font-bold mb-2 font-orbitron text-center">{content.stateInterface}</h4>
                    <p className="text-gray-300 text-sm text-center mb-3">
                        {content.stateInterfaceDesc}
                    </p>
                    <div className="bg-gray-900/80 border border-yellow-700/50 rounded py-2 px-3 flex justify-center text-sm text-yellow-100 shadow-inner font-mono">
                        <span className="whitespace-pre-line leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: content.stateInterfaceDetail }}></span>
                    </div>
                </div>

                {/* Branching Arrows Container */}
                <div className="flex w-full md:w-full justify-around relative h-10 -my-1">
                    <div className="absolute left-[16.6%] top-0 w-[2px] h-full bg-yellow-500/50"></div>
                    <div className="absolute left-[16.6%] bottom-0 transform -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-yellow-500"></div>

                    <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-[2px] h-full bg-yellow-500/50"></div>
                    <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-yellow-500"></div>

                    <div className="absolute right-[16.6%] top-0 w-[2px] h-full bg-yellow-500/50"></div>
                    <div className="absolute right-[16.6%] bottom-0 transform -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[8px] border-t-yellow-500"></div>

                    <div className="absolute top-0 left-[16.6%] right-[16.6%] h-[2px] bg-yellow-500/50"></div>
                </div>

                {/* 3. Concrete States & Transitions */}
                <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                    {/* Move -> Roll Sequence Container */}
                    <div className="flex-1 flex flex-col items-center">
                        <div className="w-full border border-teal-600/50 bg-gradient-to-b from-gray-800/80 to-gray-900 p-4 rounded-md relative">
                            <h5 className="text-teal-400 font-bold font-orbitron mb-2 text-center border-b border-teal-800/50 pb-2">{content.stateMove}</h5>
                            <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed text-center">{content.stateMoveDesc}</p>
                        </div>

                        {/* Transition visual */}
                        <div className="text-center my-3 relative inline-block">
                            <div className="text-[11px] text-teal-300 bg-gray-900/90 border border-teal-900/50 px-2 py-1 rounded whitespace-pre-line leading-tight">
                                {content.transition1}
                            </div>
                        </div>

                        <div className="w-full border border-rose-600/50 bg-gradient-to-b from-gray-800/80 to-gray-900 p-4 rounded-md relative">
                            <h5 className="text-rose-400 font-bold font-orbitron mb-2 text-center border-b border-rose-800/50 pb-2">{content.stateRoll}</h5>
                            <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed text-center">{content.stateRollDesc}</p>
                        </div>

                        {/* Return loop visual */}
                        <div className="text-center mt-3 relative inline-block">
                            <div className="text-[11px] text-gray-400 bg-gray-900/90 border border-gray-800 px-2 py-1 rounded whitespace-pre-line leading-tight flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21v-4a2 2 0 0 0-2-2h-3" /><path d="M5 21v-4a2 2 0 0 1 2-2h10" /><path d="M12 9l-3 3 3 3" /><path d="M9 12h8" /><path d="M21 3v4a2 2 0 0 1-2 2h-3" /><path d="M5 3v4a2 2 0 0 0 2 2h10" /></svg>
                                {content.transition2}
                            </div>
                        </div>
                    </div>

                    {/* Hari (Independent/Phase based) */}
                    <div className="flex-1 flex flex-col items-center">
                        <div className="w-full border border-purple-600/50 bg-gradient-to-b from-gray-800/80 to-gray-900 p-4 rounded-md relative h-full flex flex-col justify-start">
                            <h5 className="text-purple-400 font-bold font-orbitron mb-2 text-center border-b border-purple-800/50 pb-2">{content.stateHari}</h5>
                            <p
                                className="text-gray-300 text-sm whitespace-pre-line leading-relaxed text-center flex-grow"
                                dangerouslySetInnerHTML={{ __html: content.stateHariDesc }}
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Design Principles (The core differentiator) */}
                <div className="w-full mt-6 bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90 border-l-4 border-l-orange-500 rounded-r-md p-5 shadow-lg relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-gray-800/30 font-orbitron text-6xl font-black pointer-events-none">ARCHITECTURE</div>
                    <h4 className="text-orange-400 text-lg font-bold font-orbitron mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        {content.principlesTitle}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
                        {content.principles.map((principle, index) => (
                            <div key={index} className="flex items-start">
                                <span className="text-orange-500 mr-2">❖</span>
                                <span className="text-gray-300 text-sm font-medium">{principle}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default OrimichikunDiagram;
