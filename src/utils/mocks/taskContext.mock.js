// contextMocks.js
import React, { createContext } from 'react';

const TasksContext = createContext({
  tasks: [], // Vous pouvez initialiser avec des données fictives pour les tests
});

export { TasksContext };
