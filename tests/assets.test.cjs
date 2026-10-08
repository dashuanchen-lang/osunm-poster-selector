const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'assets', 'case-manifest.json');
const templateIds = Array.from({ length: 19 }, (_, index) => `OSM-${String(index + 1).padStart(2, '0')}`);

test('curated case manifest provides a valid local JPEG for every OSM template', () => {
  assert.ok(fs.existsSync(manifestPath), 'case-manifest.json should exist');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert.ok(Array.isArray(manifest.cases), 'manifest.cases should be an array');

  const ids = new Set();
  const coveredTemplates = new Set();
  for (const item of manifest.cases) {
    assert.ok(item.id && !ids.has(item.id), `case id must be unique: ${item.id}`);
    ids.add(item.id);
    coveredTemplates.add(item.templateId);
    assert.ok(/^\d{3}$/.test(item.sourceId), `sourceId must be a three-digit poster ID: ${item.sourceId}`);
    assert.ok(/^\d{3}\.jpg$/.test(item.file), `case file should be a numbered JPEG: ${item.file}`);

    const imagePath = path.join(root, 'assets', 'cases', item.file);
    assert.ok(fs.existsSync(imagePath), `missing case image: ${item.file}`);
    const bytes = fs.readFileSync(imagePath);
    assert.ok(bytes.length > 10_000, `case image is unexpectedly small: ${item.file}`);
    assert.equal(bytes[0], 0xff, `${item.file} should have a JPEG SOI marker`);
    assert.equal(bytes[1], 0xd8, `${item.file} should have a JPEG SOI marker`);
  }

  for (const file of ['011.jpg', '144.jpg', '148.jpg']) {
    const imagePath = path.join(root, 'assets', 'cases', file);
    const dimensions = require('node:fs').readFileSync(imagePath);
    const { width, height } = (function jpegDimensions(bytes) {
      let offset = 2;
      while (offset < bytes.length) {
        if (bytes[offset] !== 0xff) { offset += 1; continue; }
        const marker = bytes[offset + 1];
        const length = bytes.readUInt16BE(offset + 2);
        if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
          return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
        }
        offset += 2 + length;
      }
      throw new Error(`JPEG dimensions not found: ${file}`);
    })(dimensions);
    assert.ok(width / height > 0.06, `${file} thumbnail must preserve its original long-page ratio while keeping legible width`);
  }

  for (const id of templateIds) assert.ok(coveredTemplates.has(id), `${id} needs at least one sample`);
});

test('site shell exposes the customer browsing and template preview landmarks', () => {
  const pagePath = path.join(root, 'index.html');
  assert.ok(fs.existsSync(pagePath), 'index.html should exist');
  const html = fs.readFileSync(pagePath, 'utf8');
  for (const marker of ['id="categoryFilters"', 'id="searchInput"', 'id="formatFilter"', 'id="templateWall"', 'id="templateDialog"']) {
    assert.ok(html.includes(marker), `site shell should expose ${marker}`);
  }
});

test('template catalog covers all 19 OSM templates with valid multi-category case references', () => {
  const sourcePath = path.join(root, 'assets', 'templates.js');
  assert.ok(fs.existsSync(sourcePath), 'templates.js should exist');
  const vm = require('node:vm');
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(sourcePath, 'utf8'), context);
  const templates = context.window.OSUNM_TEMPLATES;
  assert.equal(templates.length, 19);
  assert.deepEqual(Array.from(new Set(templates.map((item) => item.id))).sort(), templateIds);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const knownFiles = new Set(manifest.cases.map((item) => item.file));
  const categories = new Set(['门窗系统五金', '门锁/碰锁/勾锁', '执手/把手', '铰链/合页', '滑轮/推拉部件', '工程与详情页']);
  for (const item of templates) {
    for (const key of ['name', 'format', 'ratio', 'use', 'composition', 'tags']) assert.ok(item[key], `${item.id} missing ${key}`);
    assert.ok(Array.isArray(item.categories) && item.categories.length, `${item.id} needs categories`);
    for (const category of item.categories) assert.ok(categories.has(category), `unknown category ${category}`);
    assert.ok(Array.isArray(item.cases) && item.cases.length, `${item.id} needs cases`);
    for (const file of item.cases) assert.ok(knownFiles.has(file), `${item.id} references unknown case ${file}`);
  }
});

test('catalog combines product category, format, and case-insensitive text filters', () => {
  const vm = require('node:vm');
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets', 'catalog.js'), 'utf8'), context);
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets', 'templates.js'), 'utf8'), context);
  const { filterTemplates } = context.window.OSUNM_CATALOG;
  const templates = context.window.OSUNM_TEMPLATES;

  assert.deepEqual(Array.from(filterTemplates(templates, { category: '执手/把手' }).map((item) => item.id)), ['OSM-03', 'OSM-04', 'OSM-05', 'OSM-07', 'OSM-08', 'OSM-09', 'OSM-10', 'OSM-12', 'OSM-19']);
  assert.deepEqual(Array.from(filterTemplates(templates, { category: '工程与详情页', format: 'long' }).map((item) => item.id)), ['OSM-07']);
  assert.deepEqual(Array.from(filterTemplates(templates, { query: 'osm-14' }).map((item) => item.id)), ['OSM-14']);
  assert.deepEqual(Array.from(filterTemplates(templates, { query: '纵向长比例' }).map((item) => item.id)), ['OSM-14']);
});
