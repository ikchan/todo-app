import { FilterType } from '../types';

interface Props {
  activeCount: number;
  completedCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '미완료' },
  { key: 'completed', label: '완료' },
];

export function Footer({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/60 text-sm text-gray-400">
      <span className="w-20 shrink-0 text-xs">
        <span className="font-semibold text-gray-600">{activeCount}</span> 개 남음
      </span>
      <div className="flex items-center gap-0.5">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === f.key
                ? 'bg-indigo-100 text-indigo-600'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="w-20 shrink-0 flex justify-end">
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs hover:text-red-400 transition-colors"
          >
            완료 삭제
          </button>
        )}
      </div>
    </div>
  );
}
