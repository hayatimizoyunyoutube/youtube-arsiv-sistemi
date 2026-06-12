import fs from 'fs';
const index = fs.readFileSync('index.html','utf8');
const app = fs.readFileSync('assets/hayatimiz-app.js','utf8');
const css = fs.readFileSync('assets/hayatimiz-style.css','utf8');
if(!index.includes('v4.0.5')) throw new Error('index v4.0.5 etiketi yok');
if(!app.includes("const VERSION = 'v4.0.5'")) throw new Error('app v4.0.5 VERSION yok');
if(!css.includes('body')) throw new Error('CSS eksik');
console.log('v4.0.5 temiz final build kontrol başarılı.');
