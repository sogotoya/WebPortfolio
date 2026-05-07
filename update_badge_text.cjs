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

    // ProjectCard.jsx & Monitors: Replace FEATURED
    content = content.replace(/>★<\/span>\s*FEATURED\s*<\/span>/g, '>★</span> 注目作品</span>');
    content = content.replace(/>★\s*FEATURED\s*<\/span>/g, '>★ 注目作品</span>');
    
    // ProjectCard.jsx & Monitors: Replace NEW ENTRY and NEW
    content = content.replace(/>✨<\/span>\s*NEW ENTRY\s*<\/span>/g, '>✨</span> 最新作</span>');
    content = content.replace(/>✨\s*NEW ENTRY\s*<\/span>/g, '>✨ 最新作</span>');
    
    // For smaller badges in lists that just say "NEW"
    content = content.replace(/>NEW<\/span>/g, '>最新作</span>');
    
    // For smaller badges in lists that just say "★"
    // Wait, the ★ badge in monitors was just "★", maybe change it to "★ 注目" or leave as is if user only complained about English.
    // User said "英語と日本語ごちゃごちゃダメです" (Mixing English and Japanese is bad).
    // Let's replace the tiny "★" with "★ 注目" to be safe.
    content = content.replace(/>★<\/span>/g, '>★ 注目</span>');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated Japanese badges in: ${relPath}`);
}
