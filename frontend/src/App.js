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
      if (result?.success) setNotification({ message: 'Task updated successfully!', type: 'success' });
    } else {
      result = await addTask(formData);
      if (result?.success) setNotification({ message: 'Task added successfully!', type: 'success' });
    }
    if (result?.success) {
      setFormData({ title: '', description: '', completed: false });
      setEditingId(null);
    }
  };

  const handleEdit = (task) => {
    setFormData({ title: task.title, description: task.description || '', completed: task.completed });
    setEditingId(task._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="header">
          <h1>Task Tracker</h1>
          <p>Stay organized, get things done</p>
        </div>

        {error && <div className="error" onClick={() => setError('')}>{error} &times;</div>}

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

        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-number">{counts.all}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{counts.active}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{counts.completed}</div>
            <div className="stat-label">Done</div>
          </div>
        </div>

        <div className="controls">
          <div className="filter-group">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
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
          {loading && (
            <div className="no-tasks">
              <div className="no-tasks-icon">&#8987;</div>
              Loading tasks...
            </div>
          )}
          {!loading && filteredTasks.length === 0 && (
            <div className="no-tasks">
              <div className="no-tasks-icon">{search || filter !== 'all' ? '🔍' : '📋'}</div>
              {search ? 'No tasks match your search' : filter !== 'all' ? 'No tasks in this category' : 'No tasks yet. Add one above!'}
            </div>
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