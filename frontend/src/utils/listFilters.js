export const matchesSearch = (item, query, fields = []) => {
  if (!query?.trim()) return true;

  const normalizedQuery = query.trim().toLowerCase();

  return fields.some((field) => {
    const value = field.split('.').reduce((current, key) => current?.[key], item);
    return String(value ?? '').toLowerCase().includes(normalizedQuery);
  });
};

export const uniqueOptions = (items, getValue, getLabel) => {
  const map = new Map();

  items.forEach((item) => {
    const value = getValue(item);
    if (value === undefined || value === null || value === '') return;
    const label = getLabel ? getLabel(item) : String(value);
    map.set(String(value), label);
  });

  return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
};
