const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('site runtime binds filters, result cards, details, and clipboard feedback', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  for (const marker of ['OSUNM_CATALOG.filterTemplates', 'templateDialog', 'navigator.clipboard.writeText', 'keydown', 'aria-pressed', 'showModal', 'template-card--long', '长图案例']) {
    assert.ok(app.includes(marker), `runtime should implement ${marker}`);
  }
});

test('static layout defines responsive masonry and preserves complete poster images', () => {
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  for (const marker of ['grid-template-columns', 'object-fit:contain', '.poster-long-note', '@media']) {
    assert.ok(css.includes(marker), `styles should include ${marker}`);
  }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.ok(html.includes('历史案例'), 'page should identify examples as historical material');
});
