import { useState } from 'react';
import axios from 'axios';
import { Task } from './TaskList';
import styles from './TaskList.module.css';

interface EditTaskProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onCancel: () => void;
}

const EditTask = ({ task, onTaskUpdated, onCancel }: EditTaskProps) => {
  const [editedTask, setEditedTask] = useState<Task>(task);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put(`/api/updateTask/${task.id}`, {
        title: editedTask.title,
        description: editedTask.description,
        status: editedTask.status,
      })
      .then((response) => {
        onTaskUpdated(response.data.data[0]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.taskItem}>
      <h3 className={styles.taskTitle}>Edit Task</h3>
      <input
        type='text'
        name='title'
        value={editedTask.title}
        onChange={handleInputChange}
        className={styles.input}
      />
      <input
        type='text'
        name='description'
        value={editedTask.description}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button
        onClick={handleUpdate}
        className={`${styles.button} ${styles.editButton}`}
      >
        Update
      </button>
      <button
        onClick={onCancel}
        className={`${styles.button} ${styles.deleteButton}`}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditTask;
