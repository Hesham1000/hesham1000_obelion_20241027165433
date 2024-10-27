import React from 'react';
import Registration from './Registration';
import Login from './Login';
import TaskCreation from './TaskCreation';
import Notifications from './Notifications';
import Reports from './Reports';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        <Registration />
        <Login />
        <TaskCreation />
        <Notifications />
        <Reports />
      </main>
      <footer>
        © 2023 My React App
      </footer>
    </div>
  );
}

export default App;
