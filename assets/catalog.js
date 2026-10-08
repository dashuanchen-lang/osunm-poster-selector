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
  global.OSUNM_CATALOG = { filterTemplates };
})(typeof window === 'undefined' ? globalThis : window);
