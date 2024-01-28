import React, { useState } from 'react';

function TaskList({ tasks, deleteTask, editTask, toggleCompletion }) {
  const [edit, setEdit] = useState({ id: null, text: '', dueDate: '', description: '' });

  const handleEdit = (task) => {
    setEdit({ id: task.id, text: task.text, dueDate: task.dueDate, description: task.description });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    editTask(edit.id, edit.text, edit.dueDate, edit.description);
    setEdit({ id: null, text: '', dueDate: '', description: '' });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ color: isOverdue(task.dueDate) ? 'red' : 'black' }}>
          {edit.id === task.id ? (
            <form onSubmit={saveEdit}>
              <input
                type="text" 
                value={edit.text}
                onChange={(e) => setEdit({ ...edit, text: e.target.value })}
              />
              <input
                type="date"
                value={edit.dueDate}
                onChange={(e) => setEdit({ ...edit, dueDate: e.target.value })}
              />
              <textarea
                value={edit.description}
                onChange={(e) => setEdit({ ...edit, description: e.target.value })}
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <div>
              <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                {task.text} - Due by: {task.dueDate} <br />
                {task.description}
              </span>
              <div>
                <button onClick={() => toggleCompletion(task.id)}>
                  <i className="fas fa-check"></i> {/* Complete icon */}
                </button>
                <button onClick={() => handleEdit(task)}>
                  <i className="fas fa-edit"></i> {/* Edit icon */}
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  <i className="fas fa-trash-alt"></i> {/* Delete icon */}
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
