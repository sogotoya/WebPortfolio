const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'src/components/ProjectCard.jsx',
    'src/components/GameJamMonitor.jsx',
    'src/components/ToolMonitor.jsx',
    'src/components/VRChatWorldMonitor.jsx'
];

for (const relPath of filesToUpdate) {
    const fullPath = path.join(__dirname, relPath);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');

    // Replace the "最新作" span in ProjectCard
    content = content.replace(
        /<span className="inline-flex items-center gap-1 px-2 py-0\.5 text-\[10px\] font-orbitron font-bold tracking-widest bg-neon-blue\/20 text-neon-blue border border-neon-blue\/50 backdrop-blur-sm shadow-\[0_0_8px_rgba\(0,243,255,0\.4\)\]">\s*<span className="text-white text-xs">✨<\/span> 最新作<\/span>/g,
        '<span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-widest bg-pink-900/80 text-pink-100 border border-pink-500/60 backdrop-blur-sm shadow-[0_0_8px_rgba(236,72,153,0.5)]">\n                                <span className="text-pink-400 text-xs">✨</span> 最新作</span>'
    );

    // Replace in Monitors (small list items)
    content = content.replace(
        /\{item\.isNew && <span className="text-\[8px\] bg-neon-blue\/20 text-neon-blue px-1 py-0\.5 border border-neon-blue\/50 rounded-sm whitespace-nowrap">最新作<\/span>\}/g,
        '{item.isNew && <span className="text-[8px] bg-pink-900/80 text-pink-200 px-1 py-0.5 border border-pink-500/60 rounded-sm whitespace-nowrap">✨ 最新作</span>}'
    );

    // Replace in Monitors (Preview title)
    content = content.replace(
        /\{activeBackgroundItem\.isNew && <span className="text-\[9px\] bg-neon-blue\/20 text-neon-blue px-1\.5 py-0\.5 border border-neon-blue\/50 rounded-sm whitespace-nowrap shadow-\[0_0_5px_rgba\(0,243,255,0\.3\)\]">✨ 最新作<\/span>\}/g,
        '{activeBackgroundItem.isNew && <span className="text-[9px] bg-pink-900/80 text-pink-100 px-1.5 py-0.5 border border-pink-500/60 rounded-sm whitespace-nowrap shadow-[0_0_8px_rgba(236,72,153,0.5)]">✨ 最新作</span>}'
    );

    fs.writeFileSync(fullPath, content);
    console.log(`Updated color in: ${relPath}`);
}
