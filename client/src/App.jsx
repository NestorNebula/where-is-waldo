import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { GameContext } from './context/GameContext';
import Navbar from './components/page/navbar/Navbar';
import './App.css';
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const { user: userLoaded, levels } = useLoaderData();
  const [user, setUser] = useState(userLoaded);
  return (
    <GameContext.Provider value={{ user, setUser, levels, API_URL }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </GameContext.Provider>
  );
}

export default App;
