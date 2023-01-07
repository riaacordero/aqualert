import { createHashRouter } from 'react-router-dom';
import Home from './pages/main/Home.jsx';

const router = createHashRouter([
    {
        path: '/',
        element: <Home />
    }
]);

export default router;