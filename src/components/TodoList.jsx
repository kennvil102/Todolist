import React, { useState } from 'react';
import Todoitem from './TodoItem'; // Importa el componente TodoItem

function Todolist() {
  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'cita',
      completed: true,
    },
    {
      id: 2,
      text: 'reunion',
      completed: false,
    },
  ]);

  // Estado para almacenar el texto de la nueva tarea
  const [text, setText] = useState('');

  // Estado para almacenar la cantidad de tareas completadas
  const [completedCount, setCompletedCount] = useState(
    tasks.filter(task => task.completed).length
  );

  // funcion para agregar una nueva tarea
  function addTask(text) {
    // Crea una nueva tarea con un ID único basado en la fecha actual
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    // Actualiza el estado de las tareas agregando la nueva tarea al final de la lista
    setTasks([...tasks, newTask]);
    // Limpia el campo de texto para la nueva tarea
    setText('');
  }

  // Función para eliminar una tarea
  function deleteTask(id) {
    // Filtra las tareas para excluir la tarea con el ID proporcionado
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Función para marcar una tarea como completada o no completada
  function toggleCompleted(id) {
    // Mapea sobre las tareas para encontrar la tarea con el ID proporcionado
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        // Si la tarea actual es la que queremos cambiar, se crea una copia de la tarea con el estado de completado invertido
        return { ...task, completed: !task.completed };
      } else {
        // Si la tarea actual no es la que queremos cambiar, se devuelve la tarea sin modificar
        return task;
      }
    });
    // Actualiza el estado de las tareas con la lista actualizada
    setTasks(updatedTasks);
    // Actualiza el estado de la cantidad de tareas completadas contando las tareas con completed:true
    setCompletedCount(updatedTasks.filter(task => task.completed).length);
  }

  // Renderiza el componente Todolist
  return (
    <div className='mover'>
      <div className="todo-list">
        {/* Muestra la cantidad de tareas completadas */}
        <h2 className='shape'>Tareas Completadas: {completedCount}</h2>
        {/* Mapea cada tarea a un componente Todoitem */}
        {tasks.map(task => (
          <Todoitem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
        {/* Input para agregar una nueva tarea */}
        <input value={text} onChange={e => setText(e.target.value)} />
        {/* Botón para agregar una nueva tarea */}
        <button onClick={() => addTask(text)}>Agregar</button>
      </div>
    </div>
  );
}

// Exporta el componente Todolist para ser utilizado en otros componentes
export default Todolist;
