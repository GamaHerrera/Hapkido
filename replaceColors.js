const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            walk(file, results);
        } else { 
            if (/\.(astro|css|ts)$/.test(file)) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    
    let original = content;

    content = content.replace(/bg-zinc-950/g, 'bg-primary');
    content = content.replace(/from-zinc-950/g, 'from-primary');
    content = content.replace(/via-zinc-950/g, 'via-primary');
    content = content.replace(/to-zinc-950/g, 'to-primary');
    content = content.replace(/text-zinc-950/g, 'text-primary');
    content = content.replace(/bg-zinc-900/g, 'bg-[#0f1422]');
    content = content.replace(/zinc-950/g, 'primary'); // Fallback

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
