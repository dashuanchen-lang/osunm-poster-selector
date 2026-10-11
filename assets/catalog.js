(function attachCatalog(global) {
  function filterTemplates(templates, { category = 'all', format = 'all', query = '' } = {}) {
    const needle = query.trim().toLocaleLowerCase();
    return templates.filter((template) => {
      const categoryMatches = category === 'all' || template.category === category;
      const formatMatches = format === 'all' || template.format === format;
      const haystack = [template.id, template.name, template.use, template.composition, ...template.tags].join(' ').toLocaleLowerCase();
      return categoryMatches && formatMatches && (!needle || haystack.includes(needle));
    });
  }
  function formatGuidance(template) {
    return template.format === 'long' ? '模块长图 · 分模块生成后拼接' : template.format === 'horizontal' ? '横版海报 · 按案例比例适配' : '单张海报 · 按案例比例适配';
  }
  function ratioGuidance(template) {
    return template.format === 'long'
      ? '特别长的详情式海报按内容拆成独立模块，逐模块设计、生成与检查后拼接；模块通常采用3:4，按信息布局适配。'
      : '生成时从当前工具支持的固定比例中，选择最接近所选案例的一档，不要求完全相同尺寸。保留构图层级，不拉伸产品。';
  }
  global.OSUNM_CATALOG = { filterTemplates, formatGuidance, ratioGuidance };
})(typeof window === 'undefined' ? globalThis : window);
