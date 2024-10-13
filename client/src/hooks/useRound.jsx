import { useState } from 'react';
import { promiseFetchStatus } from '../helpers/fetch';
const API_URL = import.meta.env.VITE_API_URL;

const useRound = (user, level) => {
  const [round, setRound] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const existingRound = user.rounds.find((r) => r.photoId === level.id);
  if (existingRound) {
    setRound(existingRound);
    setLoading(false);
    return {
      round,
      error,
      loading,
    };
  }

  const fetch = promiseFetchStatus({
    url: `${API_URL}/rounds`,
    options: {
      method: 'post',
      body: {
        userId: user.id,
        photoId: level.id,
      },
    },
  });
  fetch.then((status) => {
    if (status >= 400) {
      setError('Error when loading round.');
    } else {
      setRound('done');
    }
    setLoading(false);
  });

  return { round, error, loading };
};

export { useRound };
