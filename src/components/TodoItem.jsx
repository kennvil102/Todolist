import React from 'react';

// definicion del componente funcional todoitem
function todoitem({ task, deleteTask, toggleCompleted }) {
  // funcion que se ejecuta cuando se cambia el estado del checkbox
  function handleChange() {
    toggleCompleted(task.id); // llama a la funcion toggleCompleted con el ID de la tarea
  }

  // retorna la estructura jsx del componente
  return (
    <div className="todo-item">
      {/* input checkbox que muestra si la tarea esta completada */}
      <input
        type="checkbox"
        checked={task.completed} // estado de la tarea
        onChange={handleChange} // funcion que se ejecuta al cambiar el estado
      />
      {/* texto de la tarea */}
      <p>{task.text}</p>
      {/* boton para eliminar la tarea */}
      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
}

// exporta el componente todoitem para que pueda ser utilizado en otros componentes
export default todoitem;
