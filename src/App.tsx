import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';

function App() {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  const hasTodos = todos.length > 0;
  const allCompleted = hasTodos && activeCount === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-indigo-50 to-sky-100 flex flex-col items-center pt-16 pb-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-6xl font-thin text-indigo-300 mb-8 tracking-[0.35em]">
          TODO
        </h1>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <TodoInput
            onAdd={addTodo}
            onToggleAll={toggleAll}
            hasTodos={hasTodos}
            allCompleted={allCompleted}
          />

          <div>
            {filteredTodos.length > 0 ? (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                />
              ))
            ) : (
              <div className="py-14 text-center text-sm text-gray-300">
                {filter === 'all'
                  ? '할 일을 입력해보세요'
                  : filter === 'active'
                  ? '미완료 항목이 없습니다'
                  : '완료된 항목이 없습니다'}
              </div>
            )}
          </div>

          {hasTodos && (
            <Footer
              activeCount={activeCount}
              completedCount={completedCount}
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>

        <p className="text-center text-xs text-indigo-300 mt-5 tracking-wide">
          더블클릭으로 편집 · Enter로 저장 · Esc로 취소
        </p>
      </div>
    </div>
  );
}

export default App;
