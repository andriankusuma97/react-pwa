import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Wifi, WifiOff, Download } from 'lucide-react';
import { usePWA } from './hooks/usePWA'

const PWATodoApp = () => {
  const [todos, setTodos] = useState([]);
  const { isOnline, isInstallable, installApp } = usePWA()
  const [newTodo, setNewTodo] = useState('');
 

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('pwa-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('pwa-todos', JSON.stringify(todos));
  }, [todos]);

  // Handle PWA installation
  
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };



  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-sky-300 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">PWA Todo</h1>
            <div className="flex items-center space-x-3">
              {/* Online/Offline Indicator */}
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                isOnline 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              
              {/* Install Button */}
              {installApp && (
                <button
                  onClick={ installApp}
                  className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600 transition-colors"
                >
                  <Download size={12} />
                  <span>Install</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Total: {totalCount}</span>
            <span>Completed: {completedCount}</span>
            <span>Remaining: {totalCount - completedCount}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Add Todo Form */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              onKeyPress={(e) => e.key === 'Enter' && addTodo(e)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Offline Message */}
        {!isOnline && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 text-sm">
              You're offline. Changes will sync when connection is restored.
            </p>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">📝</div>
              <p className="text-gray-500">No todos yet. Add one above!</p>
            </div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className={`bg-white rounded-lg shadow-sm border p-4 transition-all duration-200 ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center space-x-3 flex-1 cursor-pointer"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      todo.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-green-400'
                    }`}>
                      {todo.completed && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={`flex-1 ${
                      todo.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-800'
                    }`}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 p-1 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* PWA Features Info */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-4">
          <h3 className="font-semibold text-gray-800 mb-2">PWA Features</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ Works offline</li>
            <li>✅ Installable on device</li>
            <li>✅ Responsive design</li>
            <li>✅ Local storage</li>
            <li>✅ Online/offline detection</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default PWATodoApp;