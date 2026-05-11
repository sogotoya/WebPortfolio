import React from 'react';
import { Link } from 'react-router-dom';
import {
    Wrench, Layers, Glasses, Component, Bot, Package,
    CalendarDays, MapPin, Briefcase, Trophy
} from 'lucide-react';
import { SiGithub, SiUnity } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { DiVisualstudio } from 'react-icons/di';
import { VscVscode } from 'react-icons/vsc';

const ProfileSection = () => {

    // Left column: Unity設計系
    const leftCategories = [
        {
            category: "Core Development",
            skills: [
                { name: "Unity", icon: <SiUnity size={16} />, size: "lg" },
                { name: "C#", icon: <TbBrandCSharp size={16} />, size: "lg" },
                { name: "OpenGL", icon: <Layers size={14} /> },
                { name: "XR Interaction Toolkit", icon: <Glasses size={14} /> },
                { name: "UI System", icon: <Component size={14} /> },
            ]
        },
        {
            category: "Architecture",
            skills: [
                { name: "State Machine", icon: <Layers size={14} /> },
                { name: "UniTask", icon: <Package size={14} /> },
                { name: "Netcode", icon: <Package size={14} /> },
            ]
        },
    ];

    // Right column: XR・ツール系
    const rightCategories = [
        {
            category: "XR / Platform",
            skills: [
                { name: "Meta Quest", icon: <Glasses size={14} /> },
                { name: "XREAL", icon: <Glasses size={14} /> },
                { name: "VRChat SDK", icon: <Wrench size={14} /> },
            ]
        },
        {
            category: "Tools",
            skills: [
                { name: "GitHub", icon: <SiGithub size={14} /> },
                { name: "Visual Studio", icon: <DiVisualstudio size={14} /> },
                { name: "VSCode", icon: <VscVscode size={14} />, size: "sm" },
                { name: "Claude Code", icon: <Bot size={14} />, size: "sm" },
            ]
        },
    ];

    const sizeClasses = {
        lg: "px-4 py-2.5 text-sm border-gray-700",
        default: "px-3 py-2 text-xs border-gray-800",
        sm: "px-2.5 py-1.5 text-[11px] border-gray-800/70",
    };

    const renderCategory = (categoryGroup, categoryIndex) => (
        <div key={categoryIndex} className="flex flex-col">
            <h4 className="text-xs text-neon-blue/60 font-orbitron tracking-widest mb-3 border-l-2 border-neon-blue/30 pl-2 py-0.5">
                {categoryGroup.category}
            </h4>
            <div className="flex flex-wrap gap-2">
                {categoryGroup.skills.map((skill, index) => {
                    const size = skill.size || "default";
                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-2 ${sizeClasses[size]} border bg-black/40 rounded cursor-default select-none`}
                        >
                            <div className="text-gray-400 flex-shrink-0">
                                {skill.icon}
                            </div>
                            <span className="font-rajdhani text-gray-300 tracking-wider whitespace-nowrap">
                                {skill.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );


    const t = {
        title: "PROFILE",
        nameLabel: "NAME",
        name: "十河 柊弥",
        roleLabel: "ROLE",
        role: "Unity / XR Programmer",
        statusLabel: "STATUS",
        status: "実務インターン参加中",
        skillTitle: "SKILLS",
        philosophyTitle: "■ 完成確率を重視した設計",
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
                                <span className="text-xs font-orbitron text-gray-500 tracking-widest">{t.roleLabel}</span>
                                <span className="text-lg md:text-xl text-gray-200 font-rajdhani translate-y-0.5">{t.role}</span>
                            </div>
                            <div className="flex items-baseline gap-3 border-b border-gray-800 pb-1">
                                <span className="text-xs font-orbitron text-gray-500 tracking-widest">{t.statusLabel}</span>
                                <span className="text-lg md:text-xl text-gray-200 tracking-wider translate-y-0.5">{t.status}</span>
                            </div>
                        </div>
                    </div>

                    {/* Skills: 2-column layout */}
                    <div className="w-full p-6 bg-black/40 relative">
                        <h3 className="text-sm font-orbitron text-neon-blue/80 tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse-slow"></span>
                            {t.skillTitle}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            {/* Left: Unity設計系 */}
                            <div className="flex flex-col gap-8">
                                {leftCategories.map(renderCategory)}
                            </div>
                            {/* Right: XR・ツール系 */}
                            <div className="flex flex-col gap-8">
                                {rightCategories.map(renderCategory)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activities Section */}
                <div className="w-full p-6 md:p-8 border-b border-gray-800 bg-black/50 relative">
                    <h3 className="text-sm font-orbitron text-neon-blue/80 tracking-widest mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse-slow"></span>
                        ACTIVITIES
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-3 px-4 py-3 border border-gray-800 bg-black/40 rounded cursor-default select-none">
                            <div className="text-neon-pink/70 flex-shrink-0">
                                <MapPin size={16} />
                            </div>
                            <span className="text-sm text-gray-300 font-rajdhani tracking-wider">BitSummit 出展</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 border border-gray-800 bg-black/40 rounded cursor-default select-none">
                            <div className="text-neon-pink/70 flex-shrink-0">
                                <MapPin size={16} />
                            </div>
                            <span className="text-sm text-gray-300 font-rajdhani tracking-wider">ゲームパビリオンjp 2025 出展</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 border border-gray-800 bg-black/40 rounded cursor-default select-none">
                            <div className="text-neon-pink/70 flex-shrink-0">
                                <MapPin size={16} />
                            </div>
                            <span className="text-sm text-gray-300 font-rajdhani tracking-wider">神戸ゲームラビリンス2025 出展</span>
                        </div>
                    </div>
                </div>
                <div className="w-full p-6 md:p-8 relative bg-black/60">
                    {/* Background grid pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle at center, #1a202c 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative z-10 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-100 mb-6 tracking-wider border-l-4 border-neon-blue pl-3">
                            {t.philosophyTitle}
                        </h3>
                        <div className="text-sm md:text-base text-gray-400 leading-relaxed font-rajdhani whitespace-pre-line space-y-4">
                            <p className="text-gray-300">
                                実装中に発生した状態競合やUpdate順による不具合をきっかけに、現在は状態管理と責務分離を重視した設計を行っています。
                            </p>

                            <ul className="list-disc list-inside space-y-3 my-4 ml-2 text-gray-300">
                                <li>
                                    状態遷移を明示化し、競合を防止
                                    <span className="ml-2 text-xs">
                                        　→ <Link to="/project/1" className="text-[#d4a574] hover:underline hover:brightness-125 transition-all">Axis:Save</Link>
                                        <span className="text-gray-600 mx-1">/</span>
                                        <Link to="/project/gj-2" className="text-[#d4a574] hover:underline hover:brightness-125 transition-all">ゲームジャム高梁</Link>
                                    </span>
                                </li>
                                <li>
                                    処理責務を分離し、機能追加時の影響範囲を限定
                                    <span className="ml-2 text-xs">
                                        　→ <Link to="/project/1" className="text-[#d4a574] hover:underline hover:brightness-125 transition-all">Axis:Save</Link>
                                        <span className="text-gray-600 mx-1">/</span>
                                        <Link to="/project/2" className="text-[#d4a574] hover:underline hover:brightness-125 transition-all">PlanetariumVR</Link>
                                        <span className="text-gray-600 mx-1">/</span>
                                        <Link to="/project/gj-1" className="text-[#d4a574] hover:underline hover:brightness-125 transition-all">GGJ2026</Link>
                                    </span>
                                </li>
                                <li>
                                    Update / FixedUpdate を分離し、実行順序を整理
                                    <span className="ml-2 text-xs">
                                        　→ <Link to="/project/1" className="text-[#d4a574] hover:underline hover:brightness-125 transition-all">Axis:Save</Link>
                                    </span>
                                </li>
                            </ul>

                            <p className="text-gray-300 mt-2">
                                制作規模が大きくなっても、機能追加や修正を行いやすい構成を意識しています。
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;
