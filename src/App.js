import React from 'react';
import './App.css';
import CreateNotification from './components/create-notif.component'
import NotificationsList from './components/notif-list.component'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Test App
      </header>
      <main className="content">
        <CreateNotification />
        <NotificationsList/>
      </main>
    </div>
  );
}

export default App;
