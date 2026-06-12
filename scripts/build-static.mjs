import fs from 'fs';
import path from 'path';

const root = process.cwd();
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const copyFile = (src, dest) => {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
};
const copyDir = (src, dest) => {
  if (!fs.existsSync(src)) return;
  fs.cpSync(src, dest, { recursive: true, force: true });
};

['index.html','404.html','robots.txt','sitemap.xml'].forEach(file => copyFile(path.join(root,file), path.join(dist,file)));
['assets','data','public'].forEach(dir => copyDir(path.join(root,dir), path.join(dist,dir)));

const index = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!index.includes('v4.0.5')) throw new Error('index.html içinde v4.0.5 etiketi yok');
const appPath = path.join(dist, 'assets', 'hayatimiz-app.js');
if (fs.existsSync(appPath)) {
  const app = fs.readFileSync(appPath, 'utf8');
  if (!app.includes("v4.0.5") && !app.includes("VERSION = 'v4.0.5'")) {
    throw new Error('app içinde v4.0.5 etiketi yok');
  }
}
console.log('✅ Hayatımız Oyun v4.0.5 statik build hazır.');
