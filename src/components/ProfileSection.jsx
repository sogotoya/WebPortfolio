import React from 'react';
import {
    Terminal, FileCode2, Code2, Box, Wrench, Layers, Glasses,
    MonitorPlay, Video, Palette, Component, Zap, Bot, Package, Music, Github
} from 'lucide-react';
import { SiC, SiCplusplus, SiGithub, SiUnity, SiUnrealengine } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { DiVisualstudio } from 'react-icons/di';
import { VscVscode } from 'react-icons/vsc';

const ProfileSection = () => {

    const skillCategories = [
        {
            category: "プログラミング言語",
            skills: [
                { name: "C", icon: <SiC size={18} />, period: "半年" },
                { name: "C++", icon: <SiCplusplus size={18} />, period: "半年" },
                { name: "C#", icon: <TbBrandCSharp size={18} />, period: "1年半" },
            ]
        },
        {
            category: "IDE",
            skills: [
                { name: "Visual Studio", icon: <DiVisualstudio size={18} /> },
                { name: "VS Code", icon: <VscVscode size={18} /> },
            ]
        },
        {
            category: "ライブラリ",
            skills: [
                { name: "OpenGL", icon: <Layers size={18} />, period: "1年" },
            ]
        },
        {
            category: "ゲームエンジン",
            skills: [
                { name: "Unity", icon: <SiUnity size={18} />, period: "1年半" },
                { name: "Unreal Engine", icon: <SiUnrealengine size={18} />, period: "半年未満" },
            ]
        },
        {
            category: "Tools",
            skills: [
                { name: "GitHub Desktop", icon: <SiGithub size={18} />, period: "2年" },
                { name: "XREAL", icon: <Glasses size={18} />, period: "半年未満" },
                { name: "VRChat CC", icon: <Wrench size={18} />, period: "半年" },
                { name: "Antigravity", icon: <Zap size={18} />, period: "半年" },
                { name: "Claude Code", icon: <Bot size={18} />, period: "半年" },
            ]
        },
        {
            category: "Unityパッケージ",
            skills: [
                { name: "UniTask", icon: <Package size={18} /> },
                { name: "Netcode", icon: <Package size={18} /> },
                { name: "Cinemachine", icon: <Package size={18} /> },
            ]
        }
    ];


    const t = {
        title: "PROFILE",
        nameLabel: "NAME",
        name: "十河 柊弥",
        ageLabel: "AGE",
        age: "20",
        roleLabel: "ROLE",
        role: "プログラマ",
        skillTitle: "SKILLS",
        philosophyTitle: "■ 設計ポリシー",
    };

    return (
        <section className="mb-12 border border-gray-800 bg-black/40 relative overflow-hidden">
            {/* Cyberpunk decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue z-10" />

            <div className="flex flex-col">
                {/* Top Row: Basic Info */}
                <div className="flex flex-col border-b border-gray-800">
                    <div className="w-full px-6 py-4 border-b border-gray-800 bg-black/60 relative">
                        <h2 className="text-xl md:text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-400 mb-3 tracking-widest">
                            {t.title}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                            <div className="flex items-baseline gap-3 border-b border-gray-800 pb-1">
                                <span className="text-xs font-orbitron text-gray-500 tracking-widest">{t.nameLabel}</span>
                                <span className="text-lg md:text-xl text-gray-200 tracking-wider translate-y-0.5">{t.name}</span>
                            </div>
                            <div className="flex items-baseline gap-3 border-b border-gray-800 pb-1">
                                <span className="text-xs font-orbitron text-gray-500 tracking-widest">{t.ageLabel}</span>
                                <span className="text-lg md:text-xl text-gray-200 font-rajdhani translate-y-0.5">{t.age}</span>
                            </div>
                            <div className="flex items-baseline gap-3 border-b border-gray-800 pb-1">
                                <span className="text-xs font-orbitron text-gray-500 tracking-widest">{t.roleLabel}</span>
                                <span className="text-lg md:text-xl text-gray-200 tracking-wider translate-y-0.5">{t.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Skills */}
                    <div className="w-full p-6 bg-black/40 relative">
                        <h3 className="text-sm font-orbitron text-neon-blue/80 tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse-slow"></span>
                            {t.skillTitle}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                            {skillCategories.map((categoryGroup, categoryIndex) => (
                                <div key={categoryIndex} className="flex flex-col">
                                    <h4 className="text-xs text-neon-blue/60 font-orbitron tracking-widest mb-3 border-l-2 border-neon-blue/30 pl-2 py-0.5">
                                        {categoryGroup.category}
                                    </h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {categoryGroup.skills.map((skill, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2.5 px-3 py-2.5 min-w-[100px] h-[44px] border border-gray-800 bg-black/40 rounded hover:border-neon-blue/40 transition-colors group"
                                            >
                                                <div className="text-gray-400 group-hover:text-neon-blue transition-colors flex-shrink-0">
                                                    {skill.icon}
                                                </div>
                                                <span className="text-xs font-rajdhani text-gray-300 tracking-wider whitespace-nowrap group-hover:text-gray-100 transition-colors">
                                                    {skill.name}
                                                </span>
                                                {skill.period && (
                                                    <span className="text-[10px] font-rajdhani text-neon-blue/70 ml-auto pl-2 whitespace-nowrap border-l border-gray-700">
                                                        {skill.period}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Design Philosophy */}
                <div className="w-full p-6 md:p-8 relative bg-black/60">
                    {/* Background grid pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle at center, #1a202c 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative z-10 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-100 mb-6 tracking-wider border-l-4 border-neon-blue pl-3">
                            {t.philosophyTitle}
                        </h3>
                        <div className="text-sm md:text-base text-gray-400 leading-relaxed font-rajdhani whitespace-pre-line space-y-4">
                            <div className="mb-6 p-4 border border-neon-blue/40 bg-neon-blue/10 rounded-sm shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                                <p className="text-neon-blue font-bold text-center tracking-wide text-sm md:text-base">
                                    <span className="inline-block">私は「実装速度の最大化」ではなく</span>
                                    <span className="inline-block">「完成確率の最大化」を優先しています。</span>
                                </p>
                            </div>

                            <p className="text-gray-300">
                                本ポートフォリオでは、状態数の増加や並行処理が発生する状況において、「状態競合の防止」と「責務分離による拡張性確保」を設計方針としています。
                            </p>

                            <ul className="list-disc list-inside space-y-1 my-4 ml-2 text-gray-300">
                                <li>状態競合を防ぐための明示的な状態遷移管理</li>
                                <li>責務分離による拡張性および保守性の確保</li>
                                <li>実行順序を考慮した制御設計（Update / FixedUpdateの分離）</li>
                            </ul>

                            <p className="text-gray-300 mt-2">
                                これらの設計方針により、状態競合による不具合の局所化と、機能追加時の影響範囲の限定を実現し、チーム開発における安全な並行実装を可能にしています。
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;
