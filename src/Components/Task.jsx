import React from 'react';

const Task = ({ title, description, completed, deleteTask, editTask, toggleTask, index }) => {
  return (
    <div className='task' style={{ textDecoration: completed ? 'line-through' : 'none' }}>
      <div>
        <input
          type='checkbox'
          checked={completed}
          onChange={() => toggleTask(index)}
        />
        <p>{title}</p>
        <span>{description}</span>
      </div>
      <div className='task-buttons'>
        <button onClick={() => editTask(index)}>✏️</button>
        <button onClick={() => deleteTask(index)}>🗑️</button>
      </div>
    </div>
  );
};

export default Task;
