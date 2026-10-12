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
    return template.format === 'long' ? `模块长图 · ${template.ratio}模块` : `${template.format === 'horizontal' ? '横版' : '单张'} · ${template.ratio}`;
  }
  function ratioGuidance(template) {
    return template.format === 'long'
      ? `长详情页已匹配${template.ratio}独立模块，分模块生成、检查后拼接，不将整条长图压成单张。`
      : `默认生成比例已匹配为${template.ratio}，是当前工具支持档位中最接近主案例的一档。其他案例的推荐比例见图片下方；保留层级，不拉伸产品。`;
  }
  global.OSUNM_CATALOG = { filterTemplates, formatGuidance, ratioGuidance };
})(typeof window === 'undefined' ? globalThis : window);
