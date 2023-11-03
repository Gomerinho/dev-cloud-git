import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useTasks from './index';

function renderUseTasks() {
  return renderHook(() => useTasks());
}

function addTask(result, text) {
  act(() => {
    result.current.addTask(text);
  });
}

function toggleTask(result, taskId) {
  act(() => {
    result.current.toggleTask(taskId);
  });
}

function deleteTask(result, taskId) {
  act(() => {
    result.current.deleteTask(taskId);
  });
}

beforeEach(() => {
  localStorage.clear();
});

test('loads tasks from local storage', () => {
  const tasksData = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
  ];
  localStorage.setItem('tasks', JSON.stringify(tasksData));

  const { result } = renderUseTasks();

  expect(result.current.tasks).toEqual(tasksData);
});

test('adds a new task', () => {
  const { result } = renderUseTasks();
  addTask(result, 'New Task');

  expect(result.current.tasks).toContainEqual(
    expect.objectContaining({
      text: 'New Task',
      completed: false,
    })
  );
});

test('toggles the state of a task', () => {
  const { result } = renderUseTasks();
  addTask(result, 'Task 1');
  toggleTask(result, result.current.tasks[0].id);

  expect(result.current.tasks[0].completed).toBe(true);
});

test('deletes a task', () => {
  const { result } = renderUseTasks();
  addTask(result, 'Task 1');
  addTask(result, 'Task 2');

  deleteTask(result, result.current.tasks[0].id);

  expect(result.current.tasks).toHaveLength(1);
  expect(result.current.tasks[0].text).toBe('Task 2');
});
