import React, { useEffect, useState } from 'react';
import Task from './Task';

const Home = () => {
  const initialArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

  const [tasks, setTasks] = useState(initialArray);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedTasks = tasks.map((task, index) =>
        index === currentIndex ? { title, description, completed: task.completed } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setTasks([...tasks, { title, description, completed: false }]);
    }
    setTitle("");
    setDescription("");
  };

  const deleteTask = (index) => {
    const filteredArr = tasks.filter((val, i) => i !== index);
    setTasks(filteredArr);
  };

  const editTask = (index) => {
    const task = tasks[index];
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='container'>
      <h1>To-Do Lists</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button disabled={!title || !description}>{isEditing ? "Update" : "ADD"}</button>
      </form>

      {tasks.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          description={item.description}
          completed={item.completed}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleTask={toggleTask}
          index={index}
        />
      ))}
    </div>
  );
};

export default Home;
