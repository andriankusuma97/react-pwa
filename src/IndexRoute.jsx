import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppRoutes from './routes';
import { usePWA } from '/src/hooks/usePWA';


const router = createBrowserRouter(AppRoutes)

function IndexRouter() {
    const { isOnline, isInstallable, installApp } = usePWA()  
  
  return <RouterProvider router={router}/>;
}

export default IndexRouter
