import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
    Terminal, FileCode2, Code2, Box, Wrench, Layers,
    MonitorPlay, Video, Palette, Component, Zap, Bot, Package, Music, Github
} from 'lucide-react';

const ProfileSection = () => {
    const { language } = useLanguage();
    const isEn = language === 'en';

    const skillCategories = [
        // 行1左
        {
            category: isEn ? "Programming Languages" : "プログラミング言語",
            skills: [
                { name: "C", icon: <Terminal size={16} strokeWidth={1.5} /> },
                { name: "C++", icon: <Code2 size={16} strokeWidth={1.5} /> },
                { name: "C#", icon: <FileCode2 size={16} strokeWidth={1.5} /> },
            ]
        },
        // 行1右
        {
            category: isEn ? "Libraries" : "ライブラリ",
            skills: [
                { name: "OpenGL", icon: <Layers size={16} strokeWidth={1.5} /> },
            ]
        },
        // 行2左
        {
            category: isEn ? "Game Engines" : "ゲームエンジン",
            skills: [
                { name: "Unity", icon: <Box size={16} strokeWidth={1.5} /> },
            ]
        },
        // 行2右
        {
            category: "IDE / Tools",
            gridClass: "grid-cols-3",
            skills: [
                { name: "Visual Studio 2022", icon: <MonitorPlay size={16} strokeWidth={1.5} /> },
                { name: "Visual Studio Code", icon: <Code2 size={16} strokeWidth={1.5} /> },
                { name: "GitHub", icon: <Github size={16} strokeWidth={1.5} /> },
                { name: "VRChat Creator\nCompanion", icon: <Wrench size={16} strokeWidth={1.5} /> },
                { name: "Antigravity", icon: <Zap size={16} strokeWidth={1.5} /> },
                { name: "Claude Code", icon: <Bot size={16} strokeWidth={1.5} /> },
            ]
        },
        // 行3左
        {
            category: isEn ? "Software" : "ソフトウェア",
            skills: [
                { name: "Blender", icon: <Component size={16} strokeWidth={1.5} /> },
                { name: "GIMP", icon: <Palette size={16} strokeWidth={1.5} /> },
                { name: "Studio One", icon: <Music size={16} strokeWidth={1.5} /> },
                { name: "DaVinci Resolve", icon: <Video size={16} strokeWidth={1.5} /> },
            ]
        },
        // 行3右
        {
            category: isEn ? "Unity Packages" : "Unityパッケージ",
            skills: [
                { name: "UniTask", icon: <Package size={16} strokeWidth={1.5} /> },
                { name: "Netcode for\nGameObjects", icon: <Package size={16} strokeWidth={1.5} /> },
                { name: "DOTween", icon: <Package size={16} strokeWidth={1.5} /> },
                { name: "Cinemachine", icon: <Package size={16} strokeWidth={1.5} /> },
            ]
        }
    ];


    const content = {
        ja: {
            title: "PROFILE",
            nameLabel: "NAME",
            name: "柊弥",
            ageLabel: "AGE",
            age: "20",
            roleLabel: "ROLE",
            role: "プログラマ",
            skillTitle: "SKILLS",
            philosophyTitle: "■ 設計ポリシー",
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

            <div className="flex flex-col">
                {/* Top Row: Basic Info & Skills */}
                <div className="flex flex-col lg:flex-row border-b border-gray-800">
                    {/* Left: Basic Info */}
                    <div className="w-full lg:w-4/12 p-6 border-b lg:border-b-0 lg:border-r border-gray-800 bg-black/60 relative">
                        <h2 className="text-xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-400 mb-6 tracking-widest">
                            {t.title}
                        </h2>

                        <div className="space-y-4">
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
                    </div>

                    {/* Right: Skills */}
                    <div className="w-full lg:w-8/12 p-6 bg-black/40 relative">
                        <h3 className="text-[11px] font-orbitron text-neon-blue/80 tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse-slow"></span>
                            {t.skillTitle}
                        </h3>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                            {skillCategories.map((categoryGroup, categoryIndex) => (
                                <div key={categoryIndex}>
                                    <h4 className="text-[10px] text-gray-400 font-rajdhani tracking-wider mb-2 border-b border-gray-800/50 pb-1">
                                        {categoryGroup.category}
                                    </h4>
                                    <div className={`grid gap-1.5 ${categoryGroup.gridClass || "grid-cols-4"}`}>
                                        {categoryGroup.skills.map((skill, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center justify-center p-1.5 h-14 border border-gray-800 bg-black/40 rounded-sm"
                                            >
                                                <div className="text-gray-500 mb-1">
                                                    {skill.icon}
                                                </div>
                                                <span className="text-[9px] font-rajdhani text-gray-400 text-center tracking-wider break-words w-full whitespace-pre-line leading-tight">
                                                    {skill.name}
                                                </span>
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
                        <h3 className="text-lg font-bold text-gray-100 mb-6 tracking-wider border-l-4 border-neon-blue pl-3">
                            {t.philosophyTitle}
                        </h3>
                        <div className="text-[13px] md:text-sm text-gray-400 leading-relaxed font-rajdhani whitespace-pre-line space-y-4">
                            <p className="text-gray-300">
                                {isEn
                                    ? "In this portfolio, I apply \"prevention of state conflicts\" and \"ensuring extensibility through separation of responsibilities\" as design principles in situations involving increasing state complexity or concurrent processing."
                                    : "本ポートフォリオでは、状態数の増加や並行処理が発生する状況において、「状態競合の防止」と「責務分離による拡張性確保」を設計方針としています。"}
                            </p>

                            <ul className="list-disc list-inside space-y-1 my-4 ml-2 text-gray-300">
                                <li>{isEn ? "Explicit state transition management to prevent state conflicts" : "状態競合を防ぐための明示的な状態遷移管理"}</li>
                                <li>{isEn ? "Ensuring extensibility and maintainability through separation of responsibilities" : "責務分離による拡張性および保守性の確保"}</li>
                                <li>{isEn ? "Execution-order-aware control design (Update / FixedUpdate separation)" : "実行順序を考慮した制御設計（Update / FixedUpdateの分離）"}</li>
                            </ul>

                            <p className="text-gray-300 mt-2">
                                {isEn
                                    ? "These design principles enable localization of bugs caused by state conflicts, limitation of impact scope during feature additions, and safe parallel implementation in team development."
                                    : "これらの設計方針により、状態競合による不具合の局所化と、機能追加時の影響範囲の限定を実現し、チーム開発における安全な並行実装を可能にしています。"}
                            </p>

                            <div className="mt-6 p-4 border border-neon-blue/40 bg-neon-blue/10 rounded-sm shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                                <p className="text-neon-blue font-bold text-center tracking-wide text-sm md:text-base">
                                    {isEn ? "I prioritize \"maximizing the probability of completion\" over \"maximizing implementation speed.\"" : (
                                        <>
                                            <span className="inline-block">私は「実装速度の最大化」ではなく</span>
                                            <span className="inline-block">「完成確率の最大化」を優先しています。</span>
                                        </>
                                    )}
                                </p>
                            </div>

                            <div className="mt-4 p-3 border-l-2 border-gray-600 bg-black/30">
                                <p className="text-gray-500 text-[12px] md:text-[13px] leading-relaxed">
                                    {isEn
                                        ? "On the other hand, prioritizing design abstraction has sometimes slowed initial implementation speed, particularly leading to over-engineering in short-term development. I have since improved my approach by allowing simplified implementations during prototyping and applying full design rigor after specifications are finalized."
                                        : "一方で、設計の抽象度を優先するあまり初期実装速度が低下する傾向があり、特に短期開発では過剰設計となるケースがありました。そのため現在は、プロトタイピング段階では簡易実装を許容し、仕様確定後に設計を適用する運用へ改善しています。"}
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
