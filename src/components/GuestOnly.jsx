import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context";

export default function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (auth.user) {
      if (localStorage.getItem('is_admin_login') === '1'){
        return <Navigate to="/admin" state={{ from: location }} replace />;
      }
      // Redirect them to the /home page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/home" state={{ from: location }} replace />;
    }
  
    return children;
  }