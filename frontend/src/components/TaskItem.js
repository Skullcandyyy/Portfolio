import React from 'react';

export function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        <div className="task-info">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            })}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <button className="btn-icon edit" onClick={() => onEdit(task)} title="Edit">&#9998;</button>
        <button className="btn-icon delete" onClick={() => onDelete(task._id)} title="Delete">&#10005;</button>
      </div>
    </div>
  );
}