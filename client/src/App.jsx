import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const token = useSelector((state) => state.token);

  if (!token) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
