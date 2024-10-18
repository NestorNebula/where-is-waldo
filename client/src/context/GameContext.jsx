import { createContext } from 'react';

export const GameContext = createContext({
  user: {},
  setUser: () => {},
  levels: [],
  API_URL: null,
});
