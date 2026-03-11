import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ProfileSection from '../components/ProfileSection';
import ProjectCard from '../components/ProjectCard';
import CollapsibleSection from '../components/CollapsibleSection';
import GameJamMonitor from '../components/GameJamMonitor';
import ToolMonitor from '../components/ToolMonitor';
import VRChatWorldMonitor from '../components/VRChatWorldMonitor';
import { m_ProjectData, m_ToolData, m_GameJamData, m_ClientWorksData, m_VRChatWorldsData } from '../constants/m_ProjectData';


const Home = () => {
    const [vrchatBgImage, setVrchatBgImage] = useState(null);

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


            {/* ヒーロープロジェクト（Axis:Save） */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <ProjectCard project={m_ProjectData[0]} isHero={true} />
            </motion.div>

            {/* -- PERSONAL WORKS -- */}
            <div className="mt-12 mb-6 flex items-center overflow-hidden">
                <h2 className="text-lg md:text-xl font-orbitron font-bold text-gray-400 tracking-widest whitespace-nowrap mr-4">
                    -- PERSONAL WORKS
                </h2>
                <div className="flex-1 border-b border-dashed border-gray-700"></div>
            </div>

            {/* Game Category */}
            <h3 className="text-md font-orbitron font-semibold text-gray-500 mb-4 ml-2">GAME</h3>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
                {m_ProjectData.filter(p => !p.technologies.includes("VR") && p.id !== 1).map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                        className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]"
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>

            {/* VR Category */}
            <h3 className="text-md font-orbitron font-semibold text-gray-500 mb-4 ml-2">VR</h3>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
                {m_ProjectData.filter(p => p.technologies.includes("VR")).map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                        className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]"
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>

            {/* -- CLIENT WORKS -- */}
            <div className="mt-12 mb-6 flex items-center overflow-hidden">
                <h2 className="text-lg md:text-xl font-orbitron font-bold text-gray-400 tracking-widest whitespace-nowrap mr-4">
                    -- CLIENT WORKS
                </h2>
                <div className="flex-1 border-b border-dashed border-gray-700"></div>
            </div>

            {/* Changed from grid to flex to allow centering of items when they don't fill the row */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
                {m_ClientWorksData.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                        className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]"
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>

            {/* ゲームジャム & ツール - 横2列 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* 左: ゲームジャム作品 */}
                <CollapsibleSection title="GAME JAM">
                    <GameJamMonitor items={m_GameJamData} />
                </CollapsibleSection>

                {/* 右: ツール一覧 */}
                <CollapsibleSection title="TOOLS">
                    <ToolMonitor items={m_ToolData} />
                </CollapsibleSection>
            </div>

            {/* VRChat ワールド (おまけ) - フル横幅または中央 */}
            <div className="mb-12">
                <CollapsibleSection
                    title="VRCHAT WORLDS"
                    onToggle={(isOpen) => {
                        if (!isOpen) setVrchatBgImage(null);
                        else setVrchatBgImage(m_VRChatWorldsData[0].backgroundUrl);
                    }}
                >
                    <VRChatWorldMonitor
                        items={m_VRChatWorldsData}
                        onItemSelect={(index) => setVrchatBgImage(m_VRChatWorldsData[index].backgroundUrl)}
                    />
                </CollapsibleSection>
            </div>

            {/* プロフィールセクション */}
            <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <ProfileSection />
            </motion.div>
        </Layout>

    );
};

export default Home;
