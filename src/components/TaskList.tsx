import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(e: any) {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    setTasks([
      ...tasks,
      {
        id: Math.round(Math.random() * 100),
        isComplete: false,
        title: newTaskTitle,
      },
    ]);
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const tasksChecked = tasks.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          isComplete: !el.isComplete,
        };
      }
      return el;
    });

    setTasks(tasksChecked);
  }

  function handleRemoveTask(id: number) {
    const taskFiltered = tasks.filter((el) => el.id !== id);
    setTasks(taskFiltered);
  }

  return (
    <section className='task-list container'>
      <header>
        <h2>Minhas tasks</h2>

        <div className='input-group'>
          <input
            type='text'
            placeholder='Adicionar novo todo'
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type='submit'
            data-testid='add-task-button'
            disabled={!newTaskTitle}
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color='#fff' />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid='task'
              >
                <label className='checkbox-container'>
                  <input
                    type='checkbox'
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className='checkmark'></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type='button'
                data-testid='remove-task-button'
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
