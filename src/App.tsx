import { useEffect } from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';
import { getTasks } from './api/tasks';

function App() {
  useEffect(() => {
    getTasks()
      .then(tasks => {
        console.log('Loreta is a champion and Tasks fetched', tasks);
      })
      .catch(err => {
        console.error('Failed to fetch tasks', err.message)
      });
  }, []);

  return <KanbanBoard />;
}

export default App;
