import React from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { m_ProjectData } from '../constants/m_ProjectData';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <Layout>
            <header className="mb-8 text-center">
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

            {/* その他のプロジェクト */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {m_ProjectData.slice(1).map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
