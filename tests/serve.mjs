// A tiny web server for the Maths Lab tests. It serves the repository folder on a free port,
// the way GitHub Pages does, because the maths fonts do not load from a plain file path.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TYPES = {'.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain'};
export function serve(root = ROOT) {
  const server = http.createServer((req, res) => {
    const p = path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
    const file = path.join(root, p || 'index.html');
    if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end('not found'); return; }
      res.writeHead(200, {'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream'});
      res.end(data);
    });
  });
  return new Promise(ok => server.listen(0, '127.0.0.1', () => ok({url: 'http://127.0.0.1:' + server.address().port + '/', close: () => server.close()})));
}
