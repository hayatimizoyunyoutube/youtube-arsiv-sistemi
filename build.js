const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(dist, 'index.html'));
console.log('v0.1.1 build basarili - dist hazir');
