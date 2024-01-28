import React, { useState } from 'react';

function TaskInputForm({ addTask }) {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState(''); // Ensure this is camelCase


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    addTask(task, dueDate, description); // Pass 'description' to 'addTask'
    setTask('');
    setDueDate(''); // Reset dueDate after submitting
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
       <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a description"
      />
      <button type="submit">Add Task</button>  
    </form>
  );
}

export default TaskInputForm;
