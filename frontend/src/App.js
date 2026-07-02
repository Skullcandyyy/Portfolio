import React, { useState, useMemo } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';
import { Notification } from './components/Notification';
import './App.css';

function App() {
  const { tasks, loading, error, setError, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [formData, setFormData] = useState({ title: '', description: '', completed: false });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (search) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === 'active') {
      result = result.filter(t => !t.completed);
    } else if (filter === 'completed') {
      result = result.filter(t => t.completed);
    }

    if (sort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'za') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [tasks, filter, sort, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    let result;
    if (editingId) {
      result = await updateTask(editingId, formData);
      if (result?.success) setNotification({ message: 'Task updated!', type: 'success' });
    } else {
      result = await addTask(formData);
      if (result?.success) setNotification({ message: 'Task added!', type: 'success' });
    }
    if (result?.success) {
      setFormData({ title: '', description: '', completed: false });
      setEditingId(null);
    }
  };

  const handleEdit = (task) => {
    setFormData({ title: task.title, description: task.description || '', completed: task.completed });
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    const result = await deleteTask(id);
    if (result?.success) setNotification({ message: 'Task deleted!', type: 'info' });
  };

  const handleToggle = async (task) => {
    await toggleTask(task);
  };

  const counts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  }), [tasks]);

  return (
    <div className="app">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />

      <div className="container">
        <h1>Task Tracker</h1>

        {error && <div className="error" onClick={() => setError('')}>{error}</div>}

        <TaskForm
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditingId(null);
            setFormData({ title: '', description: '', completed: false });
          }}
        />

        <div className="controls">
          <div className="filter-group">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
              </button>
            ))}
          </div>

          <div className="search-sort">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>

        <div className="task-list">
          {loading && <p className="no-tasks">Loading tasks...</p>}
          {!loading && filteredTasks.length === 0 && (
            <p className="no-tasks">No tasks found.</p>
          )}
          {filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;