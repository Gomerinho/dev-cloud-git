import React, { useCallback, useMemo, useState } from 'react';
import { TasksContext } from '../../utils/contexts/taskContext';
import useTasks from '../../utils/hooks/useTasks';
import CompletedTasks from '../completedTasks';

const TodoList = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, notCompleted

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') return tasks.filter(task => task.completed);
    if (filter === 'notCompleted') return tasks.filter(task => !task.completed);
    return tasks;
  }, [filter, tasks]);

  const handleAddTask = useCallback(() => {
    addTask(taskInput);
    setTaskInput('');
  }, [taskInput, addTask]);

  return (
    // Fournit la liste des tâches et les fonctions de gestion à tous les composants enfants.
    <TasksContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      <div className='App'>
        {/* Champ d'entrée pour ajouter une nouvelle tâche */}
        <input value={taskInput} onChange={e => setTaskInput(e.target.value)} />
        <button onClick={handleAddTask}>Add</button>
        {/* Sélecteur pour choisir le filtre d'affichage des tâches */}
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='notCompleted'>Not Completed</option>
        </select>
        {/* Liste des tâches filtrées */}
        <ul>
          {filteredTasks.map(task => (
            <li
              key={task.id}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
              {/* Boutons pour basculer l'état de la tâche et pour la supprimer */}
              <button onClick={() => toggleTask(task.id)}>Toggle</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
        {/* Composant pour afficher les tâches terminées */}
        {/* Vous remarquerez qu'on envoi pas de tache en props, car Completed Task se sert de context 
                    pour recupérer les tâches.
                */}
        <CompletedTasks />
      </div>
    </TasksContext.Provider>
  );
};

export default TodoList;
