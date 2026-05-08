import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UserProtectWrapper = ({ children }) => {  
  const navigate = useNavigate();
  const { setUser, isLoading, setIsLoading } = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          // backend returns the user object directly for profile
          setUser(response.data);
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [navigate, setUser, setIsLoading]);

  if (isLoading) return <div>Loading....</div>;

  return <>{children}</>;
};

export default UserProtectWrapper;
