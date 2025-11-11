/* GHIPS Docs Admin App - Express server */
const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const fssync = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 5080;

// Base directory is the repository root: two levels up from this file
const repoRoot = path.resolve(__dirname, '..', '..');

// Allowlisted folders to expose via API (relative to repoRoot)
const ALLOW_DIRS = [
  'Activos',
  'Asistencial',
  'FevRips',
  'Financiero',
  'PQRS',
  'Auditoria'
];

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use('/', express.static(path.join(__dirname, '..', 'public')));

function isAllowedFile(absPath) {
  const rel = path.relative(repoRoot, absPath);
  if (rel.startsWith('..')) return false; // outside repo
  const top = rel.split(path.sep)[0];
  return ALLOW_DIRS.includes(top);
}

function safeJoinRelative(relPath) {
  const cleaned = relPath.replace(/\\/g, '/');
  const abs = path.resolve(repoRoot, cleaned);
  if (!isAllowedFile(abs)) {
    const err = new Error('Path not allowed');
    err.status = 400;
    throw err;
  }
  return abs;
}

async function buildTree(dirAbs) {
  const items = await fs.readdir(dirAbs, { withFileTypes: true });
  const children = [];
  for (const it of items) {
    // Ignore dotfiles and node_modules-like dirs
    if (it.name.startsWith('.')) continue;
    if (it.name === 'node_modules' || it.name === 'dist') continue;
    const abs = path.join(dirAbs, it.name);
    if (!isAllowedFile(abs)) continue;
    if (it.isDirectory()) {
      children.push({
        type: 'dir',
        name: it.name,
        path: path.relative(repoRoot, abs),
        children: await buildTree(abs)
      });
    } else if (it.isFile() && it.name.toLowerCase().endsWith('.md')) {
      children.push({
        type: 'file',
        name: it.name,
        path: path.relative(repoRoot, abs)
      });
    }
  }
  // Sort: dirs first then files, alphabetical
  children.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1));
  return children;
}

app.get('/api/tree', async (req, res) => {
  try {
    const roots = [];
    for (const dir of ALLOW_DIRS) {
      const abs = path.join(repoRoot, dir);
      if (!fssync.existsSync(abs)) continue;
      roots.push({
        type: 'dir',
        name: dir,
        path: dir,
        children: await buildTree(abs)
      });
    }
    res.json({ ok: true, roots });
  } catch (err) {
    res.status(err.status || 500).json({ ok: false, message: err.message });
  }
});

app.get('/api/file', async (req, res) => {
  try {
    const relPath = req.query.path;
    if (!relPath) return res.status(400).json({ ok: false, message: 'Missing path' });
    const abs = safeJoinRelative(relPath);
    const data = await fs.readFile(abs, 'utf8');
    res.json({ ok: true, path: path.relative(repoRoot, abs), content: data });
  } catch (err) {
    res.status(err.status || 500).json({ ok: false, message: err.message });
  }
});

app.put('/api/file', async (req, res) => {
  try {
    const { path: relPath, content } = req.body || {};
    if (!relPath) return res.status(400).json({ ok: false, message: 'Missing path' });
    const abs = safeJoinRelative(relPath);
    await fs.writeFile(abs, content ?? '', 'utf8');
    res.json({ ok: true });
  } catch (err) {
    res.status(err.status || 500).json({ ok: false, message: err.message });
  }
});

app.post('/api/render', async (req, res) => {
  try {
    const { content } = req.body || {};
    const html = marked.parse(content || '');
    res.json({ ok: true, html });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`GHIPS Docs Admin App listening on http://localhost:${PORT}`);
});
