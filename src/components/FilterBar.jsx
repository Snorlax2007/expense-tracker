import { SORT_OPTIONS } from '../constants';

export default function FilterBar({
  categories,
  category,
  sort,
  onCategoryChange,
  onSortChange,
}) {
  return (
    <div className="filter-bar">
      <label>
        Category
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Sort by
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
