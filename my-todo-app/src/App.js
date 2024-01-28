import React, { useState } from 'react';
import TaskInputForm from './TaskInputForm';
import TaskList from './TaskList';
import './style.css';


function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text, dueDate, description) => {
    const newTask = {
      id: Date.now(), 
      text,
      dueDate, 
      description, 
      isCompleted: false
    };
    setTasks([...tasks, newTask]); 
  };
 
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId, newText,newDueDate,newDescription) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, text: newText, dueDate: newDueDate, description : newDescription } : task
    ));
  };

  const toggleCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TaskInputForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} toggleCompletion={toggleCompletion} />
    </div>
  );
}

export default App;
