import styles from './page.module.css';
import TaskList from './components/TaskList';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TaskList />
      </main>
    </div>
  );
}
