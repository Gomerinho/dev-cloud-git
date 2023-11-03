import React, { useContext } from 'react';
import { TasksContext } from '../../utils/contexts/taskContext';

const CompletedTasks = () => {
  // On recupere les task dans le context pour les afficher
  const { tasks } = useContext(TasksContext);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>
      <h2>Tâches terminées</h2>
      <ul>
        {completedTasks.map(task => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;
