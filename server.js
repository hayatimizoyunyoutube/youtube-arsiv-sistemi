const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  const file = path.join(__dirname, 'index.html');
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(fs.readFileSync(file));
}).listen(port, () => console.log('Hayatımız Oyun v0.1.9 çalışıyor: http://localhost:' + port));
