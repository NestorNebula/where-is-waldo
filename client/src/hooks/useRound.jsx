import { useEffect, useState } from 'react';
import { promiseFetch } from '../helpers/fetch';
const API_URL = import.meta.env.VITE_API_URL;

const useRound = (user, level) => {
  const [round, setRound] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    promiseFetch({
      url: `${API_URL}/users/${user.id}`,
      options: { method: 'get', body: null },
    }).then((actualUser) => {
      const actualRound = actualUser.rounds.find((r) => r.photoId === level.id);
      if (!actualRound) {
        setError("Round couldn't be found.");
      } else {
        setRound(actualRound);
      }
      setLoading(false);
    });
  }, [user, level]);

  return {
    round,
    error,
    loading,
  };
};

export { useRound };
