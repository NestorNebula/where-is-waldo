import { useState, useEffect } from 'react';
import { asyncFetch } from '../helpers/fetch';
const API_URL = import.meta.env.VITE_API_URL;

const useLeaderboard = (levels) => {
  const [roundsLb, setRoundsLb] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    for (let i = 0; i < levels.length; i++) {
      const roundLb = asyncFetch({
        url: `${API_URL}/photos/${levels[i].id}/rounds`,
        options: { method: 'get', body: null },
      });
      if (!roundLb) return setError('Error when loading rounds.');
      setRoundsLb([...roundsLb, roundLb]);
    }
    setLoading(false);
  }, [levels]);

  return { roundsLb, error, loading };
};

export { useLeaderboard };
