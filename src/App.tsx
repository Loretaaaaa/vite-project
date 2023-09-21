import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg'
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
