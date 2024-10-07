'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from './AddTask';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import styles from './TaskList.module.css';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
  created_at: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);

  useEffect(() => {
    axios
      .get('/api/getTasks')
      .then((response) => setTasks(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  const handleTaskAdded = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskBeingEdited(null);
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleEditClick = (task: Task) => {
    setTaskBeingEdited(task);
  };

  const handleCancelEdit = () => {
    setTaskBeingEdited(null);
  };

  return (
    <div>
      <AddTask onTaskAdded={handleTaskAdded} />
      {taskBeingEdited ? (
        <EditTask
          task={taskBeingEdited}
          onTaskUpdated={handleTaskUpdated}
          onCancel={handleCancelEdit}
        />
      ) : (
        tasks.map((task) => (
          <div key={task.id} className={styles.taskItem}>
            <h3 className={styles.taskTitle}>{task.title}</h3>
            <p className={styles.taskDescription}>{task.description}</p>
            <p className={styles.taskStatus}>
              Status: {task.status ? 'Concluída' : 'Não Concluída'}
            </p>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => handleEditClick(task)}
              >
                Edit
              </button>
              <DeleteTask taskId={task.id} onTaskDeleted={handleTaskDeleted} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
