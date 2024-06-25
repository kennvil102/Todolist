import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <div className="todo-list-container">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
