import './App.css';

import TodoList from './components/TodoList';
import { TodoProvider } from './store';

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <h1>Todo List</h1>
        <TodoList />
      </div></TodoProvider>
  );
}

export default App;
