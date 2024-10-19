import App from '../App';
import Homepage from '../components/page/homepage/Homepage';
import Level from '../components/game/level/Level';
import Leaderboard from '../components/leaderboard/Leaderboard';
import loader from '../helpers/loader';

const routes = [
  {
    path: '/',
    element: <App />,
    loader: async () => await loader(),
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/levels/:levelId',
        element: <Level />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />,
      },
    ],
  },
];

export default routes;
