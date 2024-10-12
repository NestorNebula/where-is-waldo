import { createContext } from 'react';

export const GameContext = createContext({
  user: {},
  levels: [],
  API_URL: null,
});
