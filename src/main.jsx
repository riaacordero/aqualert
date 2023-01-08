import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { fakeAuthProvider } from './auth'
import { AuthContext } from './context'
import './index.css'

// fonts
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/500-italic.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/600-italic.css';

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={{
      fontFamily: 'Poppins, sans-serif',
      headings: { fontFamily: 'Poppins, sans-serif' }
  }}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </MantineProvider>,
)
