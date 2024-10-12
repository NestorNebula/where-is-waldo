import { promiseFetch, asyncFetch } from './fetch';
const API_URL = import.meta.env.VITE_API_URL;

const loader = async () => {
  const userId = localStorage.getItem('id');
  if (!userId) {
    const response = await asyncFetch({
      url: `${API_URL}/users`,
      options: {
        method: 'post',
        body: {},
      },
    });
    if (!response.id) return false;
    localStorage.setItem('id', response.id);
  }

  const userFetch = promiseFetch({
    url: `${API_URL}/users/${localStorage.getItem('id')}`,
    options: {
      method: 'get',
      body: {},
    },
  });

  const levelsFetch = promiseFetch({
    url: `${API_URL}/photos`,
    options: {
      method: 'get',
      body: {},
    },
  });

  const data = await Promise.all([userFetch, levelsFetch]).then(
    ([user, levels]) => {
      return { user, levels: levels.photos };
    }
  );
  return data;
};

export default loader;
