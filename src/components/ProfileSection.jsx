import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
    Terminal, FileCode2, Code2, Box, Wrench, Layers,
    MonitorPlay, Video, Palette, Component
} from 'lucide-react';

const ProfileSection = () => {
    const { language } = useLanguage();
    const isEn = language === 'en';

    const skills = [
        { name: "C", icon: <Terminal size={24} strokeWidth={1.5} /> },
        { name: "C++", icon: <Code2 size={24} strokeWidth={1.5} /> },
        { name: "C#", icon: <FileCode2 size={24} strokeWidth={1.5} /> },
        { name: "Unity", icon: <Box size={24} strokeWidth={1.5} /> },
        { name: "VCC", icon: <Wrench size={24} strokeWidth={1.5} /> },
        { name: "OpenGL", icon: <Layers size={24} strokeWidth={1.5} /> },
        { name: "Visual Studio 2022", icon: <MonitorPlay size={24} strokeWidth={1.5} /> },
        { name: "Visual Studio Code", icon: <Code2 size={24} strokeWidth={1.5} /> },
        { name: "blender", icon: <Component size={24} strokeWidth={1.5} /> },
        { name: "DaVinci Resolve", icon: <Video size={24} strokeWidth={1.5} /> },
        { name: "GIMP", icon: <Palette size={24} strokeWidth={1.5} /> },
    ];

    const content = {
        ja: {
            title: "PROFILE",
            nameLabel: "NAME",
            name: "柊弥",
            ageLabel: "AGE",
            age: "20",
            roleLabel: "ROLE",
            role: "プログラマー",
            skillTitle: "SKILLS",
            philosophyTitle: "■ 設計思想",
        },
        en: {
            title: "PROFILE",
            nameLabel: "NAME",
            name: "Toya",
            ageLabel: "AGE",
            age: "20",
            roleLabel: "ROLE",
            role: "Programmer",
            skillTitle: "SKILLS",
            philosophyTitle: "■ DESIGN PHILOSOPHY",
        }
    };

    const t = isEn ? content.en : content.ja;

    return (
        <section className="mb-12 border border-gray-800 bg-black/40 relative overflow-hidden">
            {/* Cyberpunk decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue z-10" />

            <div className="flex flex-col lg:flex-row">
                {/* Left side: Basic Info & Skills */}
                <div className="w-full lg:w-5/12 p-6 border-b lg:border-b-0 lg:border-r border-gray-800 bg-black/60 relative">
                    <h2 className="text-xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-400 mb-6 tracking-widest">
                        {t.title}
                    </h2>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-end gap-3 border-b border-gray-800 pb-2">
                            <span className="text-[10px] font-orbitron text-gray-500 w-12 tracking-widest">{t.nameLabel}</span>
                            <span className="text-lg text-gray-200 tracking-wider">{t.name}</span>
                        </div>
                        <div className="flex items-end gap-3 border-b border-gray-800 pb-2">
                            <span className="text-[10px] font-orbitron text-gray-500 w-12 tracking-widest">{t.ageLabel}</span>
                            <span className="text-lg text-gray-200 font-rajdhani">{t.age}</span>
                        </div>
                        <div className="flex items-end gap-3 border-b border-gray-800 pb-2">
                            <span className="text-[10px] font-orbitron text-gray-500 w-12 tracking-widest">{t.roleLabel}</span>
                            <span className="text-lg text-gray-200 tracking-wider">{t.role}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-orbitron text-neon-blue/80 tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse-slow"></span>
                            {t.skillTitle}
                        </h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -2, borderColor: 'rgba(0, 243, 255, 0.5)' }}
                                    className="flex flex-col items-center justify-center p-2 border border-gray-800 bg-black/40 rounded-sm group transition-colors"
                                >
                                    <div className="text-gray-500 group-hover:text-neon-blue transition-colors mb-2">
                                        {skill.icon}
                                    </div>
                                    <span className="text-[9px] font-rajdhani text-gray-400 group-hover:text-gray-200 text-center tracking-wider break-words w-full">
                                        {skill.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right side: Design Philosophy */}
                <div className="w-full lg:w-7/12 p-6 md:p-8 relative">
                    {/* Background grid pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle at center, #1a202c 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative z-10 h-full flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-gray-100 mb-6 tracking-wider border-l-4 border-neon-blue pl-3">
                            {t.philosophyTitle}
                        </h3>
                        <div className="text-[13px] md:text-sm text-gray-400 leading-relaxed font-rajdhani whitespace-pre-line space-y-4">
                            <p className="text-gray-300">
                                {isEn ?
                                    "In early development, I experienced input conflicts due to scattered state flags, forgotten TimeScale restorations, and state breakdowns during integration." :
                                    "開発初期に、状態フラグ分散による入力競合やTimeScale復帰漏れ、統合段階での状態破綻を経験しました。"
                                }<br />
                                {isEn ? "Reflecting on this, I now adhere to the following design principles:" : "その反省から、現在は以下を設計原則としています。"}
                            </p>

                            <ul className="list-disc list-inside space-y-1 my-4 ml-2 text-gray-300">
                                <li>{isEn ? "Explicit state transitions (defining state priorities)" : "状態遷移の明示化（ステート優先順位の定義）"}</li>
                                <li>{isEn ? "Guaranteed completion design for TimeScale changes and presentation locks" : "TimeScale変更や演出ロックに対する終了保証設計"}</li>
                                <li>{isEn ? "Separation of responsibilities across Input, Physics, Presentation, and UI" : "入力／物理／演出／UIの責務分離"}</li>
                                <li>{isEn ? "Structural design predicated on ease of integration" : "統合容易性を前提とした構造設計"}</li>
                            </ul>

                            <div className="mt-6 p-4 border border-neon-blue/40 bg-neon-blue/10 rounded-sm shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                                <p className="text-neon-blue font-bold text-center tracking-wide text-sm md:text-base">
                                    {isEn ? "My current design standard is not \"maximizing implementation speed\" but \"maximizing the probability of completion.\"" : (
                                        <>
                                            <span className="inline-block">現在は「実装速度の最大化」ではなく</span>
                                            <span className="inline-block">「完成確率の最大化」を設計基準としています。</span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;
