import { createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Navbar from './components/page/navbar/Navbar';
import './App.css';
const API_URL = import.meta.env.VITE_API_URL;

const GameContext = createContext({
  user: {},
  levels: [],
  API_URL: null,
});

function App() {
  const { user, levels } = useLoaderData();
  return (
    <GameContext.Provider value={{ user, levels, API_URL }}>
      <Navbar />
      <main></main>
    </GameContext.Provider>
  );
}

export default App;
