import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { m_ProjectData, m_ToolData, m_GameJamData, m_ClientWorksData, m_VRChatWorldsData } from '../constants/m_ProjectData';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Download } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import AxisSaveDiagram from '../components/AxisSaveDiagram';
import PlanetariumVRDiagram from '../components/PlanetariumVRDiagram';
import OrimichikunDiagram from '../components/OrimichikunDiagram';

import MarkdownDocument from '../components/MarkdownDocument';

const ProjectDetail = () => {
    const { id } = useParams();

    const allProjects = [
        ...m_ProjectData, 
        ...m_ClientWorksData, 
        ...m_ToolData, 
        ...m_GameJamData, 
        ...m_VRChatWorldsData
    ];
    const project = allProjects.find((p) => String(p.id) === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // 動画がある場合: -1 + 1 = 0 (Video slide)、動画がない場合: 0 (最初の画像)
    const hasProjectVideo = project?.videoUrl && project.videoUrl.length > 0;
    const initialImageIndex = hasProjectVideo ? -1 : 0;

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
                {/* プロジェクト背景画像 */}
                {(() => {
                    let bgUrl = project.backgroundUrl;

                    // 交互サムネイル対象: visitCountはクリック時に+1済みなので、-1で「見ていた方」を取得
                    if (project.alternatingThumbnail && project.imageUrls.length > 1) {
                        const count = parseInt(sessionStorage.getItem(`visitCount_${project.id}`) || "1", 10);
                        const shownIdx = (count - 1) % project.imageUrls.length;
                        const img = project.imageUrls[shownIdx];
                        bgUrl = typeof img === 'string' ? img : img.url;
                    }

                    if (!bgUrl) return null;

                    return (
                        <>
                            <div
                                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${bgUrl})` }}
                            />
                            <div className="fixed inset-0 z-0 bg-dark-bg/30" />
                            <div className="fixed inset-0 z-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
                        </>
                    );
                })()}

                <Link to="/" className="relative z-10 inline-flex items-center text-gray-400 hover:text-neon-blue mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Works
                </Link>

                <motion.div
                    className="relative z-10 bg-cyber-gray border border-gray-800 p-6 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Cyber Border Decorations */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-pink z-20"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-pink z-20"></div>

                    <div className="aspect-video mb-8 overflow-hidden bg-black relative rounded-lg border border-gray-800">
                        <ImageCarousel images={project.imageUrls} videoUrl={project.videoUrl} initialImageIndex={initialImageIndex} />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">{project.title}</h1>

                    {project.status ? (
                        <div className="mb-8 border border-gray-700 bg-black/50 rounded overflow-hidden">
                            <table className="w-full text-left text-gray-300 font-rajdhani text-sm md:text-base">
                                <tbody>
                                    <tr className="border-b border-gray-700">
                                        <th className="py-3 px-4 bg-gray-900/80 font-bold w-1/3 md:w-1/4 text-neon-pink border-r border-gray-700">ジャンル</th>
                                        <td className="py-3 px-4">{project.status.genre || ""}</td>
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <th className="py-3 px-4 bg-gray-900/80 font-bold w-1/3 md:w-1/4 text-neon-pink border-r border-gray-700">プラットフォーム</th>
                                        <td className="py-3 px-4">{project.status.platform || ""}</td>
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <th className="py-3 px-4 bg-gray-900/80 font-bold w-1/3 md:w-1/4 text-neon-pink border-r border-gray-700">イベント</th>
                                        <td className="py-3 px-4">{project.status.event || ""}</td>
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <th className="py-3 px-4 bg-gray-900/80 font-bold w-1/3 md:w-1/4 text-neon-pink border-r border-gray-700">制作人数</th>
                                        <td className="py-3 px-4">{project.status.teamSize || ""}</td>
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <th className="py-3 px-4 bg-gray-900/80 font-bold w-1/3 md:w-1/4 text-neon-pink border-r border-gray-700">担当</th>
                                        <td className="py-3 px-4">{project.status.role || ""}</td>
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <th className="py-3 px-4 bg-gray-900/80 font-bold w-1/3 md:w-1/4 text-neon-pink border-r border-gray-700">開発期間</th>
                                        <td className="py-3 px-4">{project.status.duration || ""}</td>
                                    </tr>
                                    <tr className="border-b border-gray-700">
                                        <th className="py-3 px-4 bg-gray-900/80 font-bold w-1/3 md:w-1/4 text-neon-pink border-r border-gray-700">開発環境</th>
                                        <td className="py-3 px-4">{(project.technologies && project.technologies.length > 0) ? project.technologies.join(" / ") : ""}</td>
                                    </tr>
                                    <tr>
                                        <th className="py-3 px-4 bg-gray-900/80 font-bold w-1/3 md:w-1/4 text-neon-pink border-r border-gray-700">受賞</th>
                                        <td className="py-3 px-4">{project.status.awards || ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3 mb-6">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="px-3 py-1 bg-dark-bg border border-neon-blue text-neon-blue text-sm font-rajdhani font-bold">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    <p
                        className="text-gray-300 text-lg leading-relaxed mb-8 font-rajdhani"
                        dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, '<br/>') }}
                    />

                    {project.id === 1 && <AxisSaveDiagram />}
                    {project.id === 2 && <PlanetariumVRDiagram />}
                    {project.id === 4 && <OrimichikunDiagram />}

                    {project.markdownUrl && (
                        <MarkdownDocument url={project.markdownUrl} />
                    )}

                    <div className="flex gap-4 justify-end">
                        {project.playUrl && (
                            <a
                                href={project.playUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 bg-neon-blue text-black font-bold hover:bg-white transition-colors group"
                            >
                                <ExternalLink size={20} className="mr-2" />
                                Play
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 bg-transparent border border-gray-400 text-white hover:border-white hover:text-white transition-colors group"
                            >
                                <Github size={20} className="mr-2 group-hover:text-white transition-colors" />
                                View Source
                            </a>
                        )}
                        {project.downloadUrl && (
                            <a
                                href={project.downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 bg-transparent border border-neon-blue text-neon-blue font-bold hover:bg-neon-blue/10 transition-colors group"
                            >
                                <Download size={20} className="mr-2" />
                                Download
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default ProjectDetail;
