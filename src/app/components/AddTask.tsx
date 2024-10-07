// my-app/src/app/components/AddTask.tsx
import { useState } from 'react';
import axios from 'axios';
import { Task } from './TaskList';
import styles from './AddTask.module.css';

interface AddTaskProps {
  onTaskAdded: (task: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/addTask', {
        title,
        description,
      });
      // Modificação aqui: Verificar se response.data existe e tem a propriedade 'data'
      if (response.data && response.data.data) {
        const task: Task = response.data.data[0];
        onTaskAdded(task);
        setTitle('');
        setDescription('');
      } else {
        console.error('Resposta inesperada da API:', response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Título:
        <input
          name='title'
          type='text'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className={styles.input}
        />
      </label>
      <br />
      <label>
        Descrição:
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={styles.textarea}
        />
      </label>
      <br />
      <button type='submit' className={styles.submitButton}>
        Adicionar Tarefa
      </button>
    </form>
  );
};

export default AddTask;
