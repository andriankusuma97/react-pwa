import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppRoutes from './routes';

const router = createBrowserRouter(AppRoutes)

function IndexRouter() {
  return <RouterProvider router={router}/>;
}

export default IndexRouter
