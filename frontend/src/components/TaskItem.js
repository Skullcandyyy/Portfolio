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
        <div>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)} className="delete">Delete</button>
      </div>
    </div>
  );
}