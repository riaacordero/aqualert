import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from './components/RequireAuth.jsx';
import Login from './pages/main/Login.jsx';
import Home from './pages/main/Home.jsx';
import React from 'react';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: (
            // <Home />
            // // Temporarily disabled
            <RequireAuth>
                <Home />
            </RequireAuth>
        )
    }
]);

export default router;