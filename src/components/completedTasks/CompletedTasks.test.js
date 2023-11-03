import React from 'react';
import { render, screen } from '@testing-library/react';
import CompletedTasks from './index';
import { TasksContext } from '../../utils/contexts/taskContext';

test('renders nothing when there are no completed tasks', () => {
  const tasks = [];
  render(
    <TasksContext.Provider value={{ tasks }}>
      <CompletedTasks />
    </TasksContext.Provider>
  );
  console.log(screen.getByText('Tâches terminées'));
  expect(screen.getByText('Tâches terminées')).toBeInTheDocument();
  expect(screen.getByRole('list')).toBeEmptyDOMElement();
});

test('renders completed tasks correctly', () => {
  const tasks = [
    { id: 1, text: 'Task 1', completed: true },
    { id: 2, text: 'Task 2', completed: true },
  ];

  render(
    <TasksContext.Provider value={{ tasks }}>
      <CompletedTasks />
    </TasksContext.Provider>
  );
  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();
});

test("doesn't render uncompleted tasks", () => {
  const tasks = [
    { id: 1, text: 'Task 1', completed: true },
    { id: 2, text: 'Task 2', completed: false },
  ];

  render(
    <TasksContext.Provider value={{ tasks }}>
      <CompletedTasks />
    </TasksContext.Provider>
  );
  expect(screen.queryByText('Task 2')).toBeNull();
});

test('matches snapshot', () => {
  const tasks = [
    { id: 1, text: 'Task 1', completed: true },
    { id: 2, text: 'Task 2', completed: true },
  ];

  const { asFragment } = render(
    <TasksContext.Provider value={{ tasks }}>
      <CompletedTasks />
    </TasksContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
