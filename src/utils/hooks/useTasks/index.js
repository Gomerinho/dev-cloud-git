// Importation des hooks nécessaires depuis React.
// `useCallback` pour mémoriser les fonctions, `useEffect` pour gérer les effets de bord,
// et `useState` pour gérer l'état local du hook.
import { useCallback, useEffect, useState } from 'react';

//function to create unique id whitout using a library
const uuid = () => {
  let uuid = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    uuid += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return uuid;
};

const useTasks = () => {
  // Déclaration de l'état `tasks` qui contient la liste des tâches, et sa fonction de mise à jour `setTasks`.
  const [tasks, setTasks] = useState([]);

  // `useEffect` pour charger les tâches du local storage lors de la première exécution du hook (au montage du composant).
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks'); // Récupère les tâches du local storage.
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Si des tâches sont stockées, les transforme en objet JavaScript et les définit comme état initial.
    }
  }, []); // Le tableau de dépendances vide signifie que cet effet ne s'exécutera qu'une fois.

  // `useEffect` pour sauvegarder les tâches dans le local storage chaque fois qu'elles changent.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Convertit la liste des tâches en chaîne de caractères JSON et les sauvegarde dans le local storage.
  }, [tasks]); // Cet effet s'exécute chaque fois que `tasks` change.

  // Fonction pour ajouter une nouvelle tâche.
  // Utilisation de `useCallback` pour s'assurer que cette fonction n'est pas recréée à chaque rendu, sauf si ses dépendances changent.
  // Ici, il n'y a pas de dépendances.
  const addTask = useCallback(text => {
    if (text.trim()) {
      // Vérifie que le texte n'est pas vide ou constitué uniquement d'espaces.
      setTasks(prevTasks => [
        ...prevTasks,
        { id: uuid(), text, completed: false },
      ]);
      // Ajoute la nouvelle tâche à la liste existante.
      // Utilise `Date.now()` pour générer un identifiant unique basé sur le timestamp actuel.
    }
  }, []);

  // Fonction pour basculer l'état d'une tâche (complétée/non complétée).
  const toggleTask = useCallback(id => {
    setTasks(prevTasks =>
      prevTasks.map(
        task =>
          task.id === id ? { ...task, completed: !task.completed } : task // Si l'identifiant de la tâche correspond, bascule son état `completed`.
      )
    );
  }, []);

  // Fonction pour supprimer une tâche.
  const deleteTask = useCallback(id => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); // Supprime la tâche dont l'identifiant correspond.
  }, []);

  // Retourne l'état des tâches et les fonctions de gestion pour être utilisés par le composant appelant.
  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
};

export default useTasks;
