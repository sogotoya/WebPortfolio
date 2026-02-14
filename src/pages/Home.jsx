import React from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { m_ProjectData } from '../constants/m_ProjectData';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <Layout>
            <header className="mb-12 text-center">
                <motion.h1
                    className="text-5xl md:text-7xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    PORTFOLIO
                </motion.h1>
                <motion.p
                    className="text-gray-400 text-lg font-rajdhani tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    VISUAL / INTERACTIVE / CODE
                </motion.p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {m_ProjectData.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: project.id * 0.1 }}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
