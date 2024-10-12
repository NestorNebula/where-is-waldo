import App from '../App';
import loader from '../helpers/loader';

const routes = [
  {
    path: '/',
    element: <App />,
    loader: async () => await loader(),
  },
];

export default routes;
