import React from 'react';

export function TaskForm({ formData, setFormData, editingId, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <div className="form-title">{editingId ? 'Edit Task' : 'Add New Task'}</div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Task title *"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update Task' : 'Add Task'}
        </button>
        {editingId && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}