import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { m_ProjectData } from '../constants/m_ProjectData';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = m_ProjectData.find((p) => p.id === parseInt(id));

    if (!project) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <h2 className="text-3xl font-orbitron text-neon-pink mb-4">404 - Project Not Found</h2>
                    <Link to="/" className="text-neon-blue hover:underline">Return to Home</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-neon-blue mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Works
                </Link>

                <motion.div
                    className="bg-cyber-gray border border-gray-800 p-6 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Cyber Border Decorations */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-pink z-20"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-pink z-20"></div>

                    <div className="aspect-video mb-8 overflow-hidden bg-black relative rounded-lg border border-gray-800">
                        <ImageCarousel images={project.imageUrls} />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">{project.title}</h1>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {project.technologies.map((tech, index) => (
                            <span key={index} className="px-3 py-1 bg-dark-bg border border-neon-blue text-neon-blue text-sm font-rajdhani font-bold">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed mb-8 font-rajdhani">
                        {project.description}
                    </p>

                    <div className="flex gap-4">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 bg-dark-bg border border-gray-600 hover:border-neon-pink text-white transition-colors group"
                            >
                                <Github size={20} className="mr-2 group-hover:text-neon-pink transition-colors" />
                                View Source
                            </a>
                        )}
                        {/* Example for live demo if needed */}
                        {/* <button className="flex items-center px-6 py-3 bg-neon-blue text-black font-bold hover:bg-white transition-colors">
                <ExternalLink size={20} className="mr-2" />
                Launch Project
             </button> */}
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default ProjectDetail;
