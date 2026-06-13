const fs = require('fs');
const path = require('path');

const VERSION = 'v0.1.9';
const root = __dirname;
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.copyFileSync(path.join(root, 'index.html'), path.join(dist, 'index.html'));

console.log('✅ Hayatımız Oyun Arşiv Sistemi ' + VERSION + ' build başarılı');
console.log('✅ Vercel Output Directory: dist');
console.log('✅ Supabase: Bu sürüm demo veri, SQL v0.2.0 sürümünde aktif olacak');
