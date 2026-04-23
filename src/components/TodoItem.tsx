import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const startEdit = () => {
    setEditText(todo.text);
    setEditing(true);
  };

  const commitEdit = () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      onDelete(todo.id);
    } else if (trimmed !== todo.text) {
      onUpdate(todo.id, trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <div className="group flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'border-indigo-400 bg-indigo-400'
            : 'border-gray-200 hover:border-indigo-300'
        }`}
        title={todo.completed ? '미완료로 변경' : '완료로 변경'}
      >
        {todo.completed && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            className="w-3 h-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
          className="flex-1 text-base text-gray-700 outline-none border-b-2 border-indigo-400 bg-transparent py-0.5"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          className={`flex-1 text-base select-none transition-colors duration-200 ${
            todo.completed ? 'line-through text-gray-300' : 'text-gray-700'
          }`}
        >
          {todo.text}
        </span>
      )}

      {!editing && (
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-400 transition-all duration-150"
          title="삭제"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
