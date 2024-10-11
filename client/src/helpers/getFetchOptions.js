const getFetchOptions = (method, body) => {
  return {
    body: body ? JSON.stringify(body) : {},
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    mode: 'cors',
  };
};

export default getFetchOptions;
