import { useState } from 'react';
import { asyncFetch } from '../helpers/fetch';
const API_URL = import.meta.env.VITE_API_URL;

const useLeaderboard = (levels) => {
  const [roundsLb, setRoundsLb] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRoundsLb = async () => {
    const results = [];
    for (let i = 0; i < levels.length; i++) {
      const round = await asyncFetch({
        url: `${API_URL}/photos/${levels[i].id}/rounds`,
        options: { method: 'get', body: null },
      });
      if (!round || !round.rounds)
        return setError('Error when loading rounds.');
      results.push(round.rounds);
    }
    setRoundsLb(results);
    setLoading(false);
  };

  if (!roundsLb.length) {
    fetchRoundsLb();
  }

  return { roundsLb, error, loading };
};

export { useLeaderboard };
