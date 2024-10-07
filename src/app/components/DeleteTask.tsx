import axios from 'axios';
import styles from './TaskList.module.css';

interface DeleteTaskProps {
  taskId: string;
  onTaskDeleted: (taskId: string) => void;
}

const DeleteTask = ({ taskId, onTaskDeleted }: DeleteTaskProps) => {
  const handleDelete = () => {
    axios
      .delete(`/api/deleteTask/${taskId}`)
      .then(() => {
        onTaskDeleted(taskId);
      })
      .catch((error) => console.error(error));
  };

  return (
    <button
      className={`${styles.button} ${styles.deleteButton}`}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteTask;
