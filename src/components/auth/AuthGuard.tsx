import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    if (!userId && !isLoginPage && !isRegisterPage) {
      // Redirect to login with a message
      navigate('/login', { 
        state: { 
          message: 'Please login first to access this page' 
        } 
      });
    } else if (userId && (isLoginPage || isRegisterPage)) {
      // If user is logged in and tries to access login/register page,
      // redirect to their dashboard
      navigate(`/dashboard/${userId}`);
    }
  }, [navigate, location]);

  return <>{children}</>;
};

export default AuthGuard;