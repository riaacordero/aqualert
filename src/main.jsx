import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AuthContext } from './context'
import './index.css' 
import { NotificationsProvider } from '@mantine/notifications'

// fonts
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/500-italic.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/600-italic.css';

import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from './firebase'
import { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { BARANGAY_COLLECTION, CONSUMER_DATA_COLLECTION, USER_COLLECTION } from './collection_constants'

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  /**
   * 
   * @param {Promise<import('firebase/auth').User>} userPromise 
   */
  const injectUser = async (userPromise, isAdmin = false) => {
    const user = await userPromise;
    if (!user) return;

    const userSnap = await getDoc(doc(db, USER_COLLECTION, user.uid));
    if (isAdmin && !userSnap.get('isAdmin')) {
      await signout();
      throw new Error('Access is denied.');
    }

    const consumerDataSnap = await getDoc(doc(db, CONSUMER_DATA_COLLECTION, userSnap.get('billingNo')));
    const barangaySnap = await getDoc(doc(db, BARANGAY_COLLECTION, consumerDataSnap.get('barangay_id')));
    const finalUser = {
      rawUser: user,
      rawMetadata: {
        consumer_data: consumerDataSnap.data(),
        barangay: barangaySnap.data(),
        user_info: userSnap.data()
      }
    };

    setUser(finalUser);
    return finalUser;
  }

  const IS_ADMIN_ENTRY = 'is_admin_login';

  const shouldLoginAsAdmin = (defaultValue = false) => {
    const valueInString = (+defaultValue).toString() // 1 if true, 0 if false
    if (!localStorage.getItem(IS_ADMIN_ENTRY) || (defaultValue !== null && localStorage.getItem(IS_ADMIN_ENTRY) !== valueInString)) {
      localStorage.setItem(IS_ADMIN_ENTRY, valueInString);
    }

    return localStorage.getItem(IS_ADMIN_ENTRY) === '1';
  }

  let signin = ({ email, password, isAdmin = false }) => {
    return new Promise((resolve, reject) => {
      const isAdminEntry = shouldLoginAsAdmin(isAdmin);

      injectUser(
        signInWithEmailAndPassword(auth, email, password)
          .then(({user}) => user),
        isAdminEntry
      )
        .then(user => {
          resolve(user);
        })
        .catch((error) => {
          console.log("There is an error", error);
          reject(error)
        });
    });
  };

  let signout = async () => {
    await signOut(auth);
    localStorage.removeItem(IS_ADMIN_ENTRY);
    setUser(null);
  };

  useEffect(() => {
    const dispose = onAuthStateChanged(auth, (user) => {
      injectUser(Promise.resolve(user), shouldLoginAsAdmin(null))
        .catch((error) => {
          console.log("There is an error", error);
        });
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
    <NotificationsProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationsProvider>
  </MantineProvider>,
)
