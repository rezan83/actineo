import React from 'react';
import './App.css';
import CardList from './components/githubStars/CardList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <header >
        <Navbar />
        
      </header>
        <CardList />
    </div>
  );
}

export default App;
