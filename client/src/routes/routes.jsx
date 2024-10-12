import App from '../App';
import Homepage from '../components/page/homepage/Homepage';
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
    ],
  },
];

export default routes;
