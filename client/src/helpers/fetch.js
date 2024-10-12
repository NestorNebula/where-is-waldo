const getFetchOptions = (method, body) => {
  return {
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    mode: 'cors',
  };
};

const promiseFetch = ({ url, options }) => {
  return fetch(url, getFetchOptions(options.method, options.body))
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Error when fetching levels.');
      }
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch(() => {
      return {};
    });
};

const asyncFetch = async ({ url, options }) => {
  const response = await fetch(
    url,
    getFetchOptions(options.method, options.body)
  );
  if (response.status >= 400) return {};
  const result = await response.json();
  return result;
};

export { getFetchOptions, promiseFetch, asyncFetch };
