// @ts-nocheck
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from './components/RequireAuth.jsx';
import Login from './pages/main/Login.jsx';
import Home from './pages/main/Home.jsx';
import Report from './pages/main/Report.jsx';
import Success from './pages/main/Success.jsx';
import Register from './pages/main/Register.jsx';


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: (
                <Register />
        )
    },
    {
        path: '/',
        element: (
            <Home />
            // Temporarily disabled
            // <RequireAuth>
            //     <Home />
            // </RequireAuth>
        )
    },
    {
        path: '/report',
        element: (
                <Report />
        )
    },
    {
        path: '/success',
        element: (
                <Success />
        )
    },
]);

export default router;