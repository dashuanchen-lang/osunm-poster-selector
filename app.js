(function () {
  'use strict';

  const categoryOrder = ['门窗系统套件', '门锁/碰锁', '勾锁/长传动件', '执手/把手', '铰链/合页', '滑轮/推拉部件', '通用单品'];
  const availableCategories = new Set(window.OSUNM_TEMPLATES.map((template) => template.category));
  const categories = ['全部模板', ...categoryOrder.filter((category) => availableCategories.has(category))];
  const categoryFilters = document.querySelector('#categoryFilters');
  const searchInput = document.querySelector('#searchInput');
  const formatFilter = document.querySelector('#formatFilter');
  const wall = document.querySelector('#templateWall');
  const resultCount = document.querySelector('#resultCount');
  const emptyState = document.querySelector('#emptyState');
  const dialog = document.querySelector('#templateDialog');
  const dialogContent = document.querySelector('#dialogContent');
  const toast = document.querySelector('#toast');
  let activeCategory = 'all';
  let toastTimer;
  const templates = window.OSUNM_TEMPLATES;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function announce(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2300);
  }

  function renderCategories() {
    categoryFilters.innerHTML = categories.map((category, index) => {
      const value = index === 0 ? 'all' : category;
      const selected = activeCategory === value;
      const count = index === 0 ? templates.length : templates.filter((template) => template.category === category).length;
      return `<button class="category-chip${selected ? ' is-active' : ''}" type="button" data-category="${escapeHtml(value)}" aria-pressed="${selected}"><span>${escapeHtml(category)}</span><span class="category-count" aria-label="${count} 款">${count}</span></button>`;
    }).join('');
  }

  function renderWall() {
    const shown = window.OSUNM_CATALOG.filterTemplates(templates, {
      category: activeCategory,
      format: formatFilter.value,
      query: searchInput.value
    });
    const activeName = activeCategory === 'all' ? '' : ` · ${activeCategory}`;
    resultCount.textContent = `当前显示 ${shown.length} 款模板${activeName}`;
    emptyState.hidden = shown.length !== 0;
    wall.innerHTML = shown.map((template) => {
      const image = template.cases[0];
      const caseInfo = window.OSUNM_CASES.find((item) => item.file === image);
      const alt = `${template.id} ${template.name}案例：${caseInfo?.caption || template.use}`;
      const formatLabel = window.OSUNM_CATALOG.formatGuidance(template);
      return `<article class="template-card${template.format === 'long' ? ' template-card--long' : ''}">
        <button class="poster-button" type="button" data-template="${template.id}" aria-label="查看 ${template.id} ${escapeHtml(template.name)} 详情">
          <img class="poster-image" src="./assets/cases/${encodeURIComponent(image)}" alt="${escapeHtml(alt)}" loading="eager" decoding="async">
          <span class="poster-index">${template.id}</span><span class="poster-open" aria-hidden="true">↗</span>
          ${template.format === 'long' ? '<span class="poster-long-note">长图案例 · 点开看完整模块</span>' : ''}
        </button>
        <div class="template-card__info"><div class="template-card__heading"><span class="template-id">${template.id}</span><span class="format-pill format-pill--${template.format}">${formatLabel}</span></div>
          <h2>${escapeHtml(template.name)}</h2><p>${escapeHtml(template.use)}</p><button class="template-card__more" type="button" data-template="${template.id}">查看模板说明 <span aria-hidden="true">→</span></button></div>
      </article>`;
    }).join('');
  }

  function openDetails(id) {
    const template = templates.find((item) => item.id === id);
    if (!template) return;
    const formatLabel = escapeHtml(window.OSUNM_CATALOG.formatGuidance(template));
    const guidance = escapeHtml(window.OSUNM_CATALOG.ratioGuidance(template));
    const cases = template.cases.map((file) => {
      const item = window.OSUNM_CASES.find((entry) => entry.file === file);
      const metric = window.OSUNM_CASE_METRICS[file];
      const ratio = metric ? ` · 案例宽高比约 ${(metric.width / metric.height).toFixed(3)}:1` : '';
      return `<figure class="detail-case"><img src="./assets/cases/${encodeURIComponent(file)}" alt="${escapeHtml(item?.caption || file)}"><figcaption>${escapeHtml(item?.caption || '历史海报案例')}${ratio} · 完整构图参考</figcaption></figure>`;
    }).join('');
    dialogContent.innerHTML = `<div class="detail-layout"><div class="detail-gallery">${cases}</div><section class="detail-copy"><p class="eyebrow">POSTER TEMPLATE · ${template.id}</p><p class="detail-id">${template.id}</p><h2 id="dialogTitle">${escapeHtml(template.name)}</h2><span class="format-pill format-pill--${template.format}">${formatLabel}</span><h3>比例与制作方式</h3><p>${guidance}</p><h3>适合</h3><p>${escapeHtml(template.use)}</p><h3>构图方式</h3><p>${escapeHtml(template.composition)}</p><h3>标签</h3><div class="tag-list">${template.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join('')}</div><button class="button button--primary copy-template" type="button" data-copy="${template.id}">复制 ${template.id}</button><p class="detail-hint">选择后把编号告诉我们；新海报会替换为您本次确认的产品与文案。案例中的旧型号、参数及标记不会默认沿用。</p></section></div>`;
    dialog.showModal();
  }

  async function copyId(id, button) {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(id);
      announce(`已复制 ${id}`);
    } catch (_) {
      const range = document.createRange();
      const selection = window.getSelection();
      button.focus();
      button.textContent = `模板编号：${id}（请手动复制）`;
      const hint = dialogContent.querySelector('.detail-hint');
      hint.textContent = `复制权限不可用，请手动记下编号 ${id} 并告诉我们。案例旧信息不会默认沿用。`;
      range.selectNodeContents(button);
      selection.removeAllRanges();
      selection.addRange(range);
      announce(`无法自动复制，请手动记录 ${id}`);
    }
  }

  renderCategories();
  renderWall();

  categoryFilters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    activeCategory = button.dataset.category;
    renderCategories();
    renderWall();
  });
  searchInput.addEventListener('input', renderWall);
  formatFilter.addEventListener('change', renderWall);
  wall.addEventListener('click', (event) => {
    const button = event.target.closest('[data-template]');
    if (button) openDetails(button.dataset.template);
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('.dialog-close')) dialog.close();
    const copyButton = event.target.closest('[data-copy]');
    if (copyButton) copyId(copyButton.dataset.copy, copyButton);
  });
  document.querySelector('#clearFilters').addEventListener('click', () => {
    activeCategory = 'all';
    formatFilter.value = 'all';
    searchInput.value = '';
    renderCategories();
    renderWall();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      event.preventDefault();
      searchInput.focus();
    }
  });
})();
