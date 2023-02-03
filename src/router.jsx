// @ts-nocheck
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/main/Login.jsx';
import Home from './pages/main/Home.jsx';
import Report from './pages/main/Report.jsx';
import Success from './pages/main/Success.jsx';
import Register from './pages/main/Register.jsx';
import Notifications from './pages/main/Notifications.jsx';
import History from './pages/main/History.jsx';
import WebAdmin from './pages/admin/WebAdmin.jsx';
import WebLogin from './pages/admin/WebLogin.jsx';
import GodMode from './pages/admin/GodMode.tsx';
import GuestOnly from './components/GuestOnly';
import RequireAuth from './components/RequireAuth.jsx';
import WebAdmintTest from './pages/admin/WebAdmintTest.jsx';

const router = createBrowserRouter([
   
    {
        path: '/',
        element: <GuestOnly>
            <Login />
        </GuestOnly>
    },
    {
        path: '/register',
        element: (
            <GuestOnly>
                <Register />
            </GuestOnly>
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
            <RequireAuth>
                <Home />
            </RequireAuth>
        )
    },
    {
        path: '/report',
        element: (
            <RequireAuth>
                <Report />
            </RequireAuth>
        )
    },
    {
        path: '/success',
        element: (
            <RequireAuth>
                <Success />
            </RequireAuth>
        )
    },
    {
        path: '/notifications',
        element: (
            <RequireAuth>
                <Notifications />
            </RequireAuth>
        )
    },
    {
        path: '/history',
        element: (
            <RequireAuth>
                <History />
            </RequireAuth>
        )
    },
    {
        path: '/__god_mode',
        element: (<GodMode />)
    },
]);

export default router;