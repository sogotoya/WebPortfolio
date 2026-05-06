import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import ProfileSection from '../components/ProfileSection';
import ProjectCard from '../components/ProjectCard';
import GameJamMonitor from '../components/GameJamMonitor';
import ToolMonitor from '../components/ToolMonitor';
import VRChatWorldMonitor from '../components/VRChatWorldMonitor';
import { m_ProjectData, m_ToolData, m_GameJamData, m_ClientWorksData, m_VRChatWorldsData } from '../constants/m_ProjectData';


const Home = () => {
    const [vrchatBgImage, setVrchatBgImage] = useState(null);
    const [activeTab, setActiveTab] = useState(() => {
        return sessionStorage.getItem('activeTab') || "Game";
    });
    const tabs = [
        { id: "Game", label: "ゲーム" },
        { id: "VR", label: "VR" },
        { id: "VRChat", label: "VRChat" },
        { id: "Tool", label: "ツール" },
        { id: "GameJam", label: "ゲームジャム" },
        { id: "Client", label: "案件" },
    ];

    // タブ切り替え時の背景画像制御
    useEffect(() => {
        if (activeTab === "VRChat") {
            setVrchatBgImage(m_VRChatWorldsData[0].backgroundUrl);
        } else {
            setVrchatBgImage(null);
        }
        // タブの状態を保存
        sessionStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    // スクロール位置の復元と保存
    useEffect(() => {
        // マウント時に前回のスクロール位置を復元
        const savedPosition = sessionStorage.getItem('homeScrollPosition');
        if (savedPosition) {
            // 少し遅延させないと、DOMのレンダリング前にスクロールしてしまいトップに戻ってしまう場合がある
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedPosition, 10));
            }, 0);
        }

        // スクロールイベントで位置を保存
        const handleScroll = () => {
            sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
        };

        window.addEventListener('scroll', handleScroll);

        // アンマウント時にイベントリスナーを解除
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Layout backgroundImage={vrchatBgImage}>
            <header className="mb-8 text-center border-b border-gray-800 pb-8">
                <motion.h1
                    className="text-2xl md:text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-500 mb-3"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    TOYASOGO PORTFOLIO
                </motion.h1>
                <motion.p
                    className="text-gray-500 text-sm font-rajdhani tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    VISUAL / INTERACTIVE / CODE
                </motion.p>
            </header>


            {/* プロフィールセクション */}
            <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <ProfileSection />
            </motion.div>

            {/* ヒーロープロジェクト（Axis:Save） */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <ProjectCard project={m_ProjectData[0]} isHero={true} />
            </motion.div>

            {/* TAB MENU */}
            <div className="mb-8 flex justify-center border-b border-gray-800 pb-1 relative z-10">
                <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto px-4 md:px-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 md:px-8 py-2 font-orbitron text-sm md:text-base tracking-widest transition-all duration-300 whitespace-nowrap ${
                                activeTab === tab.id
                                    ? "text-neon-blue border-b-2 border-neon-blue bg-neon-blue/10 font-bold"
                                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 border-b-2 border-transparent"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* TAB CONTENT */}
            <div className="min-h-[600px] relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {activeTab === "Game" && (() => {
                            const personalGames = m_ProjectData.filter(p => !p.technologies.includes("VR"));
                            const secondYearGames = [
                                ...personalGames.filter(p => p.id !== 5), // Tsumitobu (id: 5) 以外
                                ...m_ClientWorksData.filter(cw => cw.id !== "cw-1") // 玉藻城 (cw-1) はVRChatタブへ移動
                            ];
                            const firstYearGames = personalGames.filter(p => p.id === 5); // Tsumitobu (id: 5)

                            return (
                                <div>
                                    {/* 2nd Year */}
                                    {secondYearGames.length > 0 && (
                                        <div className="mb-12">
                                            <div className="flex items-center mb-6">
                                                <h3 className="text-lg md:text-xl font-orbitron font-bold text-gray-300 tracking-widest mr-4">
                                                    2年次
                                                </h3>
                                                <div className="flex-1 border-b border-gray-700"></div>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-8">
                                                {secondYearGames.map((project, index) => (
                                                    <motion.div
                                                        key={project.id}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                                        className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                                                    >
                                                        <ProjectCard project={project} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 1st Year */}
                                    {firstYearGames.length > 0 && (
                                        <div className="mb-12">
                                            <div className="flex items-center mb-6">
                                                <h3 className="text-lg md:text-xl font-orbitron font-bold text-gray-300 tracking-widest mr-4">
                                                    1年次
                                                </h3>
                                                <div className="flex-1 border-b border-gray-700"></div>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-8">
                                                {firstYearGames.map((project, index) => (
                                                    <motion.div
                                                        key={project.id}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                                        className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                                                    >
                                                        <ProjectCard project={project} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}

                        {activeTab === "VR" && (
                            <div className="mb-12">
                                <div className="flex items-center mb-6">
                                    <h3 className="text-lg md:text-xl font-orbitron font-bold text-gray-300 tracking-widest mr-4">
                                        2年次
                                    </h3>
                                    <div className="flex-1 border-b border-gray-700"></div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-8">
                                    {m_ProjectData.filter(p => p.technologies.includes("VR") && p.id !== 3).map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                            className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                                        >
                                            <ProjectCard project={project} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "VRChat" && (
                            <div className="mb-12">
                                <div className="flex items-center mb-6">
                                    <h3 className="text-lg md:text-xl font-orbitron font-bold text-gray-300 tracking-widest mr-4">
                                        2年次
                                    </h3>
                                    <div className="flex-1 border-b border-gray-700"></div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-8">
                                    {/* 玉藻城 */}
                                    <motion.div
                                        key="cw-1"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                                    >
                                        <ProjectCard project={m_ClientWorksData.find(cw => cw.id === "cw-1")} />
                                    </motion.div>
                                    
                                    {/* VRChat Worlds */}
                                    {m_VRChatWorldsData.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                            className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                                        >
                                            <ProjectCard project={project} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "Tool" && (
                            <div className="mb-12">
                                <div className="flex items-center mb-6">
                                    <h3 className="text-lg md:text-xl font-orbitron font-bold text-gray-300 tracking-widest mr-4">
                                        2年次
                                    </h3>
                                    <div className="flex-1 border-b border-gray-700"></div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-8">
                                    {m_ToolData.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                            className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                                        >
                                            <ProjectCard project={project} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "GameJam" && (
                            <div className="mb-12">
                                <div className="flex items-center mb-6">
                                    <h3 className="text-lg md:text-xl font-orbitron font-bold text-gray-300 tracking-widest mr-4">
                                        2年次
                                    </h3>
                                    <div className="flex-1 border-b border-gray-700"></div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-8">
                                    {m_GameJamData.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                            className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                                        >
                                            <ProjectCard project={project} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "Client" && (
                            <div className="mb-12">
                                <div className="flex items-center mb-6">
                                    <h3 className="text-lg md:text-xl font-orbitron font-bold text-gray-300 tracking-widest mr-4">
                                        2年次
                                    </h3>
                                    <div className="flex-1 border-b border-gray-700"></div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-8">
                                    {m_ClientWorksData.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                            className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                                        >
                                            <ProjectCard project={project} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Layout>
    );
};

export default Home;
