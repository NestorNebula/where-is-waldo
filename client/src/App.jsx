import { useLoaderData } from 'react-router-dom';
import Navbar from './components/page/navbar/Navbar';
import './App.css';
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const { user, levels } = useLoaderData();
  return (
    <main>
      <Navbar />
    </main>
  );
}

export default App;
