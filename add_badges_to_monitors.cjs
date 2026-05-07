const fs = require('fs');
const path = require('path');

const files = [
    'GameJamMonitor.jsx',
    'ToolMonitor.jsx',
    'VRChatWorldMonitor.jsx'
];

for (const fileName of files) {
    const fullPath = path.join(__dirname, 'src', 'components', fileName);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. MobileListItem title replacement
    content = content.replace(
        /<div className="flex-1 min-w-0 text-left">\s*<div className="text-sm font-orbitron text-gray-200 truncate tracking-wide">\s*\{item\.title\}\s*<\/div>/g,
        `<div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                        <div className="text-sm font-orbitron text-gray-200 truncate tracking-wide">
                            {item.title}
                        </div>
                        {item.isFeatured && <span className="text-[8px] bg-purple-900/80 text-purple-200 px-1 py-0.5 border border-purple-500/50 rounded-sm whitespace-nowrap">★</span>}
                        {item.isNew && <span className="text-[8px] bg-neon-blue/20 text-neon-blue px-1 py-0.5 border border-neon-blue/50 rounded-sm whitespace-nowrap">NEW</span>}
                        {item.status?.awards && <span className="text-[8px] bg-yellow-900/80 text-yellow-200 px-1 py-0.5 border border-yellow-500/50 rounded-sm whitespace-nowrap">🏆 {item.status.awards}</span>}
                    </div>`
    );

    // 2. PC List Title replacement
    content = content.replace(
        /<div className="flex-1 min-w-0">\s*<div className={`text-sm font-orbitron truncate tracking-wide\s*\${isActive \? 'text-neon-blue' : 'text-gray-300 group-hover:text-white'}`}>\s*\{item\.title\}\s*<\/div>/g,
        `<div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <div className={\`text-sm font-orbitron truncate tracking-wide
                                                \${isActive ? 'text-neon-blue' : 'text-gray-300 group-hover:text-white'}\`}>
                                                {item.title}
                                            </div>
                                            {item.isFeatured && <span className="text-[8px] bg-purple-900/80 text-purple-200 px-1 py-0.5 border border-purple-500/50 rounded-sm whitespace-nowrap">★</span>}
                                            {item.isNew && <span className="text-[8px] bg-neon-blue/20 text-neon-blue px-1 py-0.5 border border-neon-blue/50 rounded-sm whitespace-nowrap">NEW</span>}
                                            {item.status?.awards && <span className="text-[8px] bg-yellow-900/80 text-yellow-200 px-1 py-0.5 border border-yellow-500/50 rounded-sm whitespace-nowrap">🏆</span>}
                                        </div>`
    );

    // 3. Preview Monitor Title replacement
    content = content.replace(
        /<div className="flex-1 pr-4">\s*<h3 className="text-base font-orbitron font-bold text-white tracking-wide">\s*\{activeBackgroundItem\.title\}\s*<\/h3>/g,
        `<div className="flex-1 pr-4">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <h3 className="text-base font-orbitron font-bold text-white tracking-wide">
                                                {activeBackgroundItem.title}
                                            </h3>
                                            {activeBackgroundItem.isFeatured && <span className="text-[9px] bg-purple-900/80 text-purple-200 px-1.5 py-0.5 border border-purple-500/50 rounded-sm whitespace-nowrap shadow-[0_0_5px_rgba(168,85,247,0.4)]">★ FEATURED</span>}
                                            {activeBackgroundItem.isNew && <span className="text-[9px] bg-neon-blue/20 text-neon-blue px-1.5 py-0.5 border border-neon-blue/50 rounded-sm whitespace-nowrap shadow-[0_0_5px_rgba(0,243,255,0.3)]">✨ NEW ENTRY</span>}
                                            {activeBackgroundItem.status?.awards && <span className="text-[9px] bg-yellow-900/80 text-yellow-200 px-1.5 py-0.5 border border-yellow-500/50 rounded-sm whitespace-nowrap shadow-[0_0_5px_rgba(234,179,8,0.4)]">🏆 {activeBackgroundItem.status.awards}</span>}
                                        </div>`
    );

    fs.writeFileSync(fullPath, content);
    console.log(`Updated: ${fileName}`);
}
