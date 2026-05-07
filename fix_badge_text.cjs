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

    // Fix the mess:
    // <span className="text-purple-400 text-xs">★ 注目</span> 注目作品</span> -> <span className="text-purple-400 text-xs">★</span> 注目作品</span>
    content = content.replace(/<span className="text-purple-400 text-xs">★ 注目<\/span>\s*注目作品<\/span>/g, '<span className="text-purple-400 text-xs">★</span> 注目作品</span>');
    
    // Monitors:
    // {item.isFeatured && <span className="text-[8px] bg-purple-900/80 text-purple-200 px-1 py-0.5 border border-purple-500/50 rounded-sm whitespace-nowrap">★ 注目</span>}
    // This one is actually fine.
    
    // {activeBackgroundItem.isFeatured && <span className="text-[9px] bg-purple-900/80 text-purple-200 px-1.5 py-0.5 border border-purple-500/50 rounded-sm whitespace-nowrap shadow-[0_0_5px_rgba(168,85,247,0.4)]">★ 注目 注目作品</span>}
    // Let's check what happened to activeBackgroundItem.isFeatured
    content = content.replace(/>★ 注目\s*注目作品<\/span>/g, '>★ 注目作品</span>');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed in: ${relPath}`);
}
