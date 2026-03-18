const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) { 
            walk(fullPath, results);
        } else { 
            if (/\.(astro|css|ts)$/.test(fullPath)) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/bg-zinc-950/g, 'bg-primary');
    content = content.replace(/from-zinc-950/g, 'from-primary');
    content = content.replace(/via-zinc-950/g, 'via-primary');
    content = content.replace(/to-zinc-950/g, 'to-primary');
    content = content.replace(/text-zinc-950/g, 'text-primary');
    content = content.replace(/bg-zinc-900/g, 'bg-[#0f1422]');
    content = content.replace(/zinc-950/g, 'primary'); // Fallback para otras utilidades

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
