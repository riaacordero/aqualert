// @ts-nocheck
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from './components/RequireAuth.jsx';
import Login from './pages/main/Login.jsx';
import Home from './pages/main/Home.jsx';
import Report from './pages/main/Report.jsx';
import Success from './pages/main/Success.jsx';
import Register from './pages/main/Register.jsx';
import Notifications from './pages/main/Notifications.jsx';
import History from './pages/main/History.jsx';
import WebAdmin from './pages/admin/WebAdmin.jsx';
import WebLogin from './pages/admin/WebLogin.jsx';

const router = createBrowserRouter([
   
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/register',
        element: (
                <Register />
        )
    },
    {
        path: '/admin',
        element: (
                <WebAdmin />
        )
    },
    {
        path: '/adminlogin',
        element: (
                <WebLogin />
        )
    },
    {
        path: '/home',
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
    {
        path: '/notifications',
        element: (
                <Notifications />
        )
    },
    {
        path: '/history',
        element: (
                <History />
        )
    },
]);

export default router;