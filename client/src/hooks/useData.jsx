import { useEffect, useState } from 'react';
import { promiseFetch } from '../helpers/fetch';

const useData = (url, options, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    promiseFetch({ url, options }).then((response) => {
      if (!Object.keys(response).length) {
        setError(true);
      } else {
        setData(response);
      }
      setLoading(false);
    });
  }, dependencies);

  return { data, error, loading };
};

export { useData };
