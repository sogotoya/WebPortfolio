const fs = require('fs');
let content = fs.readFileSync('./src/constants/m_ProjectData.js', 'utf8');

// The issue is that I replaced text with real newlines instead of \\n
content = content.replace(/担当：ゲームシーン設計・実装全般\n\n/g, '担当：ゲームシーン設計・実装全般\\n\\n');
content = content.replace(/Role: Game scene design & full implementation\n\n/g, 'Role: Game scene design & full implementation\\n\\n');
content = content.replace(/プログラムリーダー・キャラクター実装担当\n\n/g, 'プログラムリーダー・キャラクター実装担当\\n\\n');
content = content.replace(/Program Leader & Character Implementation\n\n/g, 'Program Leader & Character Implementation\\n\\n');

fs.writeFileSync('./src/constants/m_ProjectData.js', content, 'utf8');
console.log('Fix complete.');
