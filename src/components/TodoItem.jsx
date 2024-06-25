import React from 'react'; // importamos react

// definimos el componente TodoItem, que recibe  task, deleteTask y toggleCompleted(si la tarea esta completada o no)
function TodoItem({ task, deleteTask, toggleCompleted }) {
  // funcion para manejar el cambio de estado del checkbox
  function handleChange() {
    toggleCompleted(task.id); // llama a la funcion toggleCompleted pasando el id de la tarea
  }

  return (
     
    <div className="todo-item">
      <input
        type="checkbox" className='mover' // inout de  tipo checkbox
        checked={task.completed} // estado del checkbox  
        onChange={handleChange} // maneja el cambio del estado del checkbox
      />
      <p>{task.text}</p> {/* muestra el texto de la tarea */}
      <button onClick={() => deleteTask(task.id)}>x</button> {/* boton para eliminar la tarea */}
    </div>
   
     
  );
}

// exporta el componente TodoItem para ser utilizado en otros componentes
export default TodoItem;
