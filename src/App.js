import React from 'react';
import './App.css';
import Feed from './Feed';
import Header from './Header';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user
        ? (
          <Login />
        )
        : (
          <>
            <Header />
            <div className="app__body">
              <Sidebar className="app__sidebar" />
              <Feed className="app__feed" />
            </div>
          </>
        )}
    </div>
  );
}

export default App;
