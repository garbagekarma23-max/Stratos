// The picture files that figures show (src/06-figure.js, kinds diagram and image), for the content check.
// pictureEnv() gives FIG.problems what it needs to check a picture: the records in pictures/licences.json, and each file
// read from the repository, with an image's size in pixels read from the start of its file. folderProblems() checks the
// folder as a whole: every file has a record, every record has a file, and nothing else is in it.
import fs from 'fs';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname;

/* The width and height of a JPEG, PNG or WebP from its bytes, or null when it is none of these. */
export function imageSize(b) {
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const t = b.toString('ascii', 12, 16);
    if (t === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (t === 'VP8L') { const n = b.readUInt32LE(21); return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1]; }
    if (t === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    return null;
  }
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1], len = b.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + len;
    }
  }
  return null;
}

export function readRecords(root = ROOT) {
  return JSON.parse(fs.readFileSync(path.join(root, 'pictures', 'licences.json'), 'utf8'));
}

/* What FIG.problems takes as env. */
export function pictureEnv(root = ROOT) {
  const records = readRecords(root);
  return {
    records,
    read(src) {
      const file = path.join(root, src);
      if (!src.startsWith('pictures/') || src.includes('..') || !fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
      const bytes = fs.readFileSync(file);
      return {bytes: bytes.length, size: imageSize(bytes), text: src.endsWith('.svg') ? bytes.toString('utf8') : ''};
    }
  };
}

/* Problems with the folder: a file with no record, a record with no file, a file the site cannot use, and a picture
   no point shows (used is the set of srcs the points show). */
export function folderProblems(used, root = ROOT) {
  const out = [], recs = readRecords(root), listed = new Set();
  for (const group of ['images', 'diagrams']) {
    if (!recs[group] || typeof recs[group] !== 'object') { out.push('pictures/licences.json has no "' + group + '"'); continue; }
    for (const src of Object.keys(recs[group])) {
      listed.add(src);
      if (!fs.existsSync(path.join(root, src))) out.push('pictures/licences.json has a record for ' + src + ', but there is no such file');
      if (!(group === 'images' ? /^pictures\/images\// : /^pictures\/diagrams\//).test(src)) out.push('pictures/licences.json lists ' + src + ' under "' + group + '", but it is not in pictures/' + group);
      if (!used.has(src)) out.push(src + ' is in pictures/licences.json, but no point shows it');
    }
  }
  for (const group of ['images', 'diagrams']) {
    const dir = path.join(root, 'pictures', group);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) if (!listed.has('pictures/' + group + '/' + name)) out.push('pictures/' + group + '/' + name + ' has no record in pictures/licences.json');
  }
  for (const name of fs.readdirSync(path.join(root, 'pictures'))) if (!['images', 'diagrams', 'licences.json'].includes(name)) out.push('pictures/' + name + ' should not be there: pictures holds images/, diagrams/ and licences.json');
  return out;
}
