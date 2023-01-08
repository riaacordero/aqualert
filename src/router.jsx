import { createHashRouter } from 'react-router-dom';
import Login from './pages/main/Login.jsx';

const router = createHashRouter([
    {
        path: '/',
        element: <Login />
    }
]);

export default router;