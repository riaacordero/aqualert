import { createHashRouter } from 'react-router-dom';
import Login from './pages/main/Login.jsx';
import Home from './pages/main/Home.jsx';

const router = createHashRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/',
        element: <Home />
    }
]);

export default router;