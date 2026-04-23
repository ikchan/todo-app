import { useState, KeyboardEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
  onToggleAll: () => void;
  hasTodos: boolean;
  allCompleted: boolean;
}

export function TodoInput({ onAdd, onToggleAll, hasTodos, allCompleted }: Props) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = value.trim();
      if (trimmed) {
        onAdd(trimmed);
        setValue('');
      }
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
      <button
        onClick={hasTodos ? onToggleAll : undefined}
        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
          !hasTodos
            ? 'invisible'
            : allCompleted
            ? 'text-indigo-400 hover:text-indigo-500'
            : 'text-gray-300 hover:text-gray-400'
        }`}
        title={allCompleted ? '모두 미완료로 변경' : '모두 완료로 변경'}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요..."
        className="flex-1 text-base text-gray-700 placeholder-gray-300 outline-none bg-transparent"
        autoFocus
      />
    </div>
  );
}
