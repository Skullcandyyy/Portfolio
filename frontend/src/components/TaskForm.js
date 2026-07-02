import React from 'react';

export function TaskForm({ formData, setFormData, editingId, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <button type="submit">{editingId ? 'Update Task' : 'Add Task'}</button>
      {editingId && (
        <button type="button" onClick={onCancel}>Cancel</button>
      )}
    </form>
  );
}