const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, 'public');
let totalOriginalSize = 0;
let totalNewSize = 0;

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                const webpPath = fullPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
                
                try {
                    // Check if the file is already a webp disguised as something else or just convert it
                    const info = await sharp(fullPath)
                        .webp({ quality: 80 })
                        .toFile(webpPath);
                    
                    const originalSize = stat.size;
                    const newSize = info.size;
                    totalOriginalSize += originalSize;
                    totalNewSize += newSize;

                    console.log(`Converted: ${path.relative(__dirname, fullPath)}`);
                    console.log(`  Size: ${(originalSize / 1024).toFixed(2)} KB -> ${(newSize / 1024).toFixed(2)} KB`);

                    // Delete original
                    fs.unlinkSync(fullPath);
                } catch (error) {
                    console.error(`Error converting ${fullPath}:`, error);
                }
            }
        }
    }
}

async function run() {
    console.log('Starting WebP conversion...');
    await processDirectory(targetDir);
    console.log('Conversion complete!');
    console.log(`Total Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total New Size: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Saved: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)} MB (${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(2)}%)`);
}

run();
