import React, { useState, useEffect } from 'react'; // importamos react y los hooks useState y useEffect
import TodoItem from './TodoItem'; // importamos el componente TodoItem

function TodoList() {
  const [tasks, setTasks] = useState([]); // estado para almacenar la lista de tareas, inicia vacio
  const [completedCount, setCompletedCount] = useState(0); // estado para almacenar la cantidad de tareas completadas, inicia en 0

  // funcion para actualizar el contador de tareas completadas
  const updateCompletedCount = (tasks) => {
    setCompletedCount(tasks.filter(task => task.completed).length); // actualiza el contador filtrando las tareas completadas
  };

  // useEffect para cargar las tareas iniciales desde el servidor
  useEffect(() => {
    fetch('http://localhost:3000/tasks') // hace una solicitud GET al servidor para obtener las tareas
      .then(response => response.json()) // convierte la respuesta a formato JSON
      .then(data => {
        setTasks(data); // establece las tareas obtenidas en el estado
        updateCompletedCount(data); // actualiza el contador de tareas completadas
      });
  }, []); // el array vacio asegura que este efecto se ejecute solo una vez al montar el componente

  // funcion para agregar una nueva tarea
  const addTask = text => {
    fetch('http://localhost:3000/tasks', {
      method: 'POST', // metodo POST para agregar una nueva tarea
      headers: {
        'Content-Type': 'application/json', // tipo de contenido JSON
      },
      body: JSON.stringify({ text, completed: false }), // cuerpo de la solicitud con el texto de la tarea y su estado de completado
    })
      .then(response => response.json()) // convierte la respuesta a formato JSON
      .then(data => {
        const newTasks = [...tasks, data]; // agrega la nueva tarea a la lista de tareas
        setTasks(newTasks); // actualiza el estado de las tareas
        updateCompletedCount(newTasks); // actualiza el contador de tareas completadas
      });
  };

  // funcion para eliminar una tarea
  const deleteTask = id => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE', // metodo DELETE para eliminar una tarea
    }).then(() => {
      const updatedTasks = tasks.filter(task => task.id !== id); // filtra la lista de tareas excluyendo la tarea eliminada
      setTasks(updatedTasks); // actualiza el estado de las tareas
      updateCompletedCount(updatedTasks); // actualiza el contador de tareas completadas
    });
  };

  // funcion para marcar una tarea como completada o no completada
  const toggleCompleted = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task // invierte el estado de completado de la tarea correspondiente
    );

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT', // metodo PUT para actualizar una tarea
      headers: {
        'Content-Type': 'application/json', // tipo de contenido JSON
      },
      body: JSON.stringify(updatedTasks.find(task => task.id === id)), // cuerpo de la solicitud con la tarea actualizada
    }).then(() => {
      setTasks(updatedTasks); // actualiza el estado de las tareas
      updateCompletedCount(updatedTasks); // actualiza el contador de tareas completadas
    });
  };

  return (
    <div className="todo-list">
      <h2 className='shape'>tareas completadas: {completedCount}</h2> {/* muestra la cantidad de tareas completadas */}
      {tasks.map(task => (
        <TodoItem
          key={task.id} // clave  para cada tarea
          task={task} // pasa la tarea como propiedad
          deleteTask={deleteTask} // pasa la funcion deleteTask como propiedad
          toggleCompleted={toggleCompleted} // pasa la funcion toggleCompleted como propiedad
        />
      ))}
      <input
        type="text" // campo de entrada para texto
        placeholder="nueva tarea" // texto de marcador de posicion
        onKeyPress={e => {
          if (e.key === 'Enter') addTask(e.target.value); // agrega una nueva tarea cuando se presiona Enter
        }}
      />
    </div>
  );
}

export default TodoList; // exporta el componente TodoList
