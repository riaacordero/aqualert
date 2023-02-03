import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AuthContext } from './context'
import './index.css'

// fonts
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/500-italic.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/600-italic.css';

import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { useEffect } from 'react'

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          setUser(user);
          resolve(user);
        })
        .catch((error) => {
          console.log("There is an error");
          reject(error);
        });
    });
  };

  let signout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const dispose = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      dispose();
    }
  }, []);

  return <AuthContext.Provider value={{ user, signin, signout }}>
    {children}
  </AuthContext.Provider>;
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
