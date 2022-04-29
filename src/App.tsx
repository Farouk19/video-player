import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';

function App() {
  return (
    <>
      <Header />
      <div className="h-full">
        <Outlet />
      </div>
    </>
  )
}

export default App;
