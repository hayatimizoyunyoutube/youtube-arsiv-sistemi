import http from 'http';
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const port = process.env.PORT || 3000;
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.txt':'text/plain; charset=utf-8', '.xml':'application/xml; charset=utf-8' };
http.createServer((req,res)=>{
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = path.join(root, urlPath === '/' ? 'index.html' : urlPath.replace(/^\//,''));
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(root, 'index.html');
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Local preview: http://localhost:${port}`));
