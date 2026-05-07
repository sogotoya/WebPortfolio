const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace <img that doesn't have loading="lazy"
            const imgRegex = /<(motion\.)?img\b(?![^>]*loading=["']lazy["'])/g;
            if (imgRegex.test(content)) {
                content = content.replace(imgRegex, '<$1img loading="lazy" decoding="async"');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
